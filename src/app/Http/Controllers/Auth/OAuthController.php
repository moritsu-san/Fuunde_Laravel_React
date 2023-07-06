<?php

namespace App\Http\Controllers\Auth;
use Laravel\Socialite\Facades\Socialite;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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

        if (property_exists( $authUser, 'provider_user_id' )) {
            return response()->json($authUser, 422);
        }

        Auth::login($authUser, true);

        // ログインのみ or 既存ユーザに紐づけ + ログイン：200
        return $authUser;
    }

    public function handleRegisterCallback(string $provider, Request $request) {
        $request->validate([
            'name' => ['required', 'max:15', 'unique:users']
        ]);
        //アカウントがない場合は、ユーザ情報 + 認証プロバイダー情報を登録
        $user = DB::transaction(function () use ( $provider, $request) {
            $user = User::create([
                'name' => $request->input('name'),
                'nick_name' => $request->input('nick_name'),
                'auth_type' => 'SOCIAL',
                'email' => $request->input('email'),
            ]);
            $user->identityProviders()->create([
                'provider_user_id' => $request->input('provider_user_id'),
                'provider_name' => $provider,
            ]);
            return $user;
        });

        return $user;
    }
}
