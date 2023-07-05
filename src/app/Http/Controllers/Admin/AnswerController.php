<?php

namespace App\Http\Controllers\Admin;

use App\Repositories\AnswerRepository;
use Illuminate\Support\Facades\Log;
use App\Models\Thread;
use Throwable;

use App\Http\Controllers\Controller;

class AnswerController extends Controller
{

    protected $answer_repository;

    public function __construct(
        AnswerRepository $answer_repository
    )
    {
        $this->answer_repository = $answer_repository;
    }

    public function destroy(Thread $thread, $id)
    {
        try {
            $this->answer_repository->deleteAnswer($id);
        } catch (Throwable $error) {
            Log::error($error);
            return redirect()->route('admin.threads.show', $thread->id)->with('error', 'アンサーの削除に失敗しました...');

        }

        return redirect()->route('admin.threads.show', $thread->id)->with('success', 'アンサーを削除しました!');
    }

}
