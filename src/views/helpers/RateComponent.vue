<template>
    <div>
        <el-rate v-model="valueRate" class="w-full"/>
    </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
    type: {
        type: String,
        required: true,
    }
})

const valueRate = ref(0)
</script>

<style scoped>

</style>
