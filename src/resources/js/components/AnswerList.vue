<script setup>
import { defineProps } from 'vue'
import { useStoreAuth } from '../stores/auth'
import LikeComponent from './LikeComponent.vue'

const auth = useStoreAuth()

const { answers } = defineProps({
    answers: {
        type: Array,
        default: [],
    }
})

</script>

<template>
    <div id="content" class="bg-white p-4 rounded-tr rounded-br rounded-bl">
        <div v-for="answer in answers" :key="answer.id">
            <div class="max-w-sm pt-6 pb-3 px-3 mx-auto my-4 text-center bg-white border border-gray-200 relative rounded-lg shadow-md">
                <div class="pb-2">
                    <h6 class="pb-2 mb-0 text-base text-gray-800 border-bottom">
                        <i class="fa-solid fa-circle-user"></i> {{ answer.name }} <i class="fa-solid fa-clock"></i>
                    </h6>
                    <h3 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">「{{ answer.body }}」</h3>
                    <LikeComponent :id="answer.id" :authorized="auth.check" :endpoint="`api/${answer.id}/like`" />
                </div>
            </div>
        </div>
    </div>
</template>