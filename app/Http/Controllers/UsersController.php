<?php

    namespace App\Http\Controllers;

    use App\Models\Role;
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
        public function edit ($id) {

            $user = User::findOrFail($id);
            $roles = Role::all();

            return Inertia::render('Back/Users/Edit', [
                'user' => $user,
                'roles' => $roles
            ]);
        }

        // Action d'update un user
        public function update($id, Request $request) {
            $request->validate([
                'name' => 'required|string|max:255',
                'prenom' => 'required|string|max:255',
                'pseudo' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'image' => 'nullable|image',
                'role_id' => 'required|integer|exists:roles,id',
            ]);

            $user = User::findOrFail($id);

            $user->update([
                'name' => $request->name,
                'prenom' => $request->prenom,
                'pseudo' => $request->pseudo,
                'email' => $request->email,
                'role_id' => $request->role_id,
            ]);

            // Upload d'image:
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $image_name = time().'_'.$image->getClientOriginalName();
                $path = $image->storeAs('avatars', $image_name, 'public');
                $user->image = $path;
                $user->save();
            }

            return redirect()->route('users')->with('success', 'User successfully updated.');
        }

        // Action de delete un user

        public function delete($id) {
            User::findOrFail($id)->delete();

            return redirect()->route('users')->with('success', 'User successfully deleted.');
        }
    }
