<?php

namespace App\Http\Controllers\Auth;
use Laravel\Socialite\Facades\Socialite;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class OAuthController extends Controller
{
    /**
     * （各認証プロバイダーの）OAuth認可画面URL取得API
     * @param string $provider 認証プロバイダーとなるサービス名
     * @return \Illuminate\Http\JsonResponse
     */
    public function getProviderOAuthURL(string $provider)
    {
        $redirectUrl = Socialite::driver($provider)->redirect()->getTargetUrl();
        return response()->json([
            'redirect_url' => $redirectUrl,
        ]);
    }

    /**
     * ソーシャルログインAPI（各認証プロバイダーからのコールバック後）
     * @param string $provider 認証プロバイダーとなるサービス名
     * @return App\User
     */
    public function handleProviderCallback(string $provider)
    {
        try {
            $providerUser = Socialite::driver($provider)->user();
        } catch (\Exception $e) {
            // TODO ログ出力など
            abort(500, 'hello');
        }

        $authUser = User::socialFindOrCreate($providerUser, $provider);
        Auth::login($authUser, true);

        // ログインのみ or 既存ユーザに紐づけ + ログイン：200
        // 紐づけしたうえでユーザ新規登録 + ログイン：201
        return $authUser;
    }
}
