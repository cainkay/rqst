<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Stream;
use App\Models\Nugget;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class StreamController extends Controller
{
    public function index(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'data' => 'required|array',
            'data.*.Category' => 'required|string',
            'data.*.Description' => 'required|string',
            'data.*.URL' => 'required|string|url',
            'data.*.Date' => 'required|string',
            'data.*.State' => 'required|string',
            'data.*.LGA' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Get the data from the request
            $streamData = $request->input('data');
            
            // Find the most recent date from the nuggets to use for the stream
            $mostRecentDate = null;
            foreach ($streamData as $nuggetData) {
                $date = Carbon::parse($nuggetData['Date']);
                if ($mostRecentDate === null || $date->greaterThan($mostRecentDate)) {
                    $mostRecentDate = $date;
                }
            }
            
            // Create a stream record with the most recent date
            $stream = Stream::create([
                'description' => 'Data import on ' . $mostRecentDate->toDateString(),
                'date' => $mostRecentDate ?? now()
            ]);
            
            $createdNuggets = [];
            
            // Process each nugget
            foreach ($streamData as $nuggetData) {
                // Find or create category
                $category = Category::firstOrCreate(
                    ['title' => $nuggetData['Category']]
                );
                
                // Parse the date
                $date = Carbon::parse($nuggetData['Date']);
                
                // Create the nugget with LGA
                $nugget = Nugget::create([
                    'stream_id' => $stream->id,
                    'category_id' => $category->id,
                    'state' => $nuggetData['State'],
                    'lga' => $nuggetData['LGA'] ?? null, // Add LGA field
                    'description' => $nuggetData['Description'],
                    'date' => $date,
                    'url' => $nuggetData['URL']
                ]);
                
                $createdNuggets[] = $nugget;
            }
            
            // Return a success response with the created data
            return response()->json([
                'message' => 'Stream data processed successfully',
                'stream' => $stream,
                'nuggets_count' => count($createdNuggets),
                'nuggets' => $createdNuggets
            ], 201);
            
        } catch (\Exception $e) {
            Log::error('Error processing stream data: ' . $e->getMessage());
            
            return response()->json([
                'message' => 'Failed to process stream data',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}