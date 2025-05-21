<template>
    <div v-loading="loading" class="w-full h-full p-2">
        <p class="text-xl font-normal text-blue-950 border-b-2  py-1">E'lonlar ro'yxati</p>
        <el-scrollbar class="w-full h-[calc(100vh-150px)] border-b">
            <div class="w-full h-full p-2 overflow-y-auto flex flex-wrap pt-4">
                <div v-for="item in paginatedDataTable" class="w-full h-[200px] shadow-lg mb-4 flex">
                    <img class="h-full" src="@/assets/images/1.webp" alt="">
                    <div class="w-full h-full p-4 flex flex-col justify-between">
                        <div class="w-full flex justify-between items-start">
                            <div>
                                <div class="flex items-center">
                                    <div class="text-xl font-semibold text-gray-700 mr-2">{{ item.name }}</div>
                                    <el-tag :type="typeTag[item.status]">{{ status[item.status] }}</el-tag>
                                </div>
                                <div class="text-gray-500">{{ item.description }}</div>
                            </div>
                            <div class="flex items-center">
                                <p class="text-xl font-bold text-gray-700">
                                    {{ item.budget/item.employees.length === Infinity ? item.budget : isNaN(item.budget/item.employees.length) ? item.budget : item.budget/item.employees.length }}
                                </p>
                                <span class="font-bold text-gray-700 text-lg ml-1">$</span>
                            </div>
                        </div>

                        <div class="h-full flex gap-2 py-4">
                            <div v-if="item.employees.length" v-for="el in item.employees"
                                class="h-full bg-gray-200 text-gray-700 font-normal rounded-lg flex justify-center items-center flex-wrap px-3">
                                {{ el.lastname }} {{ el.firstname }}
                            </div>
                            <div v-else
                                class="h-full bg-gray-200 text-gray-700 font-normal rounded-lg flex justify-center items-center flex-wrap px-3">
                                Hodim biriktirilmagan
                            </div>
                        </div>

                        <div class="w-full flex items-center">
                            <div class="max-h-max border-r px-4">
                                <p class="font-bold text-gray-700 text-center">{{ item.employees.length }}</p>
                                <span class="text-xs font-normal text-gray-500">Qatnashuvchilar</span>
                            </div>
                            <div class="max-h-max border-r px-4">
                                <p class="font-bold text-gray-700 text-center flex items-center justify-center">
                                    <el-statistic :value="item.budget" :value-style="{color: 'rgb(55 65 81)', fontWeight: 'bold'}"/>
                                    <span>$</span>
                                </p>
                                <span class="text-xs font-normal text-gray-500">Umumiy sarf</span>
                            </div>
                            <div class="max-h-max border-r px-4">
                                <p class="font-bold text-gray-700 text-center"
                                    :class="moment(item.endDate, 'DD-MM-YYYY').diff(moment(), 'days') < 0 ? 'text-red-500' : ''">
                                    {{ moment(item.endDate, 'DD-MM-YYYY').diff(moment(), 'days') < 0 ? 'Muddati o\'tgan' : moment(item.endDate, 'DD-MM-YYYY').diff(moment(), 'days') + ' kun' }}
                                </p>
                                <span class="text-xs font-normal text-gray-500">Tugash vaqti</span>
                            </div>
                            <div class="max-h-max w-80 flex justify-center flex-wrap border-r px-4">
                                <CommentaryInput :task-id="item.id" />
                                <span class="text-xs font-normal text-gray-500">Kommentariya</span>
                            </div>
                            <div class="max-h-max w-40 flex justify-center flex-wrap border-r px-4">
                                <RateComponent :type="'PROJECT'"/>
                                <span class="text-xs font-normal text-gray-500">Umumiy: {{ item.rate }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-scrollbar>

        <div class="w-full h-[50px] flex justify-center items-center">
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
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import moment from "moment/moment";
import CommentaryInput from "@/views/helpers/CommentaryInput.vue";
import RateComponent from "@/views/helpers/RateComponent.vue";

const currentPage = ref(1)
const pageSize = ref(10)
const defaultPageSize = ref(10)
const pageSizes = ref([10, 20, 30, 40, 50, 100])
const rawValue = ref(0)
const testRawValue = ref(0)
const loading = ref(false)
const tableData = ref([])
const start = ref(null)
const end = ref(null)
const paginatedDataTable = ref([])
const status = ref({
    IN_PROGRESS: 'Jarayonda',
    COMPLETED: 'Tugallangan',
    PENDING: 'Kutilmoqda',
    CANCELLED: 'Bekor qilingan',
    BACKLOG: 'Orqada',
})
const typeTag = {
    'IN_PROGRESS': 'primary',
    'COMPLETED': 'success',
    'PENDING': 'warning',
    'CANCELLED': 'error',
    'BACKLOG': 'info'
}

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

const getTableData = () => {
    loading.value = true
    axios.get('http://16.170.249.186:8080/api/pro/get-list', {
        headers: {'Content-Type': 'application/json'}
    }).then(res => {
        tableData.value = res.data;
        paginatedData()
        console.log(tableData.value)
        console.log(paginatedDataTable.value)
    }).catch(err => {
        console.log(err)
    }).finally(() => {
        loading.value = false
    })
}

onMounted(async () => {
    await getTableData()

})
</script>

<style scoped>
.shadow-lg {
    box-shadow: 0 0 8px 0 rgba(166, 166, 166, 0.2), 0 0 8px 0 rgba(191, 191, 191, 0.19);
}
</style>
