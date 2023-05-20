<template>
    <div class="building">
        <div class="login_box">
            <div class="avatar"><img src="../assets/images/1.jpg"></div>
            <el-form ref="loginref" :model="loginForm" :rules="loginrules" class="login_form">

                <el-form-item prop="userName">
                    <el-input v-model="loginForm.userName" prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>

                <el-form-item prop="pwd">
                    <el-input v-model="loginForm.pwd" prefix-icon="el-icon-lock" type="pwd" show-password></el-input>
                </el-form-item>

                <el-form-item class="btns">
                    <el-button class="loginbtn" type="primary" @click="login"
                               v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>

                </el-form-item>

            </el-form>

    </div></div>


</template>







<script>
export default {
    data() {
        return {
            fullscreenLoading: false,
            loginForm: {
                userName: '',
                pwd: ''
            },

            loginrules: {
                userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
                pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            },
        }
    },
    methods: {
       async login() {
           if(this.loginForm.userName == 'zyb' && this.loginForm.pwd == '123456'){
               this.$router.push('/main')}
           else{
               this.$message.error('账号或密码错误')}
            // const res = await this.$http.get('/test').then(res => {
            //     console.log(res.data);
            // }).catch(err => {
            //     console.log(err);
            // })
            // this.$refs.loginref.validate(async valid => {
            //     this.fullscreenLoading = true
            //     if (!valid) return this.fullscreenLoading = false
            //     const res = await this.$http.post('/user/login', this.loginForm);
            //     console.log(res.headers.authorization);
            //     if (res.data.code !== 200) {
            //         this.fullscreenLoading = false
            //         return this.$message.error('登录失败')
            //     }
            //     else {
            //         this.fullscreenLoading = false
            //         this.$message.success('登录成功')
            //         window.sessionStorage.setItem('authorization', res.headers.authorization);
            //         this.$router.push('/home')
            //     }
            // });
        },


    }
}
</script>








<style lang="less" scoped>
.building {
    background: url("../assets/images/2.jpg");
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
}

.login_box {
    width: 450px;
    height: 300px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 5px;
    border-radius: 5px;
    box-shadow: 0 0 25px #909399;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.avatar {
    position: absolute;
    left: 50%;

    transform: translate(-50%, -50%);
}

.avatar img {
    height: 130px;
    width: 130px;
    border: 2px solid hsl(258, 76%, 51%);
    border-radius: 50%;
}

.btns {
    display: flex;
    left: 50%
}

.loginbtn {
    width: 100px;
    margin-left: 140px;
    //margin-right: 70px;
}

.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
</style>