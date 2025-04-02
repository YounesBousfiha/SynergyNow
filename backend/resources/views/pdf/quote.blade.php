{{-- resources/views/quotes/show.blade.php --}}
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quote #{{ $quote->id }}</title>
    {{--@vite('resources/css/app.css') --}}
</head>
<body class="bg-gray-50">
<div class="container mx-auto px-4 py-8 max-w-4xl">
    <!-- Quote Card -->
    <div class="bg-white rounded-lg shadow-md p-6">
        <!-- Header -->
        <div class="flex justify-between items-center border-b pb-4">
            <h1 class="text-2xl font-bold text-gray-800">Quote #{{ $quote->id }}</h1>
            <button onclick="window.print()" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Print / Download
            </button>
        </div>

        <!-- Client Info -->
        <div class="mt-6 grid grid-cols-2 gap-4">
            <div>
                <h2 class="font-semibold text-gray-700">Client Information</h2>
                <p class="text-gray-600">{{$quote->clientCompany->name}}</p>
                <p class="text-gray-600">{{$quote->clientCompany->email}}</p>
            </div>
            <div class="text-right">
                <p class="text-gray-600">Date: </p>
                <p class="text-gray-600">Due Date: </p>
            </div>
        </div>

        <!-- Items Table -->
        <div class="mt-6">
            <table class="w-full">
                <thead>
                <tr class="border-b">
                    <th class="text-left py-2">Description</th>
                    <th class="text-right py-2">Qty</th>
                    <th class="text-right py-2">Price</th>
                    <th class="text-right py-2">Total</th>
                </tr>
                </thead>
                <tbody>
               {{-- @foreach($quote->items as $item) --}}
                    <tr class="border-b">
                        <td class="py-2">Description</td>
                        <td class="text-right py-2">Price</td>
                    </tr>
               {{-- @endforeach --}}
                </tbody>
                <tfoot>
                <tr class="border-b">
                    <td colspan="3" class="text-right py-2 font-semibold">Subtotal:</td>
                    <td class="text-right py-2">subTotal</td>
                </tr>
                <tr class="border-b">
                    <td colspan="3" class="text-right py-2 font-semibold">Tax Rate : xx%</td>
                    <td class="text-right py-2"> Price with tax</td>
                </tr>
                <tr>
                    <td colspan="3" class="text-right py-2 font-bold">Total:</td>
                    <td class="text-right py-2 font-bold">Total</td>
                </tr>
                </tfoot>
            </table>
        </div>

        <!-- Notes -->
        {{--@if($quote->notes)--}}
            <div class="mt-6">
                <h2 class="font-semibold text-gray-700">Notes</h2>
                <p class="text-gray-600 mt-1"> Quote Note</p>
            </div>
        {{--@endif --}}
    </div>
</div>
</body>
</html>
