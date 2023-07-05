<div class="max-w-sm pt-6 pb-3 px-3 mx-auto my-4 text-center bg-white border border-gray-200 relative rounded-lg shadow-md">
    @include('components.answer-options')
    @include('components.answer-delete', compact(['thread', 'answer']))
    <div class="pb-2">
        <h6 class="pb-2 mb-0 text-base text-gray-800 border-bottom">
            {{ $loop->iteration }} <i class="fa-solid fa-circle-user"></i> {{ $answer->name }} <i class="fa-solid fa-clock"></i> {{ $answer->created_at->format('Y/m/d H:i:s') }}
        </h6>
        <h3 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">「{!! $answer_service->convertUrl($answer->body) !!}」</h3>
        <like-component
            :initial-is-liked-by="@json($answer->isLikedBy(Auth::user()))"
            :initial-count-likes="@json($answer->count_likes)"
            :authorized="@json(Auth::check())"
            endpoint="{{ route('answers.like', ['answer' => $answer]) }}"
        >
        </like-component>
    </div>
</div>
