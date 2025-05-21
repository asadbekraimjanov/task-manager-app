<template>
    <div class="w-full flex gap-2">
        <el-input @keyup.enter="setComment" v-model="commentary" class="w-full" placeholder="Kiriting" clearable />
        <el-button @click="setComment">Jo'natish</el-button>
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
        required: true,
    }
})

const commentary = ref('')

const setComment = () => {
    // axios.post('http://16.170.249.186:8080/api/comment/add', {
    //     comment: commentary.value,
    //     senderId: store.state.userData.userId,
    //     taskId: props.taskId,
    // }, {
    //     'Content-Type': 'application/json'
    // }).then(res => {
    //     console.log(res.data);
    //     ElMessage.success('Kommentariya muvaffaqiyatli qo\'shildi')
    // }).catch(err => { console.log(err) });
    ElMessage.success('Qo\'shildi')
    commentary.value = ''
}
</script>

<style scoped>

</style>
