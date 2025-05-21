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
                        <p>Ismi:</p>
                        <p>{{ tableData.firstname }}</p>
                    </div>
                    <div class="w-full flex items-center justify-between mb-2">
                        <p>Familiya:</p>
                        <p>{{ tableData.lastname }}</p>
                    </div>
                    <div class="w-full flex items-center justify-between mb-2">
                        <p>Pochta:</p>
                        <p>{{ tableData.user?.email }}</p>
                    </div>
                    <div class="w-full flex items-center justify-between mb-2">
                        <p>Kasbi:</p>
                        <p>{{ tableData.profession }}</p>
                    </div>
                    <div class="w-full flex items-center justify-between mb-2">
                        <p>Qobiliyat:</p>
                        <p>{{ tableData.goodAt }}</p>
                    </div>
                </el-card>

                <el-card v-loading="loading" class="w-1/2">
                    <div class="w-full flex items-center justify-between mb-2">
                        <p>Login:</p>
                        <p>{{ tableData.user?.login }}</p>
                    </div>
                    <div class="w-full flex items-center justify-between mb-2">
                        <p>Parol:</p>
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
                        <p>Yaratilgan vaqti:</p>
                        <p>{{ moment(tableData.user?.createdAt).format('HH:mm:ss DD.MM.YYYY') }} y.</p>
                    </div>
                    <div class="w-full flex items-center justify-between mb-2">
                        <p>Roli:</p>
                        <p>{{ tableData.user?.role }}</p>
                    </div>
                </el-card>
            </div>
        </div>
        <div class="w-full flex items-center justify-center gap-2">
            <el-button @click="exit">Chiqish</el-button>
            <el-button class="bg-[#00345b] text-white" @click="fillProfile">To'ldirish</el-button>
        </div>
        <el-dialog v-model="dialogVisible" title="Ma'lumotlaringizni to'ldiring">
            <el-form v-model="formData" label-position="top" >
                <el-row class="w-full" :gutter="10">
                    <el-col :span="12">
                        <el-form-item prop="firstname" label="Ismi">
                            <el-input v-model="formData.firstname" placeholder="Ismi" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="lastname" label="Familiyasi">
                            <el-input v-model="formData.lastname" placeholder="Familiyasi" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="profession" label="Kasbi">
                            <el-input v-model="formData.profession" placeholder="Kasbi" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="goodAt" label="Qobiliyati">
                            <el-input v-model="formData.goodAt" placeholder="Qaysi yo'nalishda yaxshiroq" clearable />
                        </el-form-item>
                    </el-col>
                    <div class="w-full flex items-center justify-end mt-2">
                        <el-button class="bg-red-400 text-white font-normal" @click="close">
                            Bekor qilish
                        </el-button>
                        <el-button @click="profileFilled" class="bg-[#00345b] text-white font-normal">Qo'shish</el-button>                    </div>
                </el-row>
            </el-form>
        </el-dialog>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
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
        ElMessage.success('Ma\'lumot saqlandi')
        getTableData()
    }).catch(() => {
        ElMessage.error('Xatolik!!Administratorga xabar bering')
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
        'Akauntdan chiqmoqchimisiz',
        {
            title: 'Tasdiqlash',
            confirmButtonText: 'Tasdiqlash',
            cancelButtonText: 'Bekor qilish',
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
            ElMessage.error('Xatolik!!Administratorga xabar bering')
        } else {
            ElMessage.warning('Profil ma\'lumotlaringizni to\'ldiring')
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
