<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use App\Models\Stream;
use App\Mail\DailyStream;
use Illuminate\Support\Facades\Log;

class SendStream extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send-stream';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send daily stream to all users';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Sending stream to all users...');
       
        try {
            $users = User::all();
            $stream = Stream::with(['nuggets.category'])->latest()->first();
            
            if (!$stream) {
                $this->error('No stream available to send.');
                return;
            }
            
            // Group all nuggets by category for later filtering
            $allNuggetsByCategory = $stream->nuggets->groupBy(function ($item) {
                return $item->category->title;
            });

            $successCount = 0;
            $failureCount = 0;
            $failedUsers = [];

            foreach ($users as $user) {
                try {
                    // Get user's subscribed category IDs, states, and LGAs
                    $subscribedCategoryIds = $user->subscribedCategories()->pluck('categories.id');
                    $subscribedStates = $user->subscribedStates()->pluck('states.abbr');
                    $subscribedLgas = $user->subscribedLgas()->pluck('lgas.name');
                    
                    // Check if user has no subscriptions at all
                    $hasNoSubscriptions = $subscribedCategoryIds->isEmpty() && 
                                         $subscribedStates->isEmpty() && 
                                         $subscribedLgas->isEmpty();
                    
                    if ($hasNoSubscriptions) {
                        // User has no subscriptions, send all nuggets
                        $this->info("Sending all categories to {$user->email}");
                        Mail::to($user->email)->send(new DailyStream($stream, $allNuggetsByCategory, $user));
                    } else {
                        // Filter nuggets based on subscription types
                        $filteredNuggets = $stream->nuggets->filter(function ($nugget) use (
                            $subscribedCategoryIds, 
                            $subscribedStates, 
                            $subscribedLgas
                        ) {
                            // Apply category filter if user has category subscriptions
                            $passesCategory = $subscribedCategoryIds->isEmpty() || 
                                           $subscribedCategoryIds->contains($nugget->category_id);
                            
                            // Apply state filter if user has state subscriptions
                            $passesState = $subscribedStates->isEmpty() || 
                                         ($nugget->state && $subscribedStates->contains($nugget->state));
                            
                            // Apply LGA filter if user has LGA subscriptions
                            $passesLga = $subscribedLgas->isEmpty() || 
                                       ($nugget->lga && $subscribedLgas->contains($nugget->lga));
                            
                            // Nugget must pass all non-empty filters
                            $categoryFilter = !$subscribedCategoryIds->isEmpty();
                            $stateFilter = !$subscribedStates->isEmpty();
                            $lgaFilter = !$subscribedLgas->isEmpty();
                            
                            $passesFilters = true;
                            
                            // Only apply filters that the user has subscribed to
                            if ($categoryFilter && !$passesCategory) $passesFilters = false;
                            if ($stateFilter && !$passesState) $passesFilters = false;
                            if ($lgaFilter && !$passesLga) $passesFilters = false;
                            
                            return $passesFilters;
                        });
                        
                        // Group the filtered nuggets by category
                        $groupedFilteredNuggets = $filteredNuggets->groupBy(function ($item) {
                            return $item->category->title;
                        });
                        
                        if ($groupedFilteredNuggets->isEmpty()) {
                            $this->info("No relevant content for {$user->email}, skipping");
                            continue;
                        }
                        
                        $this->info("Sending filtered stream to {$user->first_name} {$user->last_name} ({$user->email})");
                        $this->info("Categories: " . implode(', ', $groupedFilteredNuggets->keys()->toArray()));
                        Mail::to($user->email)->send(new DailyStream($stream, $groupedFilteredNuggets, $user));
                    }
                    
                    $successCount++;
                } catch (\Exception $e) {
                    // Log the error but continue with next user
                    $failureCount++;
                    $failedUsers[] = $user->email;
                    
                    $this->error("Failed to send email to {$user->email}: " . $e->getMessage());
                    Log::error("Failed to send stream to {$user->email}", [
                        'error' => $e->getMessage(),
                        'trace' => $e->getTraceAsString()
                    ]);
                    
                    // Continue with the next user rather than stopping the entire process
                    continue;
                }
            }

            // Summary after all emails are processed
            $this->info("Stream sending completed!");
            $this->info("Success: {$successCount} | Failures: {$failureCount}");
            
            if ($failureCount > 0) {
                $this->info("Failed emails: " . implode(', ', $failedUsers));
            }
            
        } catch (\Exception $e) {
            $this->error('Error in main process: ' . $e->getMessage());
            $this->error($e->getTraceAsString());
            Log::error('Error in send-stream command', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        } catch (\Throwable $th) {
            $this->error('Unexpected error in main process: ' . $th->getMessage());
            $this->error($th->getTraceAsString());
            Log::error('Unexpected error in send-stream command', [
                'error' => $th->getMessage(),
                'trace' => $th->getTraceAsString()
            ]);
        }
    }
}