<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

// frontend controllers here
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Blog\BlogController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\RegisterTabController;
use App\Models\Blog;
use Illuminate\Http\Request;

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
    // Query the blogs table to retrieve the latest blogs
    $blogs = Blog::latest()->paginate(6);

    return view('frontend.home', ['blogs' => $blogs]);
})->name('home');


// blog details page route here
Route::get('/blog-details/{id}', [BlogController::class, 'blogItemDetails'])->name('blog-details');

// for posting comment on specific blog item route
Route::post('/post-comment', [BlogController::class, 'postComment'])->name('post-comment');


// register tab route
Route::get('/register-process', [RegisterTabController::class, 'getRegisterTab'])->name('register.tab');


// access dashboard route
Route::get('/dashboard', [HomeController::class, 'dashboard'])->name('dashboard');


// only user can access below routes
Route::middleware('is_user')->group(
    function () {
        // blogs route here
        Route::resource('blog', BlogController::class);
    }
);


// only admin can access below routes
Route::middleware('is_admin')->group(
    function () {
        // will have to define all routes those for admin
    }
);
