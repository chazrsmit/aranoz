<h1>Hi {{ $order->user->pseudo ?? $order->user->name ?? 'Customer' }},</h1>

<p>Your order <strong>#{{ $order->order_number ?? 'N/A' }}</strong> has been confirmed!</p>

<h3>Order Summary:</h3>
<ul>
    @foreach($order->items as $item)
        <li>
            {{ $item->quantity ?? 1 }} x {{ $item->product->name ?? 'Product' }} - {{ $item->price ?? 0 }} € each
        </li>
    @endforeach
</ul>

<p>Total: <strong>{{ $order->total_price ?? 0 }} €</strong></p>

@if($order->billing)
    <h4>Billing info:</h4>
    <p>
        {{ $order->billing->first_name ?? '' }} {{ $order->billing->last_name ?? '' }}<br>
        {{ $order->billing->address ?? '' }}<br>
        {{ $order->billing->city ?? '' }}, {{ $order->billing->zip ?? '' }}<br>
        {{ $order->billing->country->name ?? '' }}<br>
        Phone: {{ $order->billing->phone ?? '' }}
    </p>
@endif
