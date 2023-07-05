@extends('layouts.app')

@section('title', 'ユーザー登録')

@section('content')
<section class="">
    <div class="items-center px-5 py-3 lg:px-20">
        <div class="flex flex-col w-full max-w-md p-10 mx-auto mt-0 transition duration-500 ease-in-out transform bg-white rounded-lg">
            <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-2">ユーザー登録</h2>
            <div class="mt-3">
                <div class="mt-3">
                    <form action="{{ route('register') }}" method="POST" class="space-y-6">
                        @csrf
                        {{-- ユーザー名 --}}
                        <div>
                            <label for="name" class="block text-sm font-medium text-neutral-600">{{ __('app.UserName') }}</label>
                            <div class="mt-1">
                                <input id="name" name="name" type="text" autocomplete="name" placeholder="登録後の変更はできません" class="@error('name') ring-1 ring-red-500 @enderror block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-1" value="{{ old('name') }}" autocomplete="name">
                                @error('name')
                                    <span class="text-red-500 text-sm" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        {{-- メールアドレス --}}
                        <div class="space-y-1">
                            <label for="email" class="block text-sm font-medium text-neutral-600">{{ __('app.EmailAddress') }}</label>
                            <div class="mt-1">
                                <input id="email" name="email" type="email" placeholder="{{ __('app.EmailAddress') }}" class="@error('email') ring-1 ring-red-500 @enderror block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-1" value="{{ old('email') }}" autocomplete="email">
                                @error('email')
                                    <span class="text-red-500 text-sm" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        {{-- パスワード --}}
                        <div class="space-y-1">
                            <label for="password" class="block text-sm font-medium text-neutral-600">{{ __('app.Password') }}</label>
                            <div class="mt-1">
                                <input id="password" name="password" type="password" autocomplete="new-password" placeholder="英数字8文字以上" class="@error('password') ring-1 ring-red-500 @enderror block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-1">
                                @error('password')
                                    <span class="text-red-500 text-sm" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        {{-- パスワード(確認) --}}
                        <div class="space-y-1">
                            <label for="password-confirm" class="block text-sm font-medium text-neutral-600">{{ __('app.ConfirmPassword') }}</label>
                            <div class="mt-1">
                                <input id="password-confirm" name="password_confirmation" type="password" autocomplete="new-password" placeholder="英数字8文字以上" class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-1">
                            </div>
                        </div>

                        {{-- ログインはこちら --}}
                        <div class="flex items-center justify-end">
                            <div class="text-sm">
                                <a href="{{ route('login' ) }}" class="font-medium text-blue-600 hover:text-blue-500">ログインはこちら</a>
                            </div>
                        </div>

                        <div>
                            <button type="submit" class="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-500">登録</button>
                        </div>
                    </form>

                    {{-- Social Login --}}
                    <div class="relative my-4">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-300"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-2 text-neutral-600 bg-white"> Or continue with </span>
                        </div>
                    </div>
                    <div>
                        <a href='{{ route('login.{provider}', 'google') }}' type="submit" class="w-full items-center block px-10 py-3.5 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                            <div class="flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="w-6 h-6" viewBox="0 0 48 48">
                                    <defs>
                                        <path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"></path>
                                    </defs>
                                    <clipPath id="b">
                                        <use xlink:href="#a" overflow="visible"></use>
                                    </clipPath>
                                    <path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"></path>
                                    <path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"></path>
                                    <path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"></path>
                                    <path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"></path>
                                </svg>
                                <span class="ml-4">Googleで登録</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
