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

    public function getPagenatedAnswersWithThreadByTime()
    {
        return $this->answer->withCount('likes')->with(['user:id,name,username', 'likes', 'thread' => function ($query) {
            $query->with(['user:id,name,username'])->withCount('likes')->get();
        }])->orderBy('created_at', 'desc')->limit(20)->get();
    }

    public function deleteAnswer(int $id)
    {
        $answer = $this->findById($id);
        return $answer->delete();
    }
}
