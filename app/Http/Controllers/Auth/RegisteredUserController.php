<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'pseudo' => 'required|string|max:255',
            'image' => 'nullable',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Récupérer l'id du rôle 'User'
        $userRole = Role::where('role', 'User')->first();

        $user = User::create([
            'name' => $request->name,
            'prenom' => $request->prenom,
            'pseudo' => $request->pseudo,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $userRole ? $userRole->id : null,
        ]);

        // Upload d'image si présent
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image_name = time().'_'.$image->getClientOriginalName();
            $path = $image->storeAs('avatars', $image_name, 'public');
            $user->image = $path;
            $user->save();
        } elseif ($request->filled('image_url')) {
            $user->image = $request->image_url;
            $user->save();
        }

        event(new Registered($user));

        Auth::login($user);

        // Redirection : simple User → page publique
        return redirect()->route('home');
    }
}
