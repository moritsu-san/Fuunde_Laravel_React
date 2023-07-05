@extends('layouts.app')

@section('title', '踏んで - お題詳細')

@section('content')
@inject('answer_service', 'App\Services\AnswerService')
@include('components.flash-message')
<div class="container mx-auto">
    <div class="">
        @include('components.thread-index-back')
        @include('components.answer-create', compact('thread'))
        <div class="text-center">
            <h3 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">「{!! $answer_service->convertUrl($thread->body) !!}」</h3>
            <h6 class="pb-2 mb-0 text-sm text-gray-400 border-bottom">
                <i class="fa-solid fa-circle-user"></i> {{ $thread->name }} <i class="fa-solid fa-clock"></i> {{ $thread->created_at->format('Y/m/d H:i:s') }}
            </h6>
        </div>
    </div>

    <div class="">
        @foreach ($thread->answers as $answer)
            @include('components.answer-card')
        @endforeach
    </div>
</div>
@endsection
