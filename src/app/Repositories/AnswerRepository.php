<?php
namespace App\Repositories;

use App\Models\Answer;
use App\Models\User;

class AnswerRepository
{
    protected $answer;
    protected $user;

    public function __construct(
        Answer $answer,
        User $user
    )
    {
        $this->answer = $answer;
        $this->user = $user;
    }

    public function findById(int $id)
    {
        return $this->answer->find($id);
    }

    public function create(array $data)
    {
        return $this->answer->create($data);
    }


    public function getPagenatedAnswersWithThreadByTime()
    {
        return $this->answer->withCount('likes')->with(['user:id,name,username', 'likes:id,name,username', 'thread' => function ($query) {
            $query->with(['user:id,name,username'])->withCount('likes')->get();
        }])->orderBy('created_at', 'desc')->limit(20)->get();
    }

    public function getPagenatedAnswersWithThreadByLike()
    {
        return $this->answer->withCount('likes')->with(['user:id,name,username', 'likes:id,name,username', 'thread' => function ($query) {
            $query->with(['user:id,name,username'])->withCount('likes')->get();
        }])->orderBy('likes_count', 'desc')->limit(20)->get();
    }

    public function getPagenatedUserAnswersWithThreadByTime(int $user_id)
    {   
        $user = $this->user->where('id', $user_id)->firstOrFail();
        if (!$user) {
            return $user;
        }
        return $user->answers()->withCount('likes')->with(['user:id,name,username', 'likes:id,name,username', 'thread' => function ($query) {
            $query->with(['user:id,name,username'])->withCount('likes')->get();
        }])->orderBy('created_at', 'desc')->limit(20)->get();
    }

    public function deleteAnswer(int $id)
    {
        $answer = $this->findById($id);
        return $answer->delete();
    }
}
