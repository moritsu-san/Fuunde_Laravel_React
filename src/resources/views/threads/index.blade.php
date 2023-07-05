@extends('layouts.app')

@section('title', '踏んで - お題一覧')

@section('content')
@inject('answer_service', 'App\Services\AnswerService')
<div  id="container" class="container mx-auto px-4">
    <div id="header-news" class="mt-6 ">
        @include('components.flash-message')
    </div>
    <div id="main-board" class="flex">
        <div id="main-container" class= "w-2/3 mr-10 row justify-content-center">
            <div class="content-menu">
                @include('components.content-menu')
            </div>
            <div id="content" class="{{ url()->current() == route('answer.recent') || url()->current() == route('root') ? 'rounded-tr rounded-br rounded-bl' : 'rounded' }} bg-white p-4">
                @foreach ($threads as $thread)
                    @include('components.thread-card')
                @endforeach
            </div>
            {{-- <div class="col-md-8">
                {{ $threads->links() }}
            </div> --}}
        </div>
        <div id="right-container" class="w-1/3">
            <div class="side-widget">
                <div class="side-widget-title">

                </div>
                <div class="side-widget-content">
                    最近のコメント
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

