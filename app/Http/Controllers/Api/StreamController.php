<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\GovernmentUnit;
use App\Models\Stream;
use App\Models\Nugget;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class StreamController extends Controller
{
    public function index(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'data' => 'required|array',
            'data.Title' => 'required|string',
            'data.Date' => 'required|string',
            'data.Releases' => 'required|array',
            'data.Releases.*.Category' => 'required|string',
            'data.Releases.*.Description' => 'required|string',
            'data.Releases.*.URL' => 'required|string|url',
            'data.Releases.*.Date' => 'required|string',
            'data.Releases.*.State' => 'required|string',
            'data.Releases.*.LGA' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Start a database transaction
        DB::beginTransaction();
        
        try {
            // Get the data from the request
            $streamData = $request->input('data');
            $streamTitle = $streamData['Title'];
            $streamDate = Carbon::parse($streamData['Date']);
            $releasesData = $streamData['Releases'];
            
            // Create a stream record with the provided title and date
            $stream = Stream::create([
                'description' => $streamTitle,
                'date' => $streamDate
            ]);
            
            $createdNuggets = [];
            
            // Process each release (nugget)
            foreach ($releasesData as $nuggetData) {
                // Find or create category
                $category = Category::firstOrCreate(
                    ['title' => $nuggetData['Category']]
                );

                // Find or create government unit
                $gov_unit = GovernmentUnit::firstOrCreate(
                    ['name' => $nuggetData['LGA']]
                );
                
                // Parse the date
                $nuggetDate = Carbon::parse($nuggetData['Date']);
                
                // Create the nugget
                $nugget = Nugget::create([
                    'stream_id' => $stream->id,
                    'category_id' => $category->id,
                    'state' => $nuggetData['State'],
                    'lga' => $gov_unit->name,
                    'description' => $nuggetData['Description'],
                    'date' => $nuggetDate,
                    'url' => $nuggetData['URL']
                ]);
                
                $createdNuggets[] = $nugget;
            }
            
            // If we got here, everything succeeded, so commit the transaction
            DB::commit();
            
            // Return a success response with the created data
            return response()->json([
                'message' => 'Stream data processed successfully',
                'stream' => $stream,
                'nuggets_count' => count($createdNuggets),
                'nuggets' => $createdNuggets
            ], 201);
            
        } catch (\Exception $e) {
            // Something went wrong, rollback the transaction
            DB::rollBack();
            
            Log::error('Error processing stream data: ' . $e->getMessage());
            
            return response()->json([
                'message' => 'Failed to process stream data',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}