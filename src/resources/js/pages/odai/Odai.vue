<script setup>
import RightContent from '../../components/RightContent.vue'
</script>

<template>
    <div id="main-board" class="flex">
        <div id="main-container" class= "w-2/3 mr-10 row justify-content-center">
            <RouterView/>
        </div>
        <RightContent/>
    </div>
</template>