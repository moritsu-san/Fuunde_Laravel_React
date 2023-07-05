<?php

namespace App\Repositories;

use App\Models\Thread;
use Carbon\Carbon;

class ThreadRepository
{

    protected $thread;

    public function __construct(Thread $thread)
    {
        $this->thread = $thread;
    }

    public function findById(int $id)
    {
        return $this->thread->find($id);
    }

    public function create(array $data)
    {
        return $this->thread->create($data);
    }

    public function update(int $id , string $body)
    {
        $this->findById($id)->fill(['body' => $body])->save();
    }

    //いいね数順にソートされたanswersと共にPaginatedThreadsを返す
    public function getPaginatedThreadsWithAnswers(int $per_page)
    {
        return $this->thread->with(['answers' => function ($query) {
            $query->withCount('likes')->orderBy('likes_count', 'desc')->get();
        }])->orderBy('latest_answer_time', 'desc')->paginate($per_page);
    }

      //いいね数順にソートされたanswersと共にThreadを返す
      public function getThreadWithAnswers(int $thread_id)
      {
          return $this->thread->with(['answers' => function ($query) {
              $query->withCount('likes')->orderBy('likes_count', 'desc')->get();
          }])->find($thread_id);
      }

    public function updateTime(int $id)
    {
        $thread = $this->findById($id);
        $thread->latest_answer_time = Carbon::now();
        return $thread->save();
    }

    public function deleteThread(int $id)
    {
        $thread = $this->findById($id);
        return $thread->delete();
    }

}
