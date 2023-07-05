<script setup>
import { defineProps } from 'vue'

const { item, text } = defineProps({
    item: {
        type: Object,
        required: true,
    },
    text: {
        type: String,
        default: 'アンサーしてみる',
    },
})

</script>

<template>
    <div class="flex justify-end">
        <RouterLink :to="`/threads/${item.id}`" class="inline-flex block items-center px-3 py-2 text-sm font-medium text-center text-white bg-lime-600 hover:bg-lime-700 rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {{ text }}
            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </RouterLink>
    </div>
</template>