<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsersController extends Controller
{
    public function users() {

        $users = User::with('role')->get();

        return Inertia::render('Back/Users', [
            'users' => $users
        ]);
    }
}
