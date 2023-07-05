<nav class="bg-black border-gray-200 px-2 dark:bg-gray-900">
    <div class="max-w-5xl flex flex-wrap items-center mx-auto">
        <a class="navbar-brand my-2 text-xl text-white hover:text-gray-300 transition-colors" href="{{ route('answer.recent') }}">
            <i class="fa-solid fa-microphone-lines"></i>
            {{ config('app.name') }}
        </a>

        @guest
            <div class="flex ml-auto md:order-2">
                <ul id="nav-right" class="flex items-center">
                    @if (Route::has('login'))
                    <li>
                        <a href="{{ route('login') }}" class="block cursor-pointer py-2 px-2 mr-2 text-xs bg-orange-500 hover:bg-orange-600 text-white rounded hover:text-gray-300 transition-colors md:px-4 md:text-base">{{ __('form.login.name') }}</a>
                    </li>
                    @endif

                    @if (Route::has('register'))
                    <li>
                        <a href="{{ route('register') }}" class="block cursor-pointer py-2 px-2 mr-4 text-xs bg-orange-500 hover:bg-orange-600 text-white rounded hover:text-gray-300 transition-colors md:px-4 md:text-base md:mr-0">{{ __('form.register.name') }}</a>
                    </li>
                    @endif
                </ul>
                {{-- humburger menu --}}
                <button data-collapse-toggle="navbar-cta" type="button" class="inline-flex items-center text-sm text-white rounded-lg md:hidden focus:outline-none focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                </button>
            </div>

            {{-- nav menu start --}}
            <div class="items-center justify-between hidden w-full absolute z-10 top-11 right-0 md:flex md:w-auto md:order-1 md:ml-6 " id="navbar-cta">
                <ul class="p-1 mb-1 w-full flex flex-col border border-gray-100 rounded-lg bg-black md:flex-row md:p-0 md:my-0 md:text-sm md:font-medium md:border-0">
                    <li><a href="{{ route('answer.recent') }}" target="_self" class="{{ url()->current() == route('answer.recent') || url()->current() == route('answer.popular') || url()->current() == route('root') ? 'bg-purple-500' : 'bg-black' }} block cursor-pointer px-2 py-3 rounded text-white hover:text-gray-300 transition-colors text-sm md:mr-6 md:rounded-none">アンサー</a></li>
                    <li><a href="{{ route('odai.recent') }}" target="_self" class="{{ url()->current() == route('odai.recent') || url()->current() == route('odai.popular') ? 'bg-purple-500' : 'bg-black' }} block cursor-pointer px-2 py-3 rounded text-white hover:text-gray-300 transition-colors text-sm md:mr-6 md:rounded-none">お題</a></li>
                    <li><a href="{{ route('MC.recent') }}" target="_self" class="{{ url()->current() == route('MC.recent') ? 'bg-purple-500' : 'bg-black' }} block cursor-pointer px-2 py-3 rounded text-white hover:text-gray-300 transition-colors text-sm md:mr-6 md:rounded-none">MC</a></li>
                </ul>
            </div>
            {{-- nav menu end --}}

        @else
            <div class="flex items-center ml-auto md:order-2">
                <button type="button" class="mr-1 text-sm bg-black cursor-pointer md:mr-0 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                    <i class="fa-solid fa-circle-user fa-lg mr-1 rounded-full text-white hover:text-gray-300 transition-colors"></i>
                    <span class="text-white hover:text-gray-300 transition-colors">{{ Auth::user()->name }}</span>
                </button>
                <!-- Dropdown menu start -->
                <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                    <div class="px-4 py-3">
                        <span class="block text-sm text-gray-900 dark:text-white">{{ Auth::user()->name }}</span>
                        <span class="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{{ Auth::user()->email }}</span>
                    </div>
                    <ul class="py-1" aria-labelledby="user-menu-button">
                        <li>
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">マイページ</a>
                        </li>
                        <li>
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">設定</a>
                        </li>
                        <li>
                            <a href="{{ route('logout') }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onclick="event.preventDefault(); document.getElementById('logout-form').submit();" >{{ __('form.logout.name') }}</a>
                        </li>
                    </ul>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                        @csrf
                    </form>
                </div>
                <!-- Dropdown menu end -->

                {{-- humburger menu --}}
                <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-auto text-sm text-white rounded-lg md:hidden focus:outline-none focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                </button>
            </div>

            {{-- nav menu start --}}
            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 md:ml-6 " id="mobile-menu-2">
                <ul class="flex flex-col border border-gray-100 rounded-lg bg-black md:flex-row md:mt-0 md:text-sm md:font-medium md:border-0">
                    <li><a href="{{ route('answer.recent') }}" target="_self" class="{{ url()->current() == route('answer.recent') || url()->current() == route('answer.popular') || url()->current() == route('root') ? 'bg-purple-500' : 'bg-black' }} block cursor-pointer px-2 py-3 mr-6 text-white hover:text-gray-300 transition-colors text-sm">アンサー</a></li>
                    <li><a href="{{ route('odai.recent') }}" target="_self" class="{{ url()->current() == route('odai.recent') || url()->current() == route('odai.popular') ? 'bg-purple-500' : 'bg-black' }} block cursor-pointer px-2 py-3 mr-6 text-white hover:text-gray-300 transition-colors text-sm">お題</a></li>
                    <li><a href="{{ route('MC.recent') }}" target="_self" class="{{ url()->current() == route('MC.recent') ? 'bg-purple-500' : 'bg-black' }} block cursor-pointer px-2 py-3 mr-6 text-white hover:text-gray-300 transition-colors text-sm">MC</a></li>
                    <li> @include("components.thread-create") </li>
                </ul>
            </div>
            {{-- nav menu end --}}

        @endguest
  </div>
</nav>

