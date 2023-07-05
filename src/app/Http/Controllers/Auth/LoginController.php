<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;

use App\Models\User;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * ログインAPI レスポンスカスタマイズ用メソッド
     *
     * @param Illuminate\Http\Request $request
     * @param \App\User $user
     * @return \App\User
     */
    protected function authenticated(Request $request, $user)
    {
        return $user;
    }

    /**
     * ログアウトAPI レスポンスカスタマイズ用メソッド
     *
     * @param Illuminate\Http\Request $request
     * @return Illuminate\Http\Response
     */
    protected function loggedOut(Request $request)
    {
        return response(null, 204);
    }

    /**
     * Undocumented function
     *
     * @param string $provider
     * @return void
     */
    public function redirectToProvider(string $provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    /**
     * Undocumented function
     *
     * @param Request $request
     * @param string $provider
     * @return void
     */
    public function handleProviderCallback(Request $request, string $provider)
    {
        $providerUser = Socialite::driver($provider)->stateless()->user();

        $user = User::where('email', $providerUser->getEmail())->first();

        if ($user) {
            $this->guard()->login($user);
            return $this->sendLoginResponse($request);
        }

        // $userがnullの場合
        return redirect()->route('register.{provider}', [
            'provider' => $provider,
            'email' => $providerUser->getEmail(),
            'token' => $providerUser->token,
        ]);
    }

}
