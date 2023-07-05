<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Repositories\AnswerRepository;

use Illuminate\Http\Request;

class LikeController extends Controller
{

    protected $thread_repository;

    public function __construct(
        AnswerRepository $answer_repository
    )
    {
        $this->answer_repository = $answer_repository;
    }

    public function store($id)
    {
        $answer = $this->answer_repository->findById($id);
        $answer->users()->attach(Auth::id());
        $count = $answer->users()->count();
        $result = true;
        return response()->json([
            'result' => $result,
            'count' => $count,
        ]);
    }

    public function destroy($id)
    {
        $answer = $this->answer_repository->findById($id);
        $answer->users()->detach(Auth::id());
        $count = $answer->users()->count();
        $result = false;
        return response()->json([
            'result' => $result,
            'count' => $count,
        ]);
    }

    public function count ($id)
    {
        $answer = $this->answer_repository->findById($id);
        $count = $answer->users()->count();
        return response()->json($count);
    }

    public function haslikes ($id)
    {
        $answer = $this->answer_repository->findById($id);
        if ($answer->users()->where('user_id', Auth::id())->exists()) {
            $result = true;
        } else {
            $result = false;
        }
        return response()->json($result);
    }
}
