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

    // Envoyer un message à l'admin
    public function store(Request $request)
{
    // 1️⃣ Validate the form inputs
    $validated = $request->validate([
        'email'   => 'required|email',
        'subject' => 'required|string|max:255',
        'message' => 'required|string|min:5',
    ]);

    // 2️⃣ Create and save the new message
    Message::create([
        'email'    => $validated['email'],
        'subject'  => $validated['subject'],
        'message'  => $validated['message'],
        'status'   => 0, // not yet read
        'archived' => 0, // not archived
    ]);

    // 3️⃣ Optionally send a notification or email to admin here later
    // Mail::to('info@aranoz.be')->send(new NewMessageNotification($validated));

    return redirect()->back()->with('success', 'Your message has been sent successfully!');
}

}
