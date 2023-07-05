<script setup>
import { ref, watch } from 'vue'
import { OK } from '../util'
import { useRoute } from 'vue-router'
import { useStoreError } from '../stores/error'
import { useStoreAuth } from '../stores/auth'
import AnswerList from '../components/AnswerList.vue'

const route = useRoute()
const {setCode} = useStoreError()
const auth = useStoreAuth()

const odai = ref([])

const fetchOdai = async () => {
    auth.setApiStatus(null)
    try {
        const res = await axios.get(`/api/threads/${route.params.id}`)
        if(res.status === OK) {
            odai.value = res.data
            auth.setApiStatus(true)
        }
    } catch(error) {
        auth.setApiStatus(false)
        setCode(error.response.status)
    }
}

watch(route, () => {
    fetchOdai()
},
{ immediate: true }
)

</script>

<template>
    <div id="main-board" class="flex">
        <div id="main-container" class= "w-2/3 mr-10 row justify-content-center">
            <div >
                <!-- @include('components.thread-index-back') -->
                <div class="text-center">
                    <h3 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">「{{ odai.body }}」</h3>
                    <h6 class="pb-2 mb-0 text-sm text-gray-400 border-bottom">
                        <i class="fa-solid fa-circle-user"></i> {{ odai.name }} <i class="fa-solid fa-clock"></i>
                    </h6>
                </div>
            </div>
            <div class="content-menu">
                <ul class="flex">
                    <li class="bg-white px-2 mr-3 text-gray-600 rounded-t font-bold">
                        <p>人気</p>
                    </li>
                </ul>
            </div>
            <AnswerList :answers="odai.answers"/>
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