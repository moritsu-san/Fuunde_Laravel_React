<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Mail\BareMail;
use App\Notifications\PasswordResetNotification;
use App\Models\Answer;
use App\Models\IdentityProvider;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'auth_type',
        'password',
    ];

    /**
     * The attributes that should be visible in arrays.
     *
     * @var array
     */
    protected $visible = [
        'id',
        'name',
        'username',
        'email',
        'auth_type',
        
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Undocumented function
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsToMany
     */
    public function threads(): BelongsToMany
    {
        return $this->belongsToMany('App\Models\Thread');
    }

    /**
     * Undocumented function
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsToMany
     */
    public function answers(): BelongsToMany
    {
        return $this->belongsToMany('App\Models\Answer');
    }

    /**
     * リレーション - IdentityProviders
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function identityProviders(): HasMany
    {
        return $this->hasMany(IdentityProvider::class);
    }

    /**
     * ソーシャルログイン処理
     * @param $providerUser プロバイダーユーザ情報
     * @param $provider プロバイダー名
     * @return App\User
     */
    public static function socialFindorCreate($providerUser, $provider)
    {
        $account = IdentityProvider::whereProviderName($provider)->whereProviderUserId($providerUser->getId())->first();

        // すでにアカウントがある場合は、そのユーザーを返す
        if ($account) {
            return $account->user;
        }

        $existingUser = User::whereEmail($providerUser->getEmail())->first();

        if ($existingUser) {
            // メールアドレスはユニークの関係上、同一メールアドレスユーザがいる場合は、そのユーザと紐づけて認証プロバイダー情報登録
            $user = DB::transaction(function () use ($existingUser, $providerUser, $provider) {
                $existingUser->update(['auth_type' => 'BOTH']);
                $existingUser->identityProviders()->create([
                    'provider_user_id' => $providerUser->getId(),
                    'provider_name' => $provider,
                ]);
                return $existingUser;
            });
        } else {
            // 同一のメールアドレスユーザもいない場合は、nameやemailのオブジェクトを$userとして返して、ユーザにusernameを決めさせる
            $providerUserName = $providerUser->getName() ? $providerUser->getName() : $providerUser->getNickname();
            return (object) [
                'name' => $providerUserName,
                'email' => $providerUser->getEmail(),
                'provider_user_id' => $providerUser->getId()
            ];
        }

        return $user;

    }

    /**
     * Undocumented function
     *
     * @param [type] $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new PasswordResetNotification($token, new BareMail()));
    }
}
