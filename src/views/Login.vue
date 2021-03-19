<template>
    <div class="login">
        <el-form :model="loginForm">
            <el-form-item>
                <el-input v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="login">点击登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
    import {
        Component,
        Vue,
        Watch
    } from 'vue-property-decorator';
    import loginAPI from '@/axios/api/login';
    import ls from '@/adapter/ls';

    @Component
    export default class Home extends Vue {

        private loginForm = {
            username: "强子",
            password: "1236"
        }

        private get logData () {
            console.log(this.loginForm.username, "logdata");
            return this.loginForm.username;
        }

        @Watch('loginForm.username')
        public watchUsername(oldObject: any) {
            console.log(oldObject);
        }

        public async login() {
            console.log(this.loginForm.username, this.loginForm.password);
            const data = await loginAPI.login(this.loginForm.username, this.loginForm.password);
            console.log(this.logData);
            console.log(data);
            if(data.code == '0'){
                // 登录成功
                const jwt = data.data.jwt;
                ls.set('jwt', jwt);
            }
            this.$router.push('/');
        }
    }
</script>