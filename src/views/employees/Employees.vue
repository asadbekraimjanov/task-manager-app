<template>
    <div v-if="tableData" class="w-full h-full p-2">
        <div class="w-full flex items-center justify-between">
            <p class="text-xl font-normal text-blue-950 pb-1">Xodimlar boshqaruvi</p>
        </div>
        <el-table :data="paginatedDataTable" v-loading="loading" class="w-full h-[calc(100vh-140px)]" border stripe>
            <el-table-column label="№" width="50" align="center" header-align="center">
                <template #default="scope">
                    {{ scope.$index + 1 }}
                </template>
            </el-table-column>

            <el-table-column
                prop="firstname"
                label="Ismi"
                sortable
                :filters="getUniqueFilters('firstname')"
                :filter-method="filterHandler"
                filter-placement="bottom-end"
            />

            <el-table-column
                prop="lastname"
                label="Familiyasi"
                sortable
                :filters="getUniqueFilters('lastname')"
                :filter-method="filterHandler"
                filter-placement="bottom-end"
            />

            <el-table-column
                prop="profession"
                label="Mutaxassisligi"
                sortable
                :filters="getUniqueFilters('profession')"
                :filter-method="filterHandler"
                filter-placement="bottom-end"
            />

            <el-table-column
                prop="user.login"
                label="Login"
                sortable
            />

            <el-table-column
                prop="user.email"
                label="Pochta"
                sortable
            />

            <el-table-column
                label="Ro'yxatdan o'tgan sanasi"
                sortable
            >
                <template #default="scope">
                    {{ moment(scope.row.user.createdAt).format('DD.MM.YYYY,  hh:mm:ss') }}
                </template>
            </el-table-column>

            <el-table-column
                prop="user.role"
                label="Rol"
                align="center"
                header-align="center"
                sortable
                :filters="getUniqueFilters('user.role')"
                :filter-method="filterHandler"
                filter-placement="bottom-end"
            >
                <template #default="scope">
                    <el-tag>{{ scope.row.user.role }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Harakatlar" align="center" header-align="center" width="100">
                <template #default="scope">
                    <div>
                        <el-button @click="onEdit" :icon="Edit" type="text" class="text-xl"/>
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
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import moment from "moment";
import {Delete, Edit} from "@element-plus/icons-vue";
import {ElNotification} from "element-plus";

const currentPage = ref(1)
const pageSize = ref(10)
const defaultPageSize = ref(10)
const pageSizes = ref([10, 20, 30, 40, 50, 100])
const tableData = ref([])
const start = ref(null)
const end = ref(null)
const paginatedDataTable = ref([])
const loading = ref(false)

const getNestedValue = (obj, path) => {
    return path.split('.').reduce((o, key) => (o ? o[key] : null), obj);
};

const getUniqueFilters = (key) => {
    return tableData.value
        .map(item => getNestedValue(item, key))
        .filter((v, i, self) => v && self.indexOf(v) === i)
        .map(value => ({text: value, value}));
};

const filterHandler = (value, row, column) => {
    const property = column.property;
    const cellValue = getNestedValue(row, property);
    return cellValue === value;
};

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

const onEdit = () => {
    ElNotification({
        type: 'warning',
        title: 'Jarayonda',
        message: 'Tez orada o\'zgartirish funksiyasi qo\'shiladi'
    })
}
const onDelete = () => {
    ElNotification({
        type: 'warning',
        title: 'Jarayonda',
        message: 'Tez orada o\'chirish funksiyasi qo\'shiladi'
    })
}


const getTableData = () => {
    loading.value = true
    axios.get('http://16.170.249.186:8080/api/emp/get-all', {
        headers: {'Content-Type': 'application/json'}
    }).then(res => {
        tableData.value = res.data;
        paginatedData()
    }).catch(err => { console.log(err) }).finally(() => {
        loading.value = false
    })
}

onMounted(() => {
    getTableData()
})
</script>

<style scoped>

</style>
