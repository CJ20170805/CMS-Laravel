<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ChirpController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\CommentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;




Route::get('/', function () {
    return Inertia::render('Home/index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('/');

Route::get('/search', function () {
    return Inertia::render('Search/index');
})->name('search');





Route::get('/pages', [PageController::class, 'list'])->name('pages.list');
Route::get('/pages/{page}', [PageController::class, 'show'])->name('pages.show');



Route::middleware(['auth'])->group(function () {
    // release 
    Route::get('/admin/release/index', [PageController::class, 'create'])->name('admin.release.index');
    Route::get('/admin/release/list', [PageController::class, 'index'])->name('admin.release.list');
    Route::get('/admin/release/list/order', [PageController::class, 'order'])->name('admin.release.list.order');
    Route::post('/pages', [PageController::class, 'store'])->name('pages.store');
    Route::put('/pages/{page}', [PageController::class, 'update'])->name('pages.update');
    Route::delete('/pages/{page}', [PageController::class, 'destroy'])->name('pages.destroy');
    Route::get('/api/search', [PageController::class, 'search'])->name('page.search');


    // categories
    Route::get('/admin/categories/index', [CategoryController::class, 'create'])->name('admin.categories.index');
    Route::get('/admin/categories/list', [CategoryController::class, 'index'])->name('admin.categories.list');
    Route::get('/categories/{id}/pages', [CategoryController::class, 'getPagesByCategory'])->name('admin.categories.pages');
    Route::post('/categories', [CategoryController::class, 'store'])->name('admin.categories.store');
    Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('admin.categories.update');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('admin.categories.destroy');

    //comments
    Route::get('/admin/comments/list', [CommentController::class, 'list'])->name('admin.comments.list');
    Route::delete('/comments/{id}', [CommentController::class, 'delete'])->name('admin.comments.delete');
    Route::patch('/comments/{id}/update-visibility', [CommentController::class, 'updateVisibility'])->name('admin.comments.visible');
});

Route::get('/comments', [CommentController::class, 'index'])->name('Comment.index');
Route::post('/comments', [CommentController::class, 'store'])->name('Comment.store');

Route::get('/admin/categories/listAll', [CategoryController::class, 'list'])->name('admin.categories.listAll');


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