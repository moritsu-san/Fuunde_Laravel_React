<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{   
    protected $user_service;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(UserService $user_service)
    {
        $this->middleware('auth');
        $this->user_service = $user_service;
    }

    /**
     * 現在ログインしているユーザ情報取得
     *
     * @return \App\User|null
     */
    public function getLoginUser()
    {
        return Auth::user()->only(['id', 'username', 'name', 'auth_type', 'email']);
    }

    /**
     * リクエストされたユーザーの情報を取得
     */
    public function getAccountInfo(string $username)
    {   
        $account_info = $this->user_service->getAccountInfo($username);
        return $account_info;
    }
}
