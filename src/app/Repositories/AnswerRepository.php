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

    public function deleteAnswer(int $id)
    {
        $answer = $this->findById($id);
        return $answer->delete();
    }
}
