<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import OdaiList from '../../components/OdaiList.vue'
import { useStoreReload } from '../../stores/reload'

const route = useRoute()
const reload = useStoreReload()

const odailist = ref()

const callReload = () => {
    if(route.fullPath == "/answer/recent") {
        reload.setStatus(!reload.status) 
    }
}
</script>
<template>
    <div class="content-menu">
        <ul class="flex">
            <li class="bg-white px-2 ml-8 mr-3 text-gray-600 rounded-t font-bold">
                <RouterLink @click.preventDefault="callReload" to="/answer/recent" class="text-bold" target="_self">新着</RouterLink>
            </li>
            <li class="px-2 mr-3 text-gray-600 rounded-t font-bold">
                <RouterLink to="/answer/popular" target="_self">人気</RouterLink>
            </li>
        </ul>
    </div>
    <OdaiList ref="odailist" mode="recent"/>
    <!-- <div class="col-md-8">
        {{ $threads->links() }}
    </div>  -->
</template>
