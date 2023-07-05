<div class="col-md-8 mb-5">
    <div class="card text-center">
        <div class="card-header">
            <h5 class="small"><i class="fa-solid fa-user">
                </i> {{ $thread->name }} <i class="fa-solid fa-clock"></i> {{ $thread->created_at->format('Y/m/d H:i:s') }}@include('components.thread_options')
            </h5>
            <h3 class="m-0">{!! $answer_service->convertUrl($thread->body) !!}</h3>
        </div>
        @foreach ($thread->answers as $answer)
            <div class="card-body">
                <h5 class="small"><i class="fa-solid fa-user"></i> {{ $answer->name }}  <i class="fa-solid fa-clock"></i> {{ $answer->created_at->format('Y/m/d H:i:s') }}</h5>
                <p class="card-text">{!! $answer_service->convertUrl($answer->body) !!}</p>
            </div>
            <div class="card-body pt-0 pb-2 pl-3">
                <div class="card-text">
                    <like-component
                        :initial-is-liked-by="@json($answer->isLikedBy(Auth::user()))"
                        :initial-count-likes="@json($answer->count_likes)"
                        :authorized="@json(Auth::check())"
                        endpoint="{{ route('answers.like', ['answer' => $answer]) }}"
                    >
                    </like-component>
                </div>
            </div>
            @include('components.answer-delete')
        @endforeach
        @include('components.show-links')
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card w-75 m-auto">
                    <h5 class="card-header user-select-none">新規アンサー投稿</h5>
                    <div class="card-body">
                        @include('components.answer-create')
                    </div>
              </div>
            </div>
        </div>
    </div>
</div>
