<template>
    <div>
        <el-rate v-model="valueRate" class="w-full" :disabled="valueRate > 0" />
    </div>
</template>

<script setup>
import {ref} from "vue";


const valueRate = ref(0)
</script>

<style scoped>

</style>
