<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>RQST Stream</title>
</head>

<body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: white; color: #091423; margin: 0; padding: 20px;">
    
    <!-- Main container table -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0 auto; background-color: #fcf8f1;">
        <tr>
            <td style="padding: 25px;">
                
                <!-- Header -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="text-align: center; margin-bottom: 30px;">
                    <tr>
                        <td>
                            <h1 style="color: #091423; margin: 0 0 5px 0; font-size: 24px;">RQST Daily Stream</h1>
                            <p style="color: #3d4958; margin: 0; font-size: 14px;">{{ now()->format('d/m/Y') }}</p>
                        </td>
                    </tr>
                </table>

                @if($groupedNuggets->isEmpty())
                <p style="color: #091423; margin: 0; padding: 15px 0;">No nuggets available in your subscribed categories today.</p>
                @else
                @foreach($groupedNuggets as $categoryTitle => $nuggets)
                
                <!-- Category Section -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 30px; margin-bottom: 15px;">
                    <tr>
                        <td>
                            <h2 style="font-size: 20px; font-weight: bold; color: #091423; border-bottom: 2px solid #5207ff; padding-bottom: 5px; margin: 0 0 15px 0;">{{ $categoryTitle }}</h2>
                        </td>
                    </tr>
                </table>

                @foreach($nuggets as $nugget)
                <!-- Nugget Item -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #c8bca9;">
                    <tr>
                        <td>
                            <div style="margin-bottom: 5px;">
                                <strong style="color: #091423;">{{ $nugget->description }}</strong>
                                <br>
                                <span style="color: #3d4958;">{{ $nugget->state }}, {{ $nugget->lga }}</span>
                                <br>
                                <a href="{{ $nugget->url }}" style="color: #5207ff; text-decoration: underline; font-weight: normal;">Read more</a>
                            </div>
                        </td>
                    </tr>
                </table>
                @endforeach
                
                @endforeach
                @endif

                <!-- Footer -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 30px; text-align: center;">
                    <tr>
                        <td>
                            <p style="font-size: 12px; color: #3d4958; margin: 0;">You received this email because you're subscribed to RQST.</p>
                            {{-- <p style="font-size: 12px; color: #3d4958; margin: 5px 0 0 0;">
                                <a href="{{ url('/profile/subscriptions') }}" style="color: #5207ff; text-decoration: none;">Manage your subscriptions</a> | 
                                <a href="{{ url('/unsubscribe/' . ($user->email ?? '')) }}" style="color: #5207ff; text-decoration: none;">Unsubscribe</a>
                            </p> --}}
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>

</body>

</html>