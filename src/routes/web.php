<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ThreadController;
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Admin;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/{any}', fn() => view('index'))->where('any', '.*');

// //index
// Route::get('/', [IndexController::class, 'index_answers'])->name('root');

//  //answer
// Route::group(['prefix' => 'answer', 'as' => 'answer.'], function() {
//     Route::get('/recent', [IndexController::class, 'index_answers'])->name('recent');
//     Route::get('/popular', [IndexController::class, 'index_answers'])->name('popular');
// });

//  //odai
// Route::group(['prefix' => 'odai', 'as' => 'odai.'], function() {
//     Route::get('/recent', [IndexController::class, 'index_themes'])->name('recent');
//     Route::get('/popular', [IndexController::class, 'index_themes'])->name('popular');
// });

//  //MC
// Route::group(['prefix' => 'MC', 'as' => 'MC.'], function() {
//     Route::get('/recent', [IndexController::class, 'index_MCs'])->name('recent');
//     Route::get('/popular', [IndexController::class, 'index_MCs'])->name('popular');
// });


// //process
// Auth::routes();
// Route::resource('/threads', ThreadController::class)->except(['index']);
// Route::resource('threads/{thread}/answers', AnswerController::class)->except(['create', 'update']);

//  //likes
// Route::group(['prefix' => 'answers', 'as' => 'answers.'], function () {
//     Route::put('/{answer}/like', [AnswerController::class, 'like'])->name('like');
//     Route::delete('/{answer}/like', [AnswerController::class, 'unlike'])->name('unlike');
// });

//  //OAuth
// Route::group(['prefix' => 'login', 'as' => 'login.'], function () {
//     Route::get('/{provider}', [LoginController::class, 'redirectToProvider'])->name('{provider}');
//     Route::get('/{provider}/callback', [LoginController::class, 'handleProviderCallback'])->name('{provider}.callback');
// });
// Route::group(['prefix' => 'register', 'as' => 'register.'], function () {
//     Route::get('/{provider}', [RegisterController::class, 'showProviderUserRegistrationForm'])->name('{provider}');
//     Route::post('/{provider}', [RegisterController::class, 'registerProviderUser'])->name('{provider}');
// });


// //Admin
// Route::group(['prefix' => 'admin'], function() {
//     Route::get('/', [Admin\LoginController::class, 'showLoginForm']);
//     Route::get('login', [Admin\LoginController::class, 'showLoginForm'])->name('admin.login');
//     Route::post('login', [Admin\LoginController::class, 'login']);
// });
// Route::group(['prefix' => 'admin', 'middleware' => 'auth:admin', 'as' => 'admin.'], function () {
//     Route::post('logout', [Admin\LoginController::class, 'logout'])->name('logout');
//     Route::resource('threads', Admin\ThreadController::class);
//     Route::resource('threads/{thread}/answers', Admin\AnswerController::class)->only('destroy');
// });
