x<template>
    <el-dialog title="Add new project" v-model="dialogVisible" @close="close" width="500">
        <el-form :model="formData" :rules="rules" label-position="top">
            <el-row :gutter="10">
<!--                <el-col :span="12">-->
<!--                    <el-form-item prop="ownerId" label="Yaratuvchi">-->
<!--                        <el-input v-model="formData.ownerId" placeholder="Yaratuvchi" disabled clearable />-->
<!--                    </el-form-item>-->
<!--                </el-col>-->
                <el-col :span="12">
                    <el-form-item prop="name" label="Namw">
                        <el-input v-model="formData.name" placeholder="Name" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="budget" label="Budget">
                        <el-input-number v-model="formData.budget" placeholder="Budget" class="w-full" clearable />
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
            <el-button class="bg-red-400 text-white font-normal" @click="close">Cancel</el-button>
            <el-button class="bg-[#00345b] text-white font-normal" @click="submit">Add</el-button>
        </div>
    </el-dialog>
</template>

<script setup>
import {reactive, ref} from "vue";
import moment from "moment";
import axios from "axios";
import store from "@/store";
import {ElMessage} from "element-plus";

const emit = defineEmits(["addProject"]);

const dialogVisible = ref(false)
const formData = ref({
    ownerId: store.state.userData.userId,
    name: null,
    description: null,
    budget: null,
    startDate: moment().format("DD-MM-YYYY"),
    endDate: null,
})

const rules = reactive({
    name: [{required: true, message: 'Required', trigger: 'blur'}],
    ownerId: [{required: true, message: 'Required', trigger: 'blur'}],
    description: [{required: false}],
    budget: [{required: true, message: 'Required', trigger: 'blur', type: Number}],
    endDate: [{required: true, message: 'Required', trigger: 'blur'}],
    startDate: [{required: true, message: 'Required', trigger: 'blur'}],
})


const openDialog = () => {
    dialogVisible.value = true
}

const submit = async () => {
    axios.post('http://16.170.249.186:8080/api/pro/create', {
        "ownerId": store.state.userData.userId,
        "name": formData.value.name,
        "description": formData.value.description,
        "budget": formData.value.budget,
        "startDate": moment().format("DD-MM-YYYY"),
        "endDate": formData.value.endDate,
    }, {
        'Content-Type': 'application/json',
    }).then(res => {
        ElMessage.success('Success')
        emit('addProject')
    }).catch(err => { console.log(err); ElMessage.error('An error has been occurred!!') })
    close()
}

const close = () => {
    dialogVisible.value = false
    formData.value = {}
}

defineExpose({
    openDialog, close
})

</script>

<style scoped>

</style>
