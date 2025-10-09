<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Inertia\Inertia;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);
    })
->withExceptions(function (Exceptions $exceptions) {
    $exceptions->respond(function ($response, $exception, $request) {
        // error 403
        if ($response->getStatusCode() === 403) {
            return redirect()->route('error.403');
        }
        // error 404
        if ($response->getStatusCode() === 404) {
                return redirect()->route('error.404');
        }

        return $response;
    });
})->create();