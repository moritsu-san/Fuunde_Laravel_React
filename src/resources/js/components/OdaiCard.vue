<script setup> 
import { defineProps, computed } from 'vue'
import ShowAnswerLink from './ShowAnswerLink.vue'
import OdaiOptions from './OdaiOptions.vue'

const { item } = defineProps({
    item: {
        type: Object,
        required: true,
    },
})

const firstAnswer = item.answers[0]

const hasAnswer = computed(() => {
    if (item.answers.length === 0) {
        return false
    } else {
        return true
    }
})

</script>

<template>
    <div class="pt-6 pb-3 px-3 mx-auto my-4 text-center bg-purple-100 border border-purple-200 relative rounded-lg shadow-md">
        <OdaiOptions :item="item" />
        <RouteLink to="#" class="pb-2 block border-b border-purple-300">
            <h3 class="mb-2 text-3xl font-bold tracking-tight text-gray-900">「{{ item.body }}」</h3>
            <h6 class="pb-2 mb-0 text-sm text-gray-500 border-bottom">
                <i class="fa-solid fa-circle-user"></i> {{ item.name }} <i class="fa-solid fa-clock"></i> {{ 日付 }}
            </h6>
        </RouteLink>
        <div v-if="hasAnswer">
            <p class="mt-4 mb-0 text-lg text-gray-700">
                <i class="fa-solid fa-crown" style="color: rgb(211, 181, 13)"></i> ランキング1位 <i class="fa-solid fa-crown" style="color: rgb(211, 181, 13)"></i>
                <h4 class="mb-0 text-lg font-bold">
                    「{{ firstAnswer.body }}」
                </h4>
                <h5 class="mb-6 text-sm text-gray-400">
                    <i class="fa-solid fa-circle-user"></i> {{ firstAnswer.name }}
                    <i class="fa-solid fa-heart"></i> {{ firstAnswer.likes_count }}
                </h5>
            </p>
            <ShowAnswerLink :item="item" text="他のアンサーを見る" />
        </div>
        <div v-else>
            <p class="mt-4">
                <p>アンサーがまだありません</p><br>
            </p>
            <ShowAnswerLink :item="item" text="アンサーしてみる" />
        </div>
    </div>
</template>