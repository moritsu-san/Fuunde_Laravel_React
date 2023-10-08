<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;       
use App\Http\Controllers\ThreadController;       
use App\Http\Controllers\AnswerController;       
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\OAuthController;
use App\Models\Answer;

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
Route::post('/register/{provider}/callback', [OAuthController::class, 'handleRegisterCallback'])
            ->where('provider', 'github');

/**
 * thread
 */
Route::post('/postThread', [ThreadController::class, 'store']);
Route::get('/getThreadsByTime', [ThreadController::class, 'indexByTime']);
Route::get('/getThreadsByLike', [ThreadController::class, 'indexByLike']);
Route::get('/getThreadsByTime/{user_id}', [ThreadController::class, 'indexUserByTime']);
Route::get('/getThread/{thread_id}', [ThreadController::class, 'show']);
Route::put('/thread/{thread}/like', [ThreadController::class, 'like']);
Route::delete('/thread/{thread}/like', [ThreadController::class, 'unlike']);
Route::post('/searchThread', [ThreadController::class, 'search']);

/**
 * answer
 */
Route::post('/postAnswer/{thread_id}', [AnswerController::class, 'store']);
Route::get('/getAnswersWithThreadByTime', [AnswerController::class, 'indexByTime']);
Route::get('/getAnswersWithThreadByLike', [AnswerController::class, 'indexByLike']);
Route::get('/getAnswersWithThreadByTime/{user_id}', [AnswerController::class, 'indexUserByTime']);
Route::get('/getAnswer/{thread_id}', [AnswerController::class, 'show']);
Route::put('/answer/{answer}/like', [AnswerController::class, 'like']);
Route::delete('/answer/{answer}/like', [AnswerController::class, 'unlike']);
Route::post('/searchAnswer', [AnswerController::class, 'search']);

Route::get('/isLiked/{answer}', [AnswerController::class, 'isLiked']);
Route::get('/countLikes/{answer}', [AnswerController::class, 'countLikes']);

/**
 * user
 */
Route::get('/users/me', [UserController::class, 'getLoginUser']);
Route::get('/getAccountInfo/{username}', [UserController::class, 'getAccountInfo']);