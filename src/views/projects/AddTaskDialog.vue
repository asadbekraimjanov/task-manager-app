<template>
    <el-dialog title="Add new task" v-model="dialogVisibleTask" @close="closeTask" width="500">
        <el-form :model="formData" :rules="rules" label-position="top">
            <el-row :gutter="10">
                <!--                <el-col :span="12">-->
                <!--                    <el-form-item prop="ownerId" label="Yaratuvchi">-->
                <!--                        <el-input v-model="formData.ownerId" placeholder="Yaratuvchi" disabled clearable />-->
                <!--                    </el-form-item>-->
                <!--                </el-col>-->
                <el-col :span="12">
                    <el-form-item prop="name" label="Name">
                        <el-input v-model="formData.name" placeholder="Name" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="prior" label="Difficulty">
                        <el-select v-model="formData.prior" placeholder="Select" clearable>
                            <el-option v-for="(value, label) in options" :label="label" :value="value" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="startDate" label="Start date">
                        <el-date-picker v-model="formData.startDate" value-format="DD-MM-YYYY" placeholder="Start date" disabled />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="endDate" label="End date">
                        <el-date-picker v-model="formData.endDate" value-format="DD-MM-YYYY" placeholder="End date" />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item prop="description" label="Description">
                        <el-input type="textarea" v-model="formData.description" placeholder="Description" clearable />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="w-full flex justify-end">
            <el-button class="bg-red-400 text-white font-normal" @click="closeTask">Cancel</el-button>
            <el-button class="bg-[#00345b] text-white font-normal" @click="submit">Add</el-button>
        </div>
    </el-dialog>
</template>

<script setup>
import {reactive, ref} from "vue";
import moment from "moment";
import axios from "axios";
import {ElMessage} from "element-plus";

const emit = defineEmits(["addTask"]);

const props = defineProps({
    projectId: {
        type: [Number, null],
        required: true,
    }
})

const dialogVisibleTask = ref(false)
const formData = ref({
    projectId: props.projectId,
    name: null,
    description: null,
    score: 5,
    startDate: moment().format("DD-MM-YYYY"),
    endDate: null,
    prior: null,
})
const options = ref({
    'LOW': 'LOW',
    'MEDIUM': 'MEDIUM',
    'HIGH': 'HIGH'
})

const rules = reactive({
    projectId: [{required: true, message: 'Required', trigger: 'blur'}],
    name: [{required: true, message: 'Required', trigger: 'blur'}],
    description: [{required: false}],
    score: [{required: true, message: 'Required', trigger: 'blur', type: Number}],
    prior: [{required: true, message: 'Required', trigger: 'blur', type: Number}],
    endDate: [{required: true, message: 'Required', trigger: 'blur'}],
    startDate: [{required: true, message: 'Required', trigger: 'blur'}],
})


const openTaskDialog = () => {
    dialogVisibleTask.value = true
}

const submit = async () => {
    axios.post('http://16.170.249.186:8080/api/task/create', {
        "name": formData.value.name,
        "description": formData.value.description,
        "startDate": moment().format("DD-MM-YYYY"),
        "endDate": formData.value.endDate,
        "projectId": props.projectId,
        "score": formData.value.score,
        "prior": formData.value.prior,
    }, {
        'Content-Type': 'application/json',
    }).then(res => {
        ElMessage.success('Success')
        emit('addTask')
    }).catch(err => { console.log(err); ElMessage.error('An error has been occurred!!') })
    closeTask()
}

const closeTask = () => {
    dialogVisibleTask.value = false
    formData.value = {}
}

defineExpose({
    openTaskDialog, closeTask
})

</script>

<style scoped>

</style>
