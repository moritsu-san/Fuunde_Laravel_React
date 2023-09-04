<?php
namespace App\Repositories;

use App\Models\Answer;

class AnswerRepository
{
    protected $answer;

    public function __construct(
        Answer $answer
    )
    {
        $this->answer = $answer;
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

    public function deleteAnswer(int $id)
    {
        $answer = $this->findById($id);
        return $answer->delete();
    }
}
