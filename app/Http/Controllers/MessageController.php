<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function mailbox(){

        $messages = Message::all();

        return Inertia::render('Back/Mailbox/Mailbox', [
            'messages' => $messages
        ]);
    }

    // page pour lire l'email
    public function show($id){
        $message = Message::findOrFail($id);

        return Inertia::render('Back/Mailbox/Show', [
            'message' => $message
        ]);
    }

    // page où répondre à un email
    public function reply($id) {
        $message = Message::findOrFail($id);
        $contact = Contact::first();

        return Inertia::render('Back/Mailbox/Reply', [
            'message' => $message,
            'contact' => $contact
        ]);
    }
}
