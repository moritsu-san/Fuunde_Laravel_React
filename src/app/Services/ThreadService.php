<?php

namespace App\Services;

use App\Repositories\ThreadRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Throwable;

class ThreadService
{

    protected $thread_repository;

    public function __construct(ThreadRepository $thread_repository)
    {
        $this->thread_repository = $thread_repository;
    }

    public function createThread(string $body, string $user_id)
    {   
        $store_data = [
            'body' => $body,
            'user_id' => $user_id,     
            'latest_answer_time' => Carbon::now()
        ];

        DB::beginTransaction();
        try{
            $thread = $this->thread_repository->create($store_data);
            DB::commit();
            return $thread;
        } catch (Throwable $error){
            DB::rollback();
            info($error->getMessage());
            throw $error;
        }
    }

    public function getThread(int $thread_id)
    {
        $thread = $this->thread_repository->getThread($thread_id);
        return $thread;
    }

    //PaginatedThreadsを取得
    public function getThreadsByTime()
    {
        $threads = $this->thread_repository->getPaginatedThreadsByTime();
        return $threads;
    }

    public function getThreadsByLike()
    {
        $threads = $this->thread_repository->getPaginatedThreadsByLike();
        return $threads;
    }

    public function getUserThreadsByTime(int $user_id)
    {
        $threads = $this->thread_repository->getPaginatedUserThreadsByTime($user_id);
        return $threads;
    }

    public function getThreadWithAnswers(int $thread_id)
    {
        $thread = $this->thread_repository->getThreadWithAnswers($thread_id);
        return $thread;
    }

    public function updateThread(int $thread_id, string $body)
    {
        DB::beginTransaction();
        try{
            $this->thread_repository->update($thread_id, $body);
        } catch (Throwable $error){
            DB::rollback();
            info($error->getMessage());
            throw $error;
        }
        DB::commit();
    }
}
