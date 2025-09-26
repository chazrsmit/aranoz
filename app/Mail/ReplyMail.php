<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReplyMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct($mailData)
    // ici, on connecte le $mailData présent dans le controlleur: dès qu'on va trigger la fonction replyEmail, $mailData va être envoyée dans le constructeur. on va donc pouvoir utiliser les données pour rendre tout plus statique (dans les fonctions envelope, content et build)
    {
        $this->mailData = $mailData;
        // $this refers to the current object you are inside of.
        // In this case, the object is an instance of the ReplyMail class.
    }

    // $mail = new ReplyMail($mailData) : $mail is now an object of type ReplyMail.
    // Inside the class, $this always points to that object.
    // So $this->mailData is like saying: “store this data inside this specific email object.”
    // $this = “me, this email I’m building right now” ; $this->mailData = “my own storage box called mailData” ; $mailData (no $this) = “the data you gave me from outside”


    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            $this->mailData['subject'] ?? 'Reply Mail',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.reply',
            // pour que ce soit dynamique (on utilise la variable mailData qui reprend les infos de chaque message)
            with: [
                'mailData' => $this->mailData
            ],
        );
    }

    public function build()
    // cette fonction explique spécifiquement comment build l'email
    {
        return $this
            // from() sets who the email looks like it’s coming from.
            // config('mail.from.address') grabs the email from your .env file (info@aranoz.com).
            // config('mail.from.name') grabs the name from your .env file (Aranoz).
            ->from(config('mail.from.address'), config('mail.from.name'))
            ->subject($this->mailData['subject'])
            // markdown() tells Laravel which template to use for the email body.
            // emails.reply is the file resources/views/emails/reply.blade.php
            ->markdown('emails.reply')
            // with() passes data to the template.
            // Here, mailData contains the subject, message, or anything else you want to show in the email.
            ->with('mailData', $this->mailData);
        }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
