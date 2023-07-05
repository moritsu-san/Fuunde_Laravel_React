<script setup>
import { reactive, computed } from 'vue'
import { useStoreAuth } from '../stores/auth' 
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useStoreAuth()


const loginForm = reactive({
    email: '',
    password: '',
})

const errorEmail = computed(() => auth.loginErrorMessages.email)
const errorPassword = computed(() => auth.loginErrorMessages.password)

const login = async () => {
    console.log('hello')
    await auth.login(loginForm)

    if (auth.apiStatus) {
        router.push('/')
    }
}

</script>
<template>
    <div class="items-center px-5 py-12 lg:px-20">
        <div class="flex flex-col w-full max-w-md p-10 mx-auto my-0 transition duration-500 ease-in-out transform bg-white rounded-lg">
            <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4">踏んでにログイン</h2>
            <div class="mt-3">
                <div class="mt-3">
                    <form class="space-y-6" @submit.prevent="login">
                        <!-- メールアドレス -->
                        <div>
                            <label for="email" class="block text-sm font-medium text-neutral-600">メールアドレス</label>
                            <div class="mt-1">
                                <input id="email" name="email" type="email" autocomplete="email" placeholder="メールアドレス" :class="(errorEmail) ? 'ring-1 ring-red-500' : ''" class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-1" v-model="loginForm.email">
                                <span v-for="error in errorEmail" v-show="errorEmail" :key="error" class="text-red-500 text-sm" role="alert">
                                    <strong>{{ error }}</strong>
                                </span>
                            </div>
                        </div>

                        <!-- パスワード -->
                        <div class="space-y-1">
                            <label for="password" class="block text-sm font-medium text-neutral-600">パスワード</label>
                            <div class="mt-1">
                                <input id="password" name="password" type="password" autocomplete="current-password" placeholder="パスワード" :class="(errorPassword) ? 'ring-1 ring-red-500' : ''" class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" v-model="loginForm.password">
                                <span v-for="error in errorPassword" v-show="errorPassword" :key="error" class="text-red-500 text-sm" role="alert">
                                    <strong>{{ error }}</strong>
                                </span>
                            </div>
                        </div>

                        <div class="flex items-center justify-between">
                            <!-- ログイン情報を保持 -->
                            <div class="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" placeholder="Your password" class="w-4 h-4 text-purple-600 border-gray-200 rounded focus:ring-purple-500">
                                <label for="remember-me" class="block ml-2 text-sm text-neutral-600"> ログイン情報を保持する </label>
                            </div>

                            <!-- パスワードを忘れた方 -->
                            <div class="text-sm">
                                <RouterLink to="" class="font-medium text-lime-600 hover:text-lime-700">パスワードを忘れた方</RouterLink>
                            </div>
                        </div>

                        <div>
                            <button type="submit" class="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-purple-600 rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">ログイン</button>
                        </div>
                    </form>

                    <!-- Social Login -->
                    <!-- <div class="relative my-4">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-300"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-2 text-neutral-600 bg-white"> Or continue with </span>
                        </div>
                    </div>
                    <div>
                        <RouterLink to='' type="submit" class="w-full items-center block px-10 py-3.5 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
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
                                <span class="ml-4">Googleでログイン</span>
                            </div>
                        </RouterLink>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>