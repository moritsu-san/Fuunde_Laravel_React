<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import OdaiList from '../../components/OdaiList.vue'

const route = useRoute()

const mode = ref('recent')

watch(route, () => {
    mode.value  = route.params.mode
})
</script>

<template>
    <div id="main-board" class="flex">
        <div id="main-container" class= "w-2/3 mr-10 row justify-content-center">
            <div class="content-menu">
                <ul class="flex">
                    <li :class="(mode === 'recent') ? 'bg-white' : ''" class="px-2 mr-3 text-gray-600 rounded-t font-bold">
                        <RouterLink to="/answer/recent" class="text-bold" target="_self">新着</RouterLink>
                    </li>
                    <li :class="(mode === 'popular') ? 'bg-white' : ''" class="px-2 mr-3 text-gray-600 rounded-t font-bold">
                        <RouterLink to="/answer/popular" target="_self">人気</RouterLink>
                    </li>
                </ul>
            </div>
            <OdaiList :mode="mode"/>
            <!-- <div class="col-md-8">
                {{ $threads->links() }}
            </div>  -->
        </div>
        <div id="right-container" class="w-1/3">
            <div class="side-widget">
                <div class="side-widget-title">

                </div>
                <div class="side-widget-content">
                    最近のコメント
                </div>
            </div>
        </div>
    </div>
</template>