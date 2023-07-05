<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStoreUrl } from './stores/url'
import { useStoreError } from './stores/error'
import { INTERNAL_SERVER_ERROR } from './util'
import Header from './components/Header.vue'
import Message from './components/Message.vue'

const route = useRoute()
const router = useRouter()
const url = useStoreUrl()
const e = useStoreError()
const code = computed(() => e.code)

watch(route, () => {
    url.setPath(route.path)

    const pathInitial = url.path.split('/')[1]
    // const pathSecond = url.path.split('/')[3]
    url.setPathInitial(pathInitial)
    // url.setPathSecond(pathSecond)
})

watch(code, (code) => {
    if (code === INTERNAL_SERVER_ERROR) {
        console.log('500')
        router.push('/500')
    }
})
</script>

<template>
    <Header/>
    <div id='wrapper' class="h-fit max-w-5xl py-6 mx-auto">
        <div  id="container" class="container mx-auto px-4">
            <RouterView/>
        </div>
    </div>
</template>