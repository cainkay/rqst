<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SendStream extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-stream';

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
            $users = \App\Models\User::all();
            //include category title in the stream
            $stream = \App\Models\Stream::with(['nuggets.category'])->latest()->first();
            //group stream by category
            $grouped =  $stream->nuggets->groupBy(function ($item) {
                return $item->category->title;
            });
            
            print_r(json_encode($grouped));

            

            foreach ($users as $user) {
              
                    $this->info("Stream sent to {$user->email}");
                    $this->info("Stream sent to {$user->first_name} {$user->last_name}");
            }

            $this->info('Stream sent successfully!');
        } catch (\Exception $e) {
            $this->error('Error sending stream: ' . $e->getMessage());
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
}
