<template>
    <div class="w-full h-full bg-gray-50 pt-10">
        <div class="w-full flex items-center justify-center">
            <el-avatar class="w-40 h-40">
                <img src="@/assets/empty-avatar.png" alt="">
            </el-avatar>
        </div>

        <div class="w-full flex items-center justify-center p-10">
            <div v-if="tableData" class="w-full flex justify-between gap-4">
                <el-card v-loading="loading" class="w-1/2">
                    <div class="w-full flex items-center justify-between mb-2">
                        <p>Firstname:</p>
                        <p>{{ tableData.firstname }}</p>
                    </div>
                    <div class="w-full flex items-center justify-between mb-2">
                        <p>Lastname:</p>
                        <p>{{ tableData.lastname }}</p>
                    </div>
                    <div class="w-full flex items-center justify-between mb-2">
                        <p>Email:</p>
                        <p>{{ tableData.user?.email }}</p>
                    </div>
                    <div class="w-full flex items-center justify-between mb-2">
                        <p>Profession:</p>
                        <p>{{ tableData.profession }}</p>
                    </div>
                    <div class="w-full flex items-center justify-between mb-2">
                        <p>Good at:</p>
                        <p>{{ tableData.goodAt }}</p>
                    </div>
                </el-card>

                <el-card v-loading="loading" class="w-1/2">
                    <div class="w-full flex items-center justify-between mb-2">
                        <p>Login:</p>
                        <p>{{ tableData.user?.login }}</p>
                    </div>
                    <div class="w-full flex items-center justify-between mb-2">
                        <p>Password:</p>
                        <el-popover trigger="click" placement="left">
                            <template #default>
                                <p>{{ tableData.user?.password }}</p>
                            </template>
                            <template #reference>
                                <el-icon class="text-blue-500 text-xl"><View /></el-icon>
                            </template>
                        </el-popover>
                    </div>
                    <div class="w-full flex items-center justify-between mb-2">
                        <p>Created at:</p>
                        <p>{{ moment(tableData.user?.createdAt).format('HH:mm:ss DD.MM.YYYY') }} y.</p>
                    </div>
                    <div class="w-full flex items-center justify-between mb-2">
                        <p>Role:</p>
                        <p>{{ tableData.user?.role }}</p>
                    </div>
                </el-card>
            </div>
        </div>
        <div class="w-full flex items-center justify-center gap-2">
            <el-button @click="exit">Logout</el-button>
            <el-button class="bg-[#00345b] text-white" @click="fillProfile">Fill profile</el-button>
        </div>
        <el-dialog v-model="dialogVisible" title="Fill in your details">
            <el-form v-model="formData" :rules="rules" label-position="top" >
                <el-row class="w-full" :gutter="10">
                    <el-col :span="12">
                        <el-form-item prop="firstname" label="Firstname">
                            <el-input v-model="formData.firstname" placeholder="Firstname" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="lastname" label="Lastname">
                            <el-input v-model="formData.lastname" placeholder="Lastname" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="profession" label="Profession">
                            <el-input v-model="formData.profession" placeholder="Profession" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="goodAt" label="Good at">
                            <el-input v-model="formData.goodAt" placeholder="Matches the word skills" clearable />
                        </el-form-item>
                    </el-col>
                    <div class="w-full flex items-center justify-end mt-2">
                        <el-button class="bg-red-400 text-white font-normal" @click="close">
                            Cancel
                        </el-button>
                        <el-button @click="profileFilled" class="bg-[#00345b] text-white font-normal">Add</el-button>
                    </div>
                </el-row>
            </el-form>
        </el-dialog>
    </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import store from "@/store";
import axios from "axios";
import {ElMessage, ElMessageBox} from "element-plus";
import {View} from "@element-plus/icons-vue";
import router from "@/router";
import moment from "moment";

const dialogVisible = ref(false);
const tableData = ref([]);
const loading = ref(false);
const formData = ref({
    userId: store.state.userData.userId,
    firstname: '',
    lastname: '',
    profession: '',
    goodAt: ''
})

const rules = reactive({
    firstname: [{required: true, message: 'Required', trigger: 'blur'}],
    lastname: [{required: true, message: 'Required', trigger: 'blur'}],
    profession: [{required: true, message: 'Required', trigger: 'blur'}],
    goodAt: [{required: true, message: 'Required', trigger: 'blur'}],
})

const fillProfile = () => {
    dialogVisible.value = true;
}

const profileFilled = () => {
    loading.value = true;
    axios.post('http://16.170.249.186:8080/api/emp/fill-profile', formData.value, {
        headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${store.state.accessToken}`
        }
    }).then(res => {
        ElMessage.success('Saved success')
        getTableData()
    }).catch(() => {
        ElMessage.error('An error has been occurred!!')
    }).finally(() => {
        close()
    }).finally(() => { loading.value = false; })
}

const close = () => {
    dialogVisible.value = false;
    formData.value = {}
}

const exit = () => {
    ElMessageBox.confirm(
        'Are you want to exit?',
        {
            title: 'Confirm',
            confirmButtonText: 'Ok',
            cancelButtonText: 'Cancel',
            confirmButtonClass: 'bg-[#00345b] text-white font-normal border-0',
            cancelButtonClass: 'bg-red-400 text-white font-normal'
        }
    )
        .then(() => {
            router.push('/')
            store.commit('setUserData', null)
        })
        .catch(() => {

        })

}

const getTableData = () => {
    loading.value = true;
    axios.get('http://16.170.249.186:8080/api/emp/get-profile', {
        headers: {
            Authorization: `Bearer ${store.state.accessToken}`,
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        tableData.value = res.data
        console.log(tableData.value)
    }).catch(() => {
        if (tableData.value.firstname) {
            ElMessage.error('An error has been occurred!!')
        } else {
            ElMessage.warning('Fill in your profile information')
        }
    })
        .finally(() => { loading.value = false })
}

onMounted(async () => {
    await getTableData()
})
</script>

<style scoped>

</style>
