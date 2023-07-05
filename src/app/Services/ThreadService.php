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

    public function createNewThread(string $user_id, array $data)
    {
        DB::beginTransaction();
        try{
            $thread_data = $this->getThreadData($user_id, $data['name'], $data['body']);
            $thread = $this->thread_repository->create($thread_data);
        } catch (Throwable $error){
            DB::rollback();
            info($error->getMessage());
            throw $error;
        }
        DB::commit();
        return $thread;
    }

    public function getThreadData(string $user_id, string $name, string $body)
    {
        return [
            'user_id' => $user_id,
            'name' => $name,
            'body' => $body,
            'latest_answer_time' => Carbon::now()
        ];
    }

    //いいね数順にそｑされたanswersと共にPaginatedThreadsを取得
    public function getThreadsWithAnswers(int $per_page)
    {
        $threads = $this->thread_repository->getPaginatedThreadsWithAnswers($per_page);
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
