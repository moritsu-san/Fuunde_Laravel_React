<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Thread;
use App\Http\Requests\ThreadRequest;
use App\Services\ThreadService;
use App\Repositories\ThreadRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Throwable;

class IndexController extends Controller
{
    protected $thread_service;
    protected $thread_repository;

    public function __construct(
        ThreadService $thread_service,
        ThreadRepository $thread_repository
    )
    {
        $this->authorizeResource(Thread::class, 'thread');
        $this->thread_service = $thread_service;
        $this->thread_repository = $thread_repository;
    }

    public function index_answers(Request $request)
    {   
        $path = $request->path();
        if ($path == 'answer/recent' || $path == '/') {
            $threads = $this->thread_service->getThreadsWithAnswers(10);
            return view('threads.index', compact('threads'));
        } elseif ($path == 'answer/popular') {
            $threads = $this->thread_service->getThreadsWithAnswers(10);
            return view('threads.index', compact('threads'));
        }
    }

    public function index_themes(Request $request)
    {
        $path = $request->path();
        if ($path == 'odai/recent') {
            $threads = $this->thread_service->getThreadsWithAnswers(10);
            return view('threads.index', compact('threads'));
        } elseif ($path == 'odai/popular') {
            $threads = $this->thread_service->getThreadsWithAnswers(10);
            return view('threads.index', compact('threads'));
        }
    }

    public function index_MCs(Request $request)
    {
        $path = $request->path();
        if ($path == 'MC/recent') {
            $threads = $this->thread_service->getThreadsWithAnswers(10);
            return view('threads.index', compact('threads'));
        } elseif ($path == 'MC/popular') {
            $threads = $this->thread_service->getThreadsWithAnswers(10);
            return view('threads.index', compact('threads'));
        }
    }
}
