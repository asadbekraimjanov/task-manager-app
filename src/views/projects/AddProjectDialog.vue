<template>
    <el-dialog title="Yangi proyekt yaratish" v-model="dialogVisible" @close="close" width="500">
        <el-form :model="formData" :rules="rules" label-position="top">
            <el-row :gutter="10">
<!--                <el-col :span="12">-->
<!--                    <el-form-item prop="ownerId" label="Yaratuvchi">-->
<!--                        <el-input v-model="formData.ownerId" placeholder="Yaratuvchi" disabled clearable />-->
<!--                    </el-form-item>-->
<!--                </el-col>-->
                <el-col :span="12">
                    <el-form-item prop="name" label="Nomi">
                        <el-input v-model="formData.name" placeholder="Nomi" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="budget" label="Ajratilgan mablag'">
                        <el-input-number v-model="formData.budget" placeholder="Ajratilgan mablag'" class="w-full" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="startDate" label="Yaratilish sanasi">
                        <el-date-picker v-model="formData.startDate" value-format="DD-MM-YYYY" placeholder="Yaratilish sanasi" disabled />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="endDate" label="Tugash sanasi">
                        <el-date-picker v-model="formData.endDate" format="DD-MM-YYYY" value-format="DD-MM-YYYY" placeholder="Tugash sanasi" />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item prop="description" label="Tavsif">
                        <el-input type="textarea" v-model="formData.description" placeholder="Tavsif" clearable />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="w-full flex justify-end">
            <el-button class="bg-red-400 text-white font-normal" @click="close">Bekor qilish</el-button>
            <el-button class="bg-[#00345b] text-white font-normal" @click="submit">Qo'shish</el-button>
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
    name: [{required: true, message: 'Majburiy maydon', trigger: 'blur'}],
    ownerId: [{required: true, message: 'Majburiy maydon', trigger: 'blur'}],
    description: [{required: false}],
    budget: [{required: true, message: 'Majburiy maydon', trigger: 'blur', type: Number}],
    endDate: [{required: true, message: 'Majburiy maydon', trigger: 'blur'}],
    startDate: [{required: true, message: 'Majburiy maydon', trigger: 'blur'}],
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
        ElMessage.success('Amal bajarildi')
        emit('addProject')
    }).catch(err => { console.log(err); ElMessage.error('Xatolik!!Administratorga xabar bering') })
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
