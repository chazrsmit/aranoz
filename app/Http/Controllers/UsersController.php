<?php

    namespace App\Http\Controllers;

    use App\Models\User;
    use Illuminate\Http\Request;
    use Inertia\Inertia;

    class UsersController extends Controller
    {
        public function users() {

            $users = User::with('role')->get();

            return Inertia::render('Back/Users/Users', [
                'users' => $users
            ]);
        }

        // Afficher la page d'un user
        public function show($id) {
            $user = User::findOrFail($id);

            return Inertia::render('Back/Users/Show', [
                'user' => $user
            ]);
        }

        // Afficher la page d'un user pour l'edit

        // Action d'edit un user

        // Action de delete un user

        public function delete($id) {
            User::findOrFail($id)->delete();

            return redirect()->route('users')->with('success', 'User supprimé-e avec succès !');
        }
    }
