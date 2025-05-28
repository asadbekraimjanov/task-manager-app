<template>
    <div class="w-full bg-blue-900 px-3 text-white font-normal text-2xl flex justify-between items-center shadow">
        <div class="flex justify-between items-center py-2">
            <el-icon class="cursor-pointer" @click="onToggleMenu">
                <Expand v-if="toggleMenu"/>
                <Fold v-else/>
            </el-icon>
            <p class="ml-3">Task Manager</p>
        </div>
        <el-popover trigger="click">
            <template #reference>
                <el-avatar @click="openProfileDialog" class="h-10 w-10 cursor-pointer">
                    <img src="@/assets/empty-avatar.png" alt="">
                </el-avatar>
            </template>
            <template #default>
                <div class="w-full flex justify-center">
                    <el-button @click="exitButton" class="w-full">Logout</el-button>
                </div>
            </template>
        </el-popover>
    </div>

    <div class="w-full h-[calc(100vh-66px)]">
        <el-row class="w-full h-full">
            <el-col :span="menuSpan" class="bg-blue-900 border-t border-t-blue-950 p-2">
                <div class="w-full p-2 text-white text-md" v-for="item in components">
                    <router-link :to="item.path" class="flex items-center" :class="toggleMenu ? 'justify-center' : ''" active-class="active-menu">
                        <img :src="item.icon" alt="">
                        <p v-if="!toggleMenu" class="ml-3">{{ item.name }}</p>
                    </router-link>
                </div>
            </el-col>
            <el-col :span="sectionSpan">
                <router-view class="h-full" />
            </el-col>
        </el-row>
    </div>
</template>


<script setup>
import {Expand, Fold,} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import projects from "../assets/icons/tabler-icon/projects.svg";
import employee from "../assets/icons/tabler-icon/employee.svg";
import tasks from "../assets/icons/tabler-icon/tasks.svg";
// import documents from "../assets/icons/tabler-icon/documents.svg";
import board from "../assets/icons/tabler-icon/board.svg";
import profile from "../assets/icons/tabler-icon/user.svg";
import router from "@/router";
import store from "@/store";

const toggleMenu = ref(false)
const menuSpan = ref(4)
const sectionSpan = ref(20)
const dialogVisible = ref(false)

const components = ref([
    {
        name: 'Projects',
        path: 'projects',
        icon: projects,
    },
    {
        name: "List board",
        path: 'board',
        icon: board,
    },
    {
        name: 'Employee management',
        path: 'employees',
        icon: employee,
    },
    {
        name: 'Incoming tasks',
        path: 'tasks',
        icon: tasks,
    },
    // {
    //     name: 'Fayllar',
    //     path: 'documents',
    //     icon: documents,
    // },
    {
        name: 'Profile',
        path: 'profile',
        icon: profile
    }
])

const openProfileDialog = () => {
    dialogVisible.value = true
}

const onToggleMenu = () => {
    if (toggleMenu.value) {
        menuSpan.value = 4;
        sectionSpan.value = 20;
    } else {
        menuSpan.value = 1;
        sectionSpan.value = 23;
    }
    toggleMenu.value = !toggleMenu.value;
}

const exitButton = () => {
    router.push('/');
    store.commit('setUserData', null)
}

onMounted(() => {
    if (store.state.userData.role === 'ROLE_EMPLOYEE' || store.state.userData.role === 'EMPLOYEE') {
        components.value = components.value.filter((item) => {
            if (item.path === 'board' || item.path === 'tasks' || item.path === 'profile') {
                return item
            }
        })
    }
})

</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
}

</style>
