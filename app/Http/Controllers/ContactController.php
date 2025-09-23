<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function contact() {

        $contact = Contact::first();

        return Inertia::render('Back/Contact', [
            'contact' => $contact
        ]);
    }

    // action de modifier les données de contact

    public function update($id, Request $request) {
        // Validate
        $request->validate([
            'street' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            // regex pour s'assurer que ce sont des chiffres :
            'zip' => 'required|regex:/^\d{4,10}$/',
            'email' => 'required|email|max:255',
            // regex pour s'assurer que ce sont des chiffres entrés pour le tél
            'phone' => 'required|regex:/^[0-9+\s\-]+$/|min:8|max:20'
        ]);

        $contact = Contact::findOrFail($id);

        $contact->street = $request->street;
        $contact->city = $request->city;
        $contact->country = $request->country;
        $contact->zip = $request->zip;
        $contact->email = $request->email;
        $contact->phone = $request->phone;
        $contact->save();

        return redirect()->route('contact')->with('success', 'Infos contact modifiées avec succès !');

    }
}
