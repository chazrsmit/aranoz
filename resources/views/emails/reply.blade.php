@component('mail::message')
# {{ $mailData['subject'] }}

{{ $mailData['message'] }}

Thanks,  
{{ config('app.name') }}
@endcomponent
