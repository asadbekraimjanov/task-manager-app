<template>
    <div>
        <el-rate v-model="valueRate" @change="setRate" class="w-full" :disabled="valueRate > 0" />
    </div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import store from "@/store";
import {ElMessage} from "element-plus";

const props = defineProps({
    taskId: {
        type: Number,
        required: true
    }
})

const valueRate = ref(0)

const setRate = () => {
    axios.patch(`http://16.170.249.186:8080/api/task/rate/${store.state.userData.userId}`, {
        currentTaskId: props.taskId,
        rate: valueRate.value,
    }, {
        'Content-Type': 'application/json'
    }).then(res => {
        console.log(res.data);
        ElMessage.success('Send success')
    }).catch(err => { console.log(err) });
}
</script>

<style scoped>

</style>
