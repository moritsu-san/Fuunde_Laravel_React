<script setup>
import { useStoreAuth } from '../stores/auth'
import { useStoreReload } from '../stores/reload'
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import NavMenu from './NavMenu.vue'
import OdaiCreate from './OdaiCreate.vue'

const router = useRouter()
const route = useRoute()
const auth = useStoreAuth()
const reload = useStoreReload()

const isLogin = computed(() => auth.check)
const username = computed(() => auth.username)
const useremail= computed(() => auth.useremail)

const callReload = () => {
    if(route.fullPath == "/answer/recent") {
        reload.setStatus(!reload.status) 
    }
}

const logout = async () => {
    await auth.logout()

    if (auth.apiStatus) {
        router.push('/login')
    }
}
</script>

<template>
    <nav class="bg-white border-b-2 border-gray-200 px-2 dark:bg-gray-900">
        <div class="max-w-5xl flex flex-wrap items-center mx-auto">
            <RouterLink @click="callReload" to="/answer/recent" class="navbar-brand my-2 text-xl text-lime-700 hover:text-lime-800 transition-colors">
                <i class="fa-solid fa-microphone-lines"></i>
                踏んで
            </RouterLink>

            <div class="flex ml-auto md:order-2">
                <ul v-show="!isLogin" id="nav-right" class="flex items-center">
                    <li>
                        <RouterLink to="/login" class="block cursor-pointer py-2 px-2 mr-2 text-xs bg-lime-700 hover:bg-lime-800 text-white rounded hover:text-gray-300 transition-colors md:px-4 md:text-base">ログイン</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/register" class="block cursor-pointer py-2 px-2 mr-4 text-xs bg-lime-700 hover:bg-lime-800 text-white rounded hover:text-gray-300 transition-colors md:px-4 md:text-base md:mr-0">新規登録</RouterLink>
                    </li>
                </ul>

                <!-- user menu -->
                <div v-show="isLogin" class="flex items-center ml-auto mr-1 md:mr-0 md:order-2">
                    <button type="button" class="mr-1 text-sm bg-black cursor-pointer md:mr-0 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <i class="fa-solid fa-circle-user fa-xl mr-1 rounded-full text-gray-500 hover:text-black transition-colors"></i>
                        <span class="text-gray-500 hover:text-black transition-colors">{{ username }}</span>
                    </button>

                    <!-- user menu dropdown -->
                    <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                        <div class="px-4 py-3">
                            <span class="block text-sm text-gray-900 dark:text-white">{{ username }}</span>
                            <span class="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{{ useremail }}</span>
                        </div>
                        <ul class="py-1" aria-labelledby="user-menu-button">
                            <li>
                                <RouterLink to="#" class="block px-4 py-2 text-sm text-gray-700 hover:font-bold dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">マイページ</RouterLink>
                            </li>
                            <li>
                                <RouterLink to="#" class="block px-4 py-2 text-sm text-gray-700 hover:font-bold dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">設定</RouterLink>
                            </li>
                            <li>
                                <button v-show="isLogin" class="block px-4 py-2 m-0 text-sm text-gray-700 hover:font-bold dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" @click.preventDefault="logout">ログアウト</button>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- humburger menu -->
                <button data-collapse-toggle="navbar-cta" type="button" class="inline-flex items-center text-sm text-black rounded-lg md:hidden focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                </button>
            </div>

            <!-- nav menu -->
            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 md:ml-6 " id="navbar-cta">
                <ul class="p-1 mb-1 w-full flex flex-col border border-gray-100 md:flex-row md:p-0 md:my-0 md:text-sm md:font-medium md:border-0">
                    <NavMenu name="アンサー" linkName="/answer/recent" />
                    <NavMenu name="お題" linkName="/odai/recent" />
                    <NavMenu name="MC" linkName="/MC/recent" />
                    <li v-show="isLogin"><OdaiCreate /></li>
                </ul>
            </div>
        </div>
    </nav>
</template>