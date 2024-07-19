<?php

use App\Http\Controllers\ChirpController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;




Route::get('/', function () {
    return Inertia::render('Home/index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('/');

Route::get('/news', function () {
    return Inertia::render('News/index');
})->name('news');


Route::middleware(['auth'])->group(function () {
    Route::get('/admin/release/index', [PageController::class, 'create'])->name('admin.release.index');
    Route::get('/admin/release/list', [PageController::class, 'index'])->name('admin.release.list');
    Route::post('/pages', [PageController::class, 'store'])->name('pages.store');
    // update pages
    Route::put('/pages/{page}', [PageController::class, 'update'])->name('pages.update');
    // delete pages
    Route::delete('/pages/{page}', [PageController::class, 'destroy'])->name('pages.destroy');
});


Route::middleware(['auth'])->group(function () {
    Route::get('/admin', function () {
        return Inertia::render('Admin/Dashboard/index');
    })->name('admin.index');

    // Route::get('/admin/release', function () {
    //     return Inertia::render('Admin/Release/index');
    // })->name('admin.release');

    Route::get('/admin/categories', function () {
        return Inertia::render('Admin/Categories/index');
    })->name('admin.categories');
});


Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('chirps', ChirpController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

require __DIR__.'/auth.php';

// Auth::routes();