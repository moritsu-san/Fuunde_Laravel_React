<?php

namespace App\Services;

use App\Models\Answer;
use App\Repositories\AnswerRepository;
use App\Repositories\ThreadRepository;
use Carbon\Carbon;
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

    public function createNewAnswer(string $thread_id, array $data)
    {
        DB::beginTransaction();
        try{
            $thread = $this->thread_repository->findById($thread_id);
            $thread->answers()->create($data);
            $this->thread_repository->updateTime($thread_id);
        } catch (Throwable $error){
            DB::rollback();
            info($error->getMessage());
            throw $error;
        }
        DB::commit();

        return $thread;
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
