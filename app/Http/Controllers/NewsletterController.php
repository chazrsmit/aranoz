<?php

namespace App\Http\Controllers;

use App\Models\Newsletter;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $existing = Newsletter::where('email', $request->email)->first();

        if ($existing) {
            return redirect()->route('home')->with('error', 'This email is already subscribed to our newsletter.');
        }

        Newsletter::create([
            'email' => $request->email,
        ]);

        return redirect()->route('home')->with('success', 'You have successfully subscribed to our newsletter!');
    }
}
