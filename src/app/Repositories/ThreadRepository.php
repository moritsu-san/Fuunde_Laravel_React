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

    //PaginatedThreadsを返す
    public function getPaginatedThreadsByTime()
    {
        return $this->thread->withCount('likes')->with(['user:id,name,username', 'likes'])->orderBy('created_at', 'desc')->limit(20)->get();
    }

    public function getPaginatedThreadsByLike()
    {
        return $this->thread->withCount('likes')->with(['user:id,name,username', 'likes'])->orderBy('likes_count', 'desc')->limit(20)->get();
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
