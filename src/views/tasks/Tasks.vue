<template>
    <div class="w-full flex items-center bg-gray-50 justify-between px-3.5">
        <p class="text-xl text-blue-950 p-2.5">Tasks</p>
    </div>
    <div v-loading="loading" class="w-full h-[calc(100vh-145px)] grid grid-cols-4 bg-gray-50 gap-6 border py-2 px-6">
        <div class="w-full h-full">
            <div class="w-full text-lg font-medium text-gray-500 mb-2">
                PENDING<br>
                <span class="text-sm font-medium"> Total: {{ tableDataPending.length }}</span>
            </div>
            <div class="w-full h-[calc(100vh-240px)] flex flex-wrap">
                <el-scrollbar class="w-full h-full" height="100%">
                    <div v-for="item in tableDataPending" class="w-full bg-white shadow-lg hover:shadow-2xl transition-all p-3 rounded mb-4">
                        <div class="w-full flex justify-between">
                            <p class="text-lg font-medium text-gray-900">Project: {{item.project.name}}</p>
                            <div class="flex items-center justify-end">
                                <el-tag :type="typeTag[item.prior]">{{ valueTag[item.prior] }}</el-tag>
                                <el-button @click="onEditStatus(item.id)" type="text" class="text-xl ml-1"><el-icon><Edit /></el-icon></el-button>
                            </div>
                        </div>
                        <p class="text-lg text-gray-800 pb-1">Task: {{item.name}}</p>

                        <p class="text-sm text-green-600 pb-1">{{ item.description }}</p>
                        <div class="w-full flex justify-between items-center">
                            <TaskCommentaryInput :task-id="item.id" />
                        </div>
                        <div class="w-full flex items-center">
                            <TaskRateComponent :task-id="item.id" class="py-1" />
                        </div>
                    </div>
                </el-scrollbar>
            </div>
        </div>

        <div class="w-full h-full">
            <div class="w-full text-lg font-medium text-gray-500 mb-2">
                IN PROGRESS<br>
                <span class="text-sm font-medium"> Total: {{ tableDataInProgress.length }}</span>
            </div>
            <div class="w-full h-[calc(100vh-240px)] flex flex-wrap">
                <el-scrollbar class="w-full h-full" height="100%">
                    <div v-for="item in tableDataInProgress" class="w-full bg-white shadow-lg hover:shadow-2xl transition-all p-3 rounded mb-4">
                        <div class="w-full flex justify-between">
                            <p class="text-lg font-medium text-gray-900">Project: {{item.project.name}}</p>
                            <div class="flex items-center justify-end">
                                <el-tag :type="typeTag[item.prior]">{{ valueTag[item.prior] }}</el-tag>
                                <el-button @click="onEditStatus(item.id)" type="text" class="text-xl ml-1"><el-icon><Edit /></el-icon></el-button>
                            </div>
                        </div>
                        <p class="text-lg text-gray-800 pb-1">Task: {{item.name}}</p>

                        <p class="text-sm text-green-600 pb-1">{{ item.description }}</p>
                        <div class="w-full flex justify-between items-center">
                            <TaskCommentaryInput :task-id="item.id" />
                        </div>
                        <div class="w-full flex items-center">
                            <TaskRateComponent :task-id="item.id" class="py-1" />
                        </div>
                    </div>
                </el-scrollbar>
            </div>
        </div>

        <div class="w-full h-full">
            <div class="w-full text-lg font-medium text-gray-500 mb-2">
                COMPLETED<br>
                <span class="text-sm font-medium"> Total: {{ tableDataCompleted.length }}</span>
            </div>
            <div class="w-full h-[calc(100vh-240px)] flex flex-wrap">
                <el-scrollbar class="w-full h-full" height="100%">
                    <div v-for="item in tableDataCompleted" class="w-full bg-white shadow-lg hover:shadow-2xl transition-all p-3 rounded mb-4">
                        <div class="w-full flex justify-between">
                            <p class="text-lg font-medium text-gray-900">Project: {{item.project.name}}</p>
                            <div class="flex items-center justify-end">
                                <el-tag :type="typeTag[item.prior]">{{ valueTag[item.prior] }}</el-tag>
                                <el-button @click="onEditStatus(item.id)" type="text" class="text-xl ml-1"><el-icon><Edit /></el-icon></el-button>
                            </div>
                        </div>
                        <p class="text-lg text-gray-800 pb-1">Task: {{item.name}}</p>

                        <p class="text-sm text-green-600 pb-1">{{ item.description }}</p>
                        <div class="w-full flex justify-between items-center">
                            <TaskCommentaryInput :task-id="item.id" />
                        </div>
                        <div class="w-full flex items-center">
                            <TaskRateComponent :task-id="item.id" class="py-1" />
                        </div>
                    </div>
                </el-scrollbar>
            </div>
        </div>

        <div class="w-full h-full scroll-m-0.5">
            <div class="w-full text-lg font-medium text-gray-500 mb-2">
                CANCELED<br>
                <span class="text-sm font-medium"> Total: {{ tableDataCanceled.length }}</span>
            </div>
            <div class="w-full h-[calc(100vh-240px)] flex flex-wrap">
                <el-scrollbar class="w-full h-full" height="100%">
                    <div v-for="item in tableDataCanceled" class="w-full bg-white shadow-lg hover:shadow-2xl transition-all p-3 rounded mb-4">
                        <div class="w-full flex justify-between">
                            <p class="text-lg font-medium text-gray-900">Project: {{item.project.name}}</p>
                            <div class="flex items-center justify-end">
                                <el-tag :type="typeTag[item.prior]">{{ valueTag[item.prior] }}</el-tag>
                                <el-button @click="onEditStatus(item.id)" type="text" class="text-xl ml-1"><el-icon><Edit /></el-icon></el-button>
                            </div>
                        </div>
                        <p class="text-lg text-gray-800 pb-1">Task: {{item.name}}</p>

                        <p class="text-sm text-green-600 pb-1">{{ item.description }}</p>
                        <div class="w-full flex justify-between items-center">
                            <TaskCommentaryInput :task-id="item.id" />
                        </div>
                        <div class="w-full flex items-center">
                            <TaskRateComponent :task-id="item.id" class="py-1" />
                        </div>
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
        <el-dialog width="400" v-model="editProjectStatus" title="Update status">
            <el-select v-model="selectedStatus" placeholder="Select" clearable>
                <el-option v-for="item in status" :label="item.label" :value="item.value"/>
            </el-select>

            <div>
                <div class="w-full flex justify-end pt-4">
                    <el-button class="bg-red-400 text-white font-normal" @click="close">
                        Cancel
                    </el-button>
                    <el-button @click="statusUpdated" class="bg-[#00345b] text-white font-normal">Add</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {Edit, Plus} from "@element-plus/icons-vue";
import axios from "axios";
import {ElMessage} from "element-plus";
import TaskCommentaryInput from "@/views/helpers/TaskCommentaryInput.vue";
import TaskRateComponent from "@/views/helpers/TaskRateComponent.vue";
import store from "@/store";

const currentPage = ref(1)
const pageSize = ref(10)
const defaultPageSize = ref(10)
const pageSizes = ref([10, 20, 30, 40, 50, 100])
const loading = ref(false)
const tableData = ref([])
const tableDataPending = ref([])
const tableDataInProgress = ref([])
const tableDataCompleted = ref([])
const tableDataCanceled = ref([])
const start = ref(null)
const end = ref(null)
const editProjectStatus = ref(false)
const selectedStatus = ref('IN_PROGRESS')
const status = ref([
    {
        label: 'IN PROGRESS',
        value: 'IN_PROGRESS'
    },
    {
        label: 'COMPLETED',
        value: 'COMPLETED'
    },
    {
        label: 'PENDING',
        value: 'PENDING'
    },
    {
        label: 'CANCELLED',
        value: 'CANCELLED'
    },
    {
        label: 'BACKLOG',
        value: 'BACKLOG'
    },
])
const taskId = ref(null)
const paginatedDataTable = ref([])
const typeTag = ref({
    'LOW': 'success',
    'MEDIUM': 'warning',
    'HIGH': 'danger',
})
const valueTag = ref({
    'LOW': 'LOW',
    'MEDIUM': 'MEDIUM',
    'HIGH': 'HARD',
})

const onEditStatus = (id) => {
    editProjectStatus.value = true
    taskId.value = id
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

const statusUpdated = () => {
    // axios.patch('http://16.170.249.186:8080/api/task/update-status', {
    //     taskId: taskId.value,
    //     status: selectedStatus.value
    // }, {
    //     'Content-Type': 'application/json'
    // }).then(() => {
    //     getTableData()
    // })
    //     .catch(err => { console.log(err); ElMessage.error('Xatolik!!Administratorga xabar bering') })

    tableData.value.forEach((item, index) => {
        if (item.id === taskId.value) {
            tableData.value[index].status = selectedStatus.value
            tableDataPending.value = tableData.value.filter(item => { return item.status === 'PENDING' })
            tableDataInProgress.value = tableData.value.filter(item => { return item.status === 'IN_PROGRESS' })
            tableDataCompleted.value = tableData.value.filter(item => { return item.status === 'COMPLETED' })
            tableDataCanceled.value = tableData.value.filter(item => { return (item.status === 'CANCELLED' || item.status === 'CANCELED' ) })
            ElMessage.success('Status updated')
            close()
        }
    })
}

const close = () => {
    selectedStatus.value = null
    editProjectStatus.value = false
}

const getTableData = () => {
    loading.value = true
    axios.post('http://16.170.249.186:8080/api/task/all', {
        'Content-Type': 'application/json',
    }).then(res => {
        console.log(res.data)
        tableData.value = res.data.filter(item => {
            return item.project.employees.some(emp => emp.id === store.state.userData.userId);
        });

        tableDataPending.value = tableData.value.filter(item => { return item.status === 'PENDING' })
        tableDataInProgress.value = tableData.value.filter(item => { return item.status === 'IN_PROGRESS' })
        tableDataCompleted.value = tableData.value.filter(item => { return item.status === 'COMPLETED' })
        tableDataCanceled.value = tableData.value.filter(item => { return (item.status === 'CANCELLED' || item.status === 'CANCELED' ) })
    }).catch(err => { ElMessage.error('An error has been occurred!!') })
        .finally(() => { loading.value = false })
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
