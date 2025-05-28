<template>
    <div class="w-full h-[350px] p-2">
        <div class="w-full flex justify-between items-center">
            <p class="text-blue-950 text-xl">Projects in Progress</p>
            <el-button class="bg-blue-900 text-white" @click="dialogOpen">Add</el-button>
        </div>
        <el-scrollbar class="w-full h-[330px]">
            <div v-if="tableDataInProgress" v-loading="loading" class="w-fit flex gap-4 p-2">
                <div
                    v-for="item in tableDataInProgress"
                    class="w-[400px] relative h-[300px] shadow-lg rounded-lg flex flex-col justify-between p-4"
                >
                    <img class="h-10 absolute mt-8" src="@/assets/images/logotip2.jpg" alt="">
                    <div class="w-full flex justify-end">
                        <el-button class="bg-[var(--el-color-primary)] text-white" @click="dialogTaskOpen(item.id)">Create Task</el-button>
                        <el-button class="text-2xl" :icon="Edit" type="text" @click="onEditStatus(item.id)"></el-button>
                    </div>
                    <div>
                        <p class="font-bold text-xl text-gray-700 pt-10">{{ item.name }}</p>
                        <p class="text-md font-normal text-gray-400 pt-3">{{ item.description }}</p>
                        <p class="text-sm font-normal text-gray-400 pt-3">Owner: {{ item.owner?.firstname }} {{ item.owner?.lastname }}</p>
                    </div>
                    <div class="w-full flex justify-between items-center">
                        <div
                            :class="moment(item.endDate, 'DD-MM-YYYY').diff(moment(), 'days') <= 1 ? ['text-red-500', 'bg-red-50'] : moment(item.endDate, 'DD-MM-YYYY').diff(moment(), 'days') < 5 ? ['text-yellow-500', 'bg-yellow-50'] : ['text-gray-500', 'bg-gray-100']"
                            class="font-semibold py-px px-1.5 rounded-md text-sm flex items-center">
                            <el-icon class="text-[16px] font-bold mr-1">
                                <Clock/>
                            </el-icon>
                            <span>
                               {{ moment(item.endDate, 'DD-MM-YYYY').diff(moment(), 'days') }} {{ moment(item.endDate, 'DD-MM-YYYY').diff(moment(), 'days') <=1 ? 'day left' : 'days left' }}
                            </span>
                        </div>
                        <div>
                            <el-popover placement="right" trigger="click" width="300">
                                <template #reference>
                                    <el-button>Assigned employees</el-button>
                                </template>
                                <template #default>
                                    <div class="w-full">
                                        <p v-for="el in item.employees"
                                           class="text-center py-2 border-t border-r border-l">
                                            {{ el.lastname }} {{ el.firstname }}
                                        </p>
                                        <div class="w-full border flex justify-center">
                                            <el-button @click="bindEmployee(item)" :icon="Plus" type="text" class="text-xl"/>
                                        </div>
                                    </div>
                                </template>
                            </el-popover>
                        </div>
                    </div>
                </div>
            </div>
        </el-scrollbar>

        <el-table v-if="paginatedDataTable" v-loading="loading" :data="paginatedDataTable" class="w-full h-[calc(100vh-480px)] mt-2"
                  border stripe>
            <el-table-column label="№" width="50" align="center" header-align="center" fixed>
                <template #default="scope">
                    {{ scope.$index + 1 }}
                </template>
            </el-table-column>
            <el-table-column label="Name" prop="name" sortable width="150" fixed />
            <el-table-column label="Owner" width="180" sortable>
                <template #default="scope">
                    {{ scope.row?.owner?.firstname }} {{ scope.row?.owner?.lastname }}
                </template>
            </el-table-column>
            <el-table-column label="Budget" prop="budget" sortable width="100" align="center" />
            <el-table-column label="Start date" prop="startDate" sortable align="center" width="100" />
            <el-table-column label="End date" prop="endDate" sortable align="center" width="100" />
            <el-table-column label="Description" prop="description" width="120" />
            <el-table-column label="Assigned employees" width="180">
                <template #default="scope">
                    <p v-for="item in scope.row.employees">
                        {{ item.lastname }} {{ item.firstname }}{{item !== scope.row.employees[scope.row.employees.length-1] ? ',' : ''}}
                    </p>
                </template>
            </el-table-column>
            <el-table-column label="Rate" sortable width="130">
                <template #default="scope">
                    <el-rate v-model="scope.row.rate" size="small" disabled />
                </template>
            </el-table-column>
            <el-table-column label="Status" prop="status" align="center" header-align="center" sortable width="135">
                <template #default="scope">
                    <el-tag :type="typeTag[scope.row.status]" v-if="scope.row.status">{{ statusRow[scope.row.status] }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Actions" align="center" header-align="center" fixed="right">
                <template #default="scope">
                    <div>
                        <el-button @click="onEditStatus(scope.row.id)" :icon="Edit" type="text" class="text-xl"/>
                        <el-button @click="onDelete" :icon="Delete" type="text" class="text-xl text-red-400"/>
                    </div>
                </template>
            </el-table-column>
        </el-table>
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
        <AddProjectDialog @add-project="getTableData" ref="projectDialog" />
        <AddTaskDialog :project-id="projectId" ref="projectTaskDialog" />
        <el-dialog width="400" v-model="editProjectStatus" title="Edit status">
            <el-select v-model="selectedStatus" placeholder="Select" clearable>
                <el-option v-for="item in status" :label="item.label" :value="item.value"/>
            </el-select>

            <div>
                <div class="w-full flex justify-end pt-4">
                    <el-button class="bg-red-400 text-white font-normal" @click="closeEditStatus">
                        Cancel
                    </el-button>
                    <el-button @click="statusUpdated" class="bg-[#00345b] text-white font-normal">Ok</el-button>
                </div>
            </div>
        </el-dialog>
        <el-dialog width="400" v-model="bindEmployeeDialog" title="Add Employee">
            <el-select v-model="selectedEmployee" placeholder="Select" clearable multiple filterable>
                <el-option v-for="item in employeeData" :label="`${item.lastname} ${item.firstname} - ${item.profession}`" :value="item.id"/>
            </el-select>

            <div>
                <div class="w-full flex justify-end pt-4">
                    <el-button class="bg-red-400 text-white font-normal" @click="closeBindEmployeeDialog">
                        Cancel
                    </el-button>
                    <el-button @click="bindedEmployee" class="bg-[#00345b] text-white font-normal">Add</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import {Clock, Delete, Edit, Plus} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import AddProjectDialog from "@/views/projects/AddProjectDialog.vue";
import {ElMessage, ElNotification} from "element-plus";
import moment from "moment";
import store from "@/store";
import AddTaskDialog from "@/views/projects/AddTaskDialog.vue";

const currentPage = ref(1)
const pageSize = ref(10)
const defaultPageSize = ref(10)
const pageSizes = ref([10, 20, 30, 40, 50, 100])
const tableData = ref([])
const paginatedDataTable = ref([])
const start = ref(null)
const end = ref(null)
const employeeData = ref([])
const tableDataInProgress = ref([])
const loading = ref(false)
const projectDialog = ref(null)
const bindEmployeeDialog = ref(false)
const editProjectStatus = ref(false)
const selectedStatus = ref('PENDING')
const selectedEmployee = ref(null)
const selectedStatusId = ref(null)
const statusRow = ref({
    'IN_PROGRESS': 'IN_PROGRESS',
    'COMPLETED': 'COMPLETED',
    'PENDING': 'PENDING',
    'CANCELLED': 'CANCELLED',
    'BACKLOG': 'BACKLOG'
});
const typeTag = {
    'IN_PROGRESS': 'primary',
    'COMPLETED': 'success',
    'PENDING': 'warning',
    'CANCELLED': 'error',
    'BACKLOG': 'info'
}
const status = ref([
    {
        label: 'IN_PROGRESS',
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
const ownerData = ref(null)
const projectId = ref(null)
const projectTaskDialog = ref(false)


const paginatedData = () => {
    paginatedDataTable.value = tableData.value
    start.value = (currentPage.value - 1) * pageSize.value
    end.value = start.value + pageSize.value
    paginatedDataTable.value =  tableData.value.slice(start.value, end.value)
}

const onEditStatus = (id) => {
    editProjectStatus.value = true
    selectedStatusId.value = id
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

const bindEmployee = async (data) => {
    ownerData.value = data
    await axios.get('http://16.170.249.186:8080/api/emp/get-all', {
        headers: {'Content-Type': 'application/json'}
    }).then(res => {
        employeeData.value = res.data;
    }).catch(() => { ElMessage.error('An error has been occurred!!') }).finally(() => {
        loading.value = false
    })

    bindEmployeeDialog.value = true

}

const bindedEmployee = () => {
    axios.post('http://16.170.249.186:8080/api/pro/add-emp', {
        projectId: ownerData.value.id,
        ownerId: ownerData.value.owner.id,
        employeesId: selectedEmployee.value
    }).then(() => ElMessage.success('Success'))
        .catch(() => ElMessage.error('An error has been occurred!!'))
        .finally(() => {
            closeBindEmployeeDialog()
            getTableData()
        })
}

const statusUpdated = () => {
    // axios.patch('http://16.170.249.186:8080/api/pro/update-status', {
    //     projectId: selectedStatusId.value,
    //     status: selectedStatus.value
    // }, {
    //     'Content-Type': 'application/json'
    // }).then(() => {
    //     getTableData()
    // })
    //     .catch(err => { console.log(err); ElMessage.error('Xatolik!!Administratorga xabar bering') })

    tableData.value.forEach((item, index) => {
        if (item.id === selectedStatusId.value) {
            tableData.value[index].status = selectedStatus.value
            ElMessage.success('Status updated')
        }
    })
    // tableDataInProgress.value.filter((item, index) => {
    //     if (item.status !== 'IN_PROGRESS') {
    //         tableDataInProgress.value.splice(index, 1)
    //     }
    // })

    closeEditStatus()
}


const dialogOpen = () => {
    projectDialog['value'].openDialog()
}
const dialogTaskOpen = (id) => {
    projectId.value = id
    projectTaskDialog['value'].openTaskDialog()
}

const closeBindEmployeeDialog = () => {
    bindEmployeeDialog.value = false
    selectedEmployee.value = []
}

const closeEditStatus = () => {
    selectedStatus.value = null
    editProjectStatus.value = false
}

const onEdit = () => {
    ElNotification({
        type: 'warning',
        title: 'In process',
        message: 'Change function will be added soon'
    })
}
const onDelete = () => {
    ElNotification({
        type: 'warning',
        title: 'In process',
        message: 'Delete function will be added soon'
    })
}

const getTableData = async () => {
    loading.value = true
    await axios.get('http://16.170.249.186:8080/api/pro/get-list', {
        headers: {'Content-Type': 'application/json'}
    }).then(res => {
        tableData.value = res.data;
        tableDataInProgress.value = tableData.value
            .filter(item => moment(item.endDate, 'DD-MM-YYYY').diff(moment(), 'days') >= 0)
            .sort((a, b) => {
            const aDiff = moment(a.endDate, 'DD-MM-YYYY').diff(moment(), 'days');
            const bDiff = moment(b.endDate, 'DD-MM-YYYY').diff(moment(), 'days');
            return aDiff - bDiff;
        });
        paginatedData()
    }).catch(err => {
        console.log(err)
    }).finally(() => {
        loading.value = false
    })
}


onMounted( async () => {
    await getTableData()
})
</script>

<style scoped>
.shadow-lg {
    box-shadow: 0 0 8px 0 rgba(166, 166, 166, 0.2), 0 0 8px 0 rgba(191, 191, 191, 0.19);
}

:deep(.el-dialog .el-dialog__header) {
    padding: 10px 15px;
    background-color: #00345b;
    font-weight: 500;
}

:deep(.el-dialog .el-dialog__header span) {
    color: #ffffff;
}

:deep(.el-dialog__body) {
    padding: 15px;
}

:deep(.el-dialog) {
    padding: 0;
}
</style>
