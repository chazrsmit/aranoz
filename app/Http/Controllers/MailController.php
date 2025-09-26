<?php

namespace App\Http\Controllers;

use App\Mail\ReplyMail;
use App\Models\Message;
use Illuminate\Http\Request;
use Mail;

class MailController extends Controller
{
    public function sendReply($id, Request $request) {

        $request->validate([
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $originalMessage = Message::findOrFail($id);

        $mailData = [
            'subject' => $request->subject,
            'message' => $request->message,
        ];

        // on veut être sûr de retirer les guillements pur que ça ne bug pas au niveau de l'adresse du destinataire
        $recipient = trim($originalMessage->email, '"');

        Mail::to($recipient)->send(new ReplyMail($mailData));

        $originalMessage->status = 1;
        $originalMessage->save();

        return redirect()->route('mailbox')->with('success', 'Reply sent successfully!');

    }
}
