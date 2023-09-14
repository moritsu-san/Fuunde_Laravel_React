<?php

namespace App\Services;

use App\Repositories\UserRepository;

class UserService
{

    protected $user_repository;

    public function __construct(UserRepository $user_repository)
    {
        $this->user_repository = $user_repository;
    }

    public function getAccountInfo(string $username)
    {
        $account_info = $this->user_repository->getAccountInfo($username);

        return $account_info;
        
    }
}
