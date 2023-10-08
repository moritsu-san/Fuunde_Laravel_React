<?php

namespace App\Repositories;

use App\Models\Thread;
use App\Models\User;
use Carbon\Carbon;

class ThreadRepository
{

    protected $thread;
    protected $user;

    public function __construct(Thread $thread, User $user)
    {
        $this->thread = $thread;
        $this->user = $user;
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

    public function getThread(int $thread_id)
    {
        return $this->thread->where('id', $thread_id)->withCount('likes')->with(['user:id,name,username', 'likes:id,name,username'])->firstOrFail();
    }

    public function getAnswer(int $thread_id)
    {
        return $this->findById($thread_id)->answers()->withCount('likes')->with(['user:id,name,username', 'likes:id,name,username'])->orderBy('likes_count', 'desc')->limit(20)->get();
    }

    //PaginatedThreadsを返す
    public function getPaginatedThreadsByTime()
    {
        return $this->thread->withCount('likes')->with(['user:id,name,username', 'likes:id,name,username'])->orderBy('created_at', 'desc')->limit(20)->get();
    }

    public function getPaginatedThreadsByLike()
    {
        return $this->thread->withCount('likes')->with(['user:id,name,username', 'likes:id,name,username'])->orderBy('likes_count', 'desc')->limit(20)->get();
    }

    public function getPaginatedUserThreadsByTime(int $user_id)
    {   
        $user = $this->user->where('id', $user_id)->firstOrFail();
        if (!$user) {
            return $user;
        }
        return $user->threads()->withCount('likes')->with(['user:id,name,username', 'likes:id,name,username'])->orderBy('created_at', 'desc')->limit(20)->get();
    }

    //いいね数順にソートされたanswersと共にThreadを返す
    public function getThreadWithAnswers(int $thread_id)
    {
        return $this->thread->withCount('likes')->with(['answers' => function ($query) {
            $query->withCount('likes')->with(['user:id,name,username', 'likes:id,name,username'])->orderBy('likes_count', 'desc')->get();
        }, 'user:id,name,username', 'likes:id,name,username'])->where('id', $thread_id)->firstOrFail();
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
