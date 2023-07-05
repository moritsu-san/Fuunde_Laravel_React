<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;       
use App\Http\Controllers\ThreadController;       
use App\Http\Controllers\AnswerController;       
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\OAuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*今のところ使わない*/
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

/**
 * 認証
 */
Route::post('/register', [RegisterController::class, 'register'])->name('register');
Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
Route::get('/login/{provider}', [OAuthController::class, 'getProviderOAuthURL'])
            ->where('provider', 'github')->name('oauth.request');
Route::post('/login/{provider}/callback', [OAuthController::class, 'handleProviderCallback'])
            ->where('provider', 'github')->name('oauth.callback');
Route::get('/users/me', [UserController::class, 'show'])->name('user');


Route::post('/postOdai', [ThreadController::class, 'store'])->name('postOdai');

Route::get('/getOdais', [ThreadController::class, 'index']);

Route::get('/threads/{id}', [ThreadController::class, 'shosai']);

Route::get('/isLiked/{answer}', [AnswerController::class, 'isLiked']);
Route::get('/countLikes/{answer}', [AnswerController::class, 'countLikes']);

Route::put('/{answer}/like', [AnswerController::class, 'like'])->name('like');
Route::delete('/{answer}/like', [AnswerController::class, 'unlike'])->name('unlike');
