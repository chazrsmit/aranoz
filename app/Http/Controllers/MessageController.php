<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function mailbox(){

        $messages = Message::where('archived', 0)->get();
        $messageArchived = Message::where('archived', 1)->get();

        return Inertia::render('Back/Mailbox/Mailbox', [
            'messages' => $messages,
            'messagesArchived' => $messageArchived
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

    // pour répondre à un email : est-ce qu'on store aussi en même temps qu'envoyer un email?
    // public function store(Request $request) {}
    // }

    public function archive($id) {

        $message = Message::findOrFail($id);

        $message->archived = 1;
        $message->status = 1;
        $message->save();

        return redirect()->route('mailbox')->with('success', 'Message successfully archived.');
    }

    // Supprimer un message
    public function delete($id){

        Message::findOrFail($id)->delete();

        return redirect()->route('mailbox')->with('success', 'Message successfully deleted.');

    }
}
