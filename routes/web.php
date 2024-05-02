<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// frontend controllers here
use App\Http\Controllers\HomeController;


// backend controllers are below



//Clear route cache:
Route::get('/clear', function () {
    Artisan::call('route:cache');
    Artisan::call('config:cache');
    Artisan::call('view:clear');
    Artisan::call('cache:clear');
    return 'Routes cache has been cleared';
});


Auth::routes();


// navigate to the home or dashboard page
Route::get('/', function (Request $request) {
    if (Auth::check()) {
        return redirect()->route('dashboard');
    } else {
        return view('auth.login');
    }
})->name('home');


// access dashboard route
Route::get('/dashboard', [HomeController::class, 'dashboard'])->name('dashboard');


// only admin can access below routes
Route::middleware('is_admin')->group(
    function () {
        // will have to define all routes those for admin
    }
);
