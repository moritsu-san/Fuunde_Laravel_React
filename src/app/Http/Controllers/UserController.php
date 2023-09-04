<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * 現在ログインしているユーザ情報取得
     *
     * @return \App\User|null
     */
    public function getLoginUser()
    {
        return Auth::user();
    }

    /**
     * リクエストされたユーザーの情報を取得
     */
    public function show(string $username)
    {
        return User::where('username', $username)->firstOrFail();
    }
}
