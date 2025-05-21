<template>
    <div class="main">
        <el-row>
            <el-col style="height: 100vh; background-color: #377ABE; width: 100%; overflow: hidden" :span="15">
                <img class="main-image-login" src="@/assets/images/306%203.JPG" alt="">
            </el-col>
            <el-col :span="9">
                <div class="w-full mt-28 flex justify-center">
                    <img class="w-28" src="@/assets/images/logotip2.jpg" alt="">
                </div>
                <div class="main-info-box">
                    <p class="info1">
                        Hujjatlarni yuritish tizimi
                    </p>
                </div>
                <div class="main-form-box">
                    <form class="main-form px-20 pt-6">
                        <label style="font-size: 14px; font-weight: normal; color: #3d4046" for="login">
                            Login
                        </label>
                        <el-input
                            v-model="inputEmail"
                            :class="notFilled && !inputEmail ? 'no-fill' : ''"
                            class="login"
                            id="login"
                            style="font-size: 14px"
                            placeholder="Loginni kiriting"
                            @keyup.enter="enterButton"
                            clearable size="small"
                        ></el-input>
                        <p v-if="!inputEmail && notFilled" class="not-filled">
                            Majburiy maydon
                        </p>
                        <p v-else class="not-filled"></p>
                        <label style="font-size: 14px; margin-top: 5px; font-weight: normal; color: #3d4046"
                               for="password">
                            Parol
                        </label>
                        <el-input
                            v-model="inputPassword"
                            :class="notFilled && !inputPassword ? 'no-fill' : ''"
                            class="password"
                            id="password"
                            style="font-size: 14px" type="password"
                            show-password
                            @keyup.enter="enterButton"
                            placeholder="Parolni kiriting"
                            clearable size="small"
                        ></el-input>
                        <p v-if="!inputPassword && notFilled" class="not-filled">
                            Majburiy maydon
                        </p>
                        <p v-else class="not-filled"></p>
                        <el-button @click="enterButton" class="w-1/2 mt-5 ml-[25%] bg-blue-700 text-white">
                            TIZIMGA KIRISH
                        </el-button>
                    </form>
                </div>
                <div class="w-full flex justify-center">
                    <el-button @click="router.push('register')" class="mt-32" type="text">Registratsiyadan o'tmaganmisiz?</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import router from "@/router";
import {ref} from "vue";
import axios from "axios";
import store from "@/store";
import {ElMessage} from "element-plus";

store.commit('setToken', null)

const inputEmail = ref()
const inputPassword = ref()
const notFilled = ref(false)

const enterButton = async () => {
    if (!inputEmail.value) {
        notFilled.value = true
    }
    if (!inputPassword.value) {
        notFilled.value = true
    }
    axios.post('http://16.170.249.186:8080/api/auth/login', {login: inputEmail.value, password: inputPassword.value}).then(res => {
        store.commit("setToken", res.data.accessToken)
        router.push('/user')
    }).catch(err => { ElMessage.error('Tizimga kirish amalga oshirilmadi.') })
}
</script>

<style>
.not-filled {
    margin: 10px 0 0 0;
    font-size: 12px;
    font-weight: 500;
    height: 18px;
    color: var(--el-color-error);
    transition: all 0.4s;
}

.el-input.login .el-input__wrapper, .el-input.password .el-input__wrapper {
    padding: 0 15px;
    border-radius: 8px;
    height: 50px;
    font-weight: 600;
    font-size: 15px;
    color: #606266;
}

.el-input.login .el-input__wrapper::placeholder, .el-input.password .el-input__wrapper::placeholder {
    padding: 0 15px;
}

.el-input.no-fill .el-input__wrapper {
    box-shadow: 0 0 0 1px red !important;
}

.el-input .el-input__wrapper.is-focus {
    box-shadow: 0 0 0 1px var(--el-input-hover-border);
}

.main-image-login {
    width: 100%;
    height: 100%;
    border-right: 1px solid #dfdfdf;
}

.el-card.is-always-shadow {
    box-shadow: none;
}

.el-card {
    border: none !important;
}

.main-forgot-password {
    width: 60%;
    height: 19px;
    transition: all 0.3s;
}

.main-form {
    width: 90%;
}

.main-form-box {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.info1 {
    font-size: 22px;
    font-family: Roboto, Arial, sans-serif;
    font-weight: 600;
    color: #3d4046;
    line-height: 1;
    margin: 0;
}

.main-info-box {
    width: 100%;
    text-align: center;
    margin-top: 50px;
}

.main-logo-box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 80px;
}

.el-card .el-card__body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.main {
    overflow: hidden;
    font-family: Arial;
}
</style>
