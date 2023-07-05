<script setup>
import { reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStoreAuth } from '../stores/auth'
import { useStoreError } from '../stores/error'
import { OK } from '../util'

const route = useRoute()
const auth = useStoreAuth()
const { setCode } = useStoreError()

const { id, authorized, endpoint } = defineProps({
	id: {
		type: Number,
	},
	authorized: {
		type: Boolean,
		default: false,
	},
	endpoint: {
		type: String
	},
})

const state = reactive({
	countLikes: 0,
	isLiked: false,
})

const getIsLiked = async (id) => {
    auth.setApiStatus(null)
    try {
        const res = await axios.get(`/api/isLiked/${id}`)
        if(res.status === OK) {
			state.isLiked = res.data
            auth.setApiStatus(true)
        }
    } catch(error) {
        auth.setApiStatus(false)
        setCode(error.response.status)
    }
}

const getCountLikes = async (id) => {
    auth.setApiStatus(null)
    try {
        const res = await axios.get(`/api/countLikes/${id}`)
        if(res.status === OK) {
			state.countLikes = res.data
            auth.setApiStatus(true)
        }
    } catch(error) {
        auth.setApiStatus(false)
        setCode(error.response.status)
    }
}

const like = async() => {
	auth.setApiStatus(null)
    try {
        const res = await axios.put(endpoint)
        if(res.status === OK) {
			state.isLiked = true
			state.countLikes = res.data.countLikes
            auth.setApiStatus(true)
        }
    } catch(error) {
        auth.setApiStatus(false)
        setCode(error.response.status)
    }
}

const unlike = async() => {
	auth.setApiStatus(null)
    try {
        const res = await axios.delete(endpoint)
        if(res.status === OK) {
			state.isLiked = false
			state.countLikes = res.data.countLikes
            auth.setApiStatus(true)
        }
    } catch(error) {
        auth.setApiStatus(false)
        setCode(error.response.status)
    }
}

const handleClick = () => {
	if (!authorized) {
		alert('いいね機能はログイン中のみ使用できます')
		return
	}

	state.isLiked
		? unlike()
		: like()
}

watch(route, () => {
    getIsLiked(id)
	getCountLikes(id)
},
{ immediate: true }
)
</script>

<template>
	<button type="button" class="" >
		<i class="fa-solid fa-heart" :class="[state.isLiked ? 'heart-on' : 'heart-off']" @click="handleClick"></i>
	</button>
	{{ state.countLikes }}
</template>

