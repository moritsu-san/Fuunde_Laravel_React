<?php

namespace App\Services;

use App\Repositories\AnswerRepository;
use App\Repositories\ThreadRepository;
use Illuminate\Support\Facades\DB;
use Throwable;

class AnswerService
{
    protected $thread_repository;
    protected $answer_repository;


    public function __construct(
        ThreadRepository $thread_repository,
        AnswerRepository $answer_repository
    )
    {
        $this->thread_repository = $thread_repository;
        $this->answer_repository = $answer_repository;
    }

    public function getAnswersWithThreadByTime()
    {
        $answers = $this->answer_repository->getPagenatedAnswersWithThreadByTime();
        return $answers;
    }

    public function getAnswersWithThreadByLike()
    {
        $answers = $this->answer_repository->getPagenatedAnswersWithThreadByLike();
        return $answers;
    }

    public function getUserAnswersWithThreadByTime(int $user_id)
    {
        $answers = $this->answer_repository->getPagenatedUserAnswersWithThreadByTime($user_id);
        return $answers;
    }

    public function createAnswer(int $thread_id, string $body, int $user_id)
    {   
        $store_data = [
            'body' => $body,
            'user_id' => $user_id,     
            'thread_id' => $thread_id,
        ];

        DB::beginTransaction();
        try{
            $answer = $this->answer_repository->create($store_data);
            $this->thread_repository->updateTime($thread_id);
            DB::commit();
            return $answer;
        } catch (Throwable $error){
            DB::rollback();
            info($error->getMessage());
            throw $error;
        }
    }

    public function convertUrl(string $answer)
    {
        $answer = e($answer);
        $pattern = '/((?:https?|ftp):\/\/[-_.!~*\'()a-zA-Z0-9;\/?:@&=+$,%#]+)/';
        $replace = '<a href="$1" target="_blank">$1</a>';
        $answer = preg_replace($pattern, $replace, $answer);
        return $answer;
    }
}
