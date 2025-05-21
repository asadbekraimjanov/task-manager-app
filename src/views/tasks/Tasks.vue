<template>
    <div class="w-full flex items-center bg-gray-50 justify-between px-3.5">
        <p class="text-xl text-blue-950 p-2.5">Topshiriqlar</p>
        <el-button class="bg-blue-800 text-white">Qo'shish</el-button>
    </div>
    <div class="w-full h-[calc(100vh-145px)] grid grid-cols-4 bg-gray-50 gap-6 border py-2 px-6">
        <div class="w-full h-full">
            <div class="w-full text-lg font-medium text-gray-500 mb-2">
                IN PROGRESS / Jarayonda <br>
                <span class="text-sm font-medium"> Jami: 1ta</span>
            </div>
            <div class="w-full h-[calc(100vh-240px)] flex flex-wrap">
                <el-scrollbar class="w-full h-full" height="100%">
                    <div v-for="item in 3" class="w-full bg-white shadow-lg hover:shadow-2xl transition-all p-3 rounded mb-4">
                        <div class="w-full flex justify-between">
                            <p class="text-lg font-medium text-gray-900">Proyekt {{item}}</p>
                            <el-button type="text" class="text-xl"><el-icon><Edit /></el-icon></el-button>
                        </div>
                        <p class="text-lg text-gray-800 pb-1">Topshiriq {{item}}</p>
                        <p class="text-sm text-green-600 pb-1">Bu yerda description bor</p>
                        <div class="w-full flex justify-between items-center">
                            <p class="text-sm text-gray-500">Yaratuvchi: Raimjonov Asadbek</p>
                            <el-tag type="success">Oson</el-tag>
                        </div>
                        <el-rate :v-model="3" :score-template="`o'rtacha ${3}`"></el-rate>
                    </div>
                </el-scrollbar>
            </div>
        </div>
        <div class="w-full h-full">
            <div class="w-full text-lg font-medium text-gray-500 mb-2">
                COMPLETED / Bajarilgan <br>
                <span class="text-sm font-medium"> Jami: 1ta</span>
            </div>
            <div class="w-full h-[calc(100vh-240px)] flex flex-wrap">
                <el-scrollbar class="w-full h-full" height="100%">
                    <div v-for="item in 2" class="w-full bg-white shadow-lg hover:shadow-2xl transition-all p-3 rounded mb-4">
                        <div class="w-full flex justify-between">
                            <p class="text-lg font-medium text-gray-900">Proyekt {{item}}</p>
                            <el-button type="text" class="text-xl"><el-icon><Edit /></el-icon></el-button>
                        </div>
                        <p class="text-lg text-gray-800 pb-1">Topshiriq {{item}}</p>
                        <p class="text-sm text-green-600 pb-1">Bu yerda description bor</p>
                        <div class="w-full flex justify-between items-center">
                            <p class="text-sm text-gray-500">Yaratuvchi: Raimjonov Asadbek</p>
                            <el-tag type="primary">O'rta</el-tag>
                        </div>
                        <el-rate :v-model="3" :score-template="`o'rtacha ${3}`"></el-rate>
                    </div>
                </el-scrollbar>
            </div>
        </div>
        <div class="w-full h-full">
            <div class="w-full text-lg font-medium text-gray-500 mb-2">
                PENDING / Kutilmoqda <br>
                <span class="text-sm font-medium"> Jami: 1ta</span>
            </div>
            <div class="w-full h-[calc(100vh-240px)] flex flex-wrap">
                <el-scrollbar class="w-full h-full" height="100%">
                    <div v-for="item in 5" class="w-full bg-white shadow-lg hover:shadow-2xl transition-all p-3 rounded mb-4">
                        <div class="w-full flex justify-between">
                            <p class="text-lg font-medium text-gray-900">Proyekt {{item}}</p>
                            <el-button type="text" class="text-xl"><el-icon><Edit /></el-icon></el-button>
                        </div>
                        <p class="text-lg text-gray-800 pb-1">Topshiriq {{item}}</p>

                        <p class="text-sm text-green-600 pb-1">Bu yerda description bor</p>
                        <div class="w-full flex justify-between items-center">
                            <p class="text-sm text-gray-500">Yaratuvchi: Raimjonov Asadbek</p>
                            <el-tag type="warning">Qiyin</el-tag>
                        </div>
                        <el-rate :v-model="3" :score-template="`o'rtacha ${3}`"></el-rate>
                    </div>
                </el-scrollbar>
            </div>
        </div>
        <div class="w-full h-full scroll-m-0.5">
            <div class="w-full text-lg font-medium text-gray-500 mb-2">
                CANCELED / Bekor qilingan <br>
                <span class="text-sm font-medium"> Jami: 1ta</span>
            </div>
            <div class="w-full h-[calc(100vh-240px)] flex flex-wrap">
                <el-scrollbar class="w-full h-full" height="100%">
                    <div v-for="item in 1" class="w-full bg-white shadow-lg hover:shadow-2xl transition-all p-3 rounded mb-4">
                        <div class="w-full flex justify-between">
                            <p class="text-lg font-medium text-gray-900">Proyekt {{item}}</p>
                            <el-button type="text" class="text-xl"><el-icon><Edit /></el-icon></el-button>
                        </div>
                        <p class="text-lg text-gray-800 pb-1">Topshiriq {{item}}</p>
                        <p class="text-sm text-green-600 pb-1">Bu yerda description bor</p>
                        <div class="w-full flex justify-between items-center">
                            <p class="text-sm text-gray-500">Yaratuvchi: Raimjonov Asadbek</p>
                            <el-tag type="danger">Qiyin</el-tag>
                        </div>
                        <el-rate :v-model="3" :score-template="`o'rtacha ${3}`"></el-rate>
                    </div>
                </el-scrollbar>
            </div>
        </div>
    </div>

    <div class="w-full h-[50px] flex justify-center items-center bg-gray-50">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :page-size="pageSize" :current-page="currentPage"
                       :default-page-size="defaultPageSize"
                       :page-sizes="pageSizes"
                       :total="tableData.length"
                       layout="total, sizes, prev, pager, next, jumper"
                       background size="small"
        />
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {Edit, Plus} from "@element-plus/icons-vue";
import axios from "axios";
import {ElMessage} from "element-plus";

const currentPage = ref(1)
const pageSize = ref(10)
const defaultPageSize = ref(10)
const pageSizes = ref([10, 20, 30, 40, 50, 100])
const tableData = ref([
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
])
const start = ref(null)
const end = ref(null)
const paginatedDataTable = ref([])

const paginatedData = () => {
    paginatedDataTable.value = tableData.value
    start.value = (currentPage.value - 1) * pageSize.value
    end.value = start.value + pageSize.value
    paginatedDataTable.value =  tableData.value.slice(start.value, end.value)
}

const handleSizeChange = (size) => {
    pageSize.value = size;
    currentPage.value = 1;
    paginatedData()
}

const handleCurrentChange = (page) => {
    currentPage.value = page
    paginatedData()
}

onMounted(() => {
    axios.post('http://16.170.249.186:8080/api/task/all', {
        'Content-Type': 'application/json',
    }).then(res => {
        console.log(res.data)
    }).catch(err => { ElMessage.error('Xatolik!!Administratorga xabar bering') })
})
</script>

<style scoped>
.shadow-lg {
    box-shadow: 0 0 8px 0 rgba(166, 166, 166, 0.2), 0 0 8px 0 rgba(191, 191, 191, 0.19);
}
</style>
