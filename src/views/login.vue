<template>
    <el-container>
        <el-header>

        </el-header>
        <div class="main" ref="main">
            <el-main id="webgl">
                <el-form>
                    <el-form-item label="账号">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </div>
    </el-container>
</template>

<script>

export default {
    data() {
        return {
            form: {
                name: '',
                password: ''
            }
        }
    },
    methods: {
        login(){
            this.$router.push('/main')
        }
    },
    mounted() {
    }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  /*隐藏滚动条*/
}

.el-header {
  background-color: #0066ff;
  // background-color: #cce0ff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #5a112c;
  color: #333;
  text-align: center;
  height: 100%;
  padding: 0;
}

.main {
  height: 100%;
}
</style>