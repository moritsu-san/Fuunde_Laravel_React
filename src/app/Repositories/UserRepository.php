<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{

    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function findByUsername(string $username)
    {
        return $this->user->where('username', $username)->firstOrFail();
    }

    public function sumAnswerLiked(User $user)
    {
        $answers = $user->answers();
        $like_counts = 0;
        $answers->each(function($answer) use(&$like_counts) {
            $like_counts += $answer->likes()->count();
        });
        return $like_counts;
    }

    public function getAccountInfo(string $username)
    {
        $account = $this->user->select('id', 'username', 'name', 'created_at')->where('username', $username)->firstOrFail();
        if(!$account) {
            return $account;
        }
        $account['answer_liked_counts'] = $this->sumAnswerLiked($account);
        $account['odai_counts'] = $account->threads()->count();
        $account['answer_counts'] = $account->answers()->count();
        return $account;
    }

}
