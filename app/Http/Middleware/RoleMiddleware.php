<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     * $roles = liste de rôles autorisés
     */
public function handle(Request $request, Closure $next, ...$roles)
{
    $user = $request->user();

    if (!$user) {
        abort(403, "Access denied.");
    }

    // Vérifie si la relation role existe
    $userRole = optional($user->role)->role; // retourne null si relation vide

    if (!$userRole || !in_array($userRole, $roles)) {
        abort(403, "Access denied.");
    }

    return $next($request);
}

}
