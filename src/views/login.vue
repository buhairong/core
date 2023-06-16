<template>
  <div class="login-page">
    <img class="login-img" src="@/assets/loginImg.png" />
    <div class="form-wrap">
      <img class="logo" src="@/assets/logo_txt.png" />
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="用户名" prop="account">
          <el-input v-model="form.account" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input show-password v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="submit-btn" type="primary" @click="submitForm"> 登录 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import type { ILogin } from '@/types/login'
import { accountLoginNotify } from '@/api/login'

const formRef = ref<FormInstance>()
const router = useRouter()

const form = reactive<ILogin>({
  account: '',
  password: ''
})

const rules = reactive<FormRules>({
  account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const submitForm = () => {
  if (formRef.value) {
    formRef.value.validate((valid) => {
      if (valid) {
        accountLoginNotify(form).then((res: any) => {
          localStorage.setItem('token', res.token)
          router.push({
            path: '/home'
          })
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  .login-img {
    width: 0;
    flex: 1;
    height: 100%;
  }
  .form-wrap {
    width: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .logo {
      margin-bottom: 70px;
      width: 189px;
    }
    .el-input {
      width: 20vw;
    }
    .submit-btn {
      width: 100%;
    }
  }
}
</style>
