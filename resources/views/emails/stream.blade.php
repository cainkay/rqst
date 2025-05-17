<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>RQST Stream {{ now()->format('d/m/Y') }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: white;
            color: oklch(0.19 0.0347 256.41); /* Dark text */
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .container {
            background-color: oklch(0.98 0.01 80); /* Slightly lighter than the background */
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .category {
            margin-top: 30px;
            margin-bottom: 15px;
        }

        .category-title {
            font-size: 20px;
            font-weight: bold;
            color: oklch(0.19 0.0347 256.41);
            border-bottom: 2px solid oklch(0.49 0.2967 278.71); /* Purple accent */
            padding-bottom: 5px;
            margin-bottom: 15px;
        }

        .nugget {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid oklch(0.8 0.03 80); /* Subtle divider */
        }

        .nugget-title {
            margin-bottom: 5px;
        }

        .read-more {
            color: oklch(0.49 0.2967 278.71); /* Purple accent for links */
            text-decoration: underline ;
            margin-left: 0;
            font-weight: normal;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .header h1 {
            color: oklch(0.19 0.0347 256.41);
            margin-bottom: 5px;
        }

        .header p {
            color: oklch(0.4 0.03 256.41); /* Slightly dimmed date text */
        }

        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: oklch(0.4 0.03 256.41); /* Slightly dimmed footer text */
        }

        .footer a {
            color: oklch(0.49 0.2967 278.71); /* Purple accent for links */
            text-decoration: none;
        }

        /* For email clients that support media queries */
        @media (prefers-color-scheme: light) {
            body {
                background-color: oklch(0.96 0.0304 76.98) !important;
                color: oklch(0.19 0.0347 256.41) !important;
            }

            .container {
                background-color: oklch(0.98 0.01 80) !important;
            }

            .category-title {
                color: oklch(0.19 0.0347 256.41) !important;
            }

            .read-more {
                color: oklch(0.49 0.2967 278.71) !important;
            }
        }

        /* For clients that force dark mode */
        @media (prefers-color-scheme: dark) {
            .force-light {
                background-color: oklch(0.96 0.0304 76.98) !important;
                color: oklch(0.19 0.0347 256.41) !important;
            }
        }
    </style>
</head>

<body>
    <div class="container force-light">
        <div class="header">
            <h1>RQST Daily Stream</h1>
            <p>{{ now()->format('d/m/Y') }}</p>
        </div>

        @if($groupedNuggets->isEmpty())
        <p>No nuggets available in your subscribed categories today.</p>
        @else
        @foreach($groupedNuggets as $categoryTitle => $nuggets)
        <div class="category">
            <h2 class="category-title">{{ $categoryTitle }}</h2>

            @foreach($nuggets as $nugget)
            <div class="nugget">
                <div class="nugget-title">
                    <strong>{{ $nugget->description }} </strong>
                    <br/> {{ $nugget->state }}, {{ $nugget->lga }}
                    <br/> <a href="{{ $nugget->url }}" class="read-more">Read more</a>
                </div>
            </div>
            @endforeach
        </div>
        @endforeach
        @endif
        <div class="footer">
            <p>You received this email because you're subscribed to RQST.</p>
            {{-- <p><a href="{{ url('/profile/subscriptions') }}">Manage your subscriptions</a> | 
                    href="{{ url('/unsubscribe/' . ($user->email ?? '')) }}">Unsubscribe</a></p> --}}
        </div>
    </div>
</body>

</html>