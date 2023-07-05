<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import OdaiList from '../../components/OdaiList.vue'

const route = useRoute()

const odailist = ref()

const reload = () => {
    if (route.fullPath == '/answer/popular') {
        odailist.value.fetchOdais()
    }
}
</script>
<template>
    <div class="content-menu">
        <ul class="flex">
            <li class="px-2 ml-8 mr-3 text-gray-600 rounded-t font-bold">
                <RouterLink to="/answer/recent" class="text-bold" target="_self">新着</RouterLink>
            </li>
            <li class="bg-white px-2 mr-3 text-gray-600 rounded-t font-bold">
                <RouterLink @click.preventDefault="reload" to="/answer/popular" target="_self">人気</RouterLink>
            </li>
        </ul>
    </div>
    <OdaiList ref="odailist" mode="popular"/>
    <!-- <div class="col-md-8">
        {{ $threads->links() }}
    </div>  -->
</template>
