<script setup>
import { defineProps, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStoreUrl } from '../stores/url'
import { useStoreReload } from '../stores/reload'

const route = useRoute()
const url = useStoreUrl()
const reload = useStoreReload()

const { name, linkName } = defineProps({
  name: {
    type: String,
    default: "アンサー",
  },
  linkName: {
    type: String,
    default: "/answer/recent",
  },
})

const isActiveClass = computed(() => {
  const linkNameInitial = linkName.split('/')[1]
  const pathInitial = url.pathInitial

  if(linkNameInitial === pathInitial) {
    return "block border-b-4 border-lime-700 cursor-pointer mt-1 px-6 py-3 rounded text-black transition-colors text-sm md:mr-6 md:rounded-none"
  } else {
    return "block border-b-4 border-white cursor-pointer mt-1.5 px-6 pt-3 pb-2.5 rounded text-gray-500 hover:text-black text-sm md:mr-6 md:rounded-none"
  }
})

const callReload = () => {
    if(route.fullPath == linkName) {
        reload.setStatus(!reload.status) 
    }
}
</script>

<template>
  <li><RouterLink @click="callReload" :to="linkName" target="_self" :class="isActiveClass"> {{ name }}</RouterLink></li>
</template>