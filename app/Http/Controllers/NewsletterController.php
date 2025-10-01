<?php

namespace App\Http\Controllers;

use App\Models\Newsletter;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    public function store(Request $request) {

        $request->validate([
            'email' => 'required|email'
        ]);

        $newsletter = new Newsletter();

        $newsletter->email = $request->email;
        $newsletter->save();

        return redirect()->route('home')->with('success', 'Your email has been added to the database.');
    }
}
