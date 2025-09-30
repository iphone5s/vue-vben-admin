<script setup lang="ts">
import { ref } from 'vue'
import { useVbenDrawer } from '@vben/common-ui'
import { ElForm, ElFormItem, ElInput, ElInputNumber } from 'element-plus'
import type { FormRules } from 'element-plus'

import { useCertificateStore } from '#/store'

// ------------------------
// 1️⃣ 初始化 Store
// ------------------------
const certificateStore = useCertificateStore()

// ------------------------
// 2️⃣ 默认表单值
// ------------------------
const defaultForm = {
  appleId: 'example@apple.com', // 默认 Apple ID
  iPhoneMax: 50,
  iPadMax: 20,
  issuer: 'cf732136-95ee-4241-aece-b355a6938a2f',
  privateKeyId: 'NMVH4DCNP3',
  privateKey: 'MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQg6yLpLBUe1zny68MD4seFHrE5OKeT1nzr0lAE4JGYU6KgCgYIKoZIzj0DAQehRANCAARtfEXiiYBzG5o/UoV7YrAtNXiOaOCzMcyLMEWu64ZpjMmwe2Y+7t/4UePSZNn2R391uIEHiz8/lrg+oM6h8exK',
  remark: '测试备注',
}

// ------------------------
// 3️⃣ 响应式表单 & 引用
// ------------------------
const form = ref({ ...defaultForm })
const formRef = ref()

// ------------------------
// 4️⃣ 校验规则
// ------------------------
const rules: FormRules = {
  appleId: [
    {
      required: true,
      validator: (rule, value: string, callback) => {
        if (!value) return callback(new Error('请输入 Apple ID'))
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/^1[3-9]\d{9}$/.test(value)) {
          return callback(new Error('请输入有效的邮箱或手机号'))
        }
        callback()
      },
      trigger: 'blur',
    },
  ],
  iPhoneMax: [{ required: true, message: '请输入 iPhone 证书数量', trigger: 'blur' }],
  iPadMax: [{ required: true, message: '请输入 iPad 证书数量', trigger: 'blur' }],
  issuer: [{ required: true, message: '请输入发行者ID', trigger: 'blur' }],
  privateKeyId: [{ required: true, message: '请输入密钥ID', trigger: 'blur' }],
  privateKey: [{ required: true, message: '请输入私钥', trigger: 'blur' }],
  remark: [{ required: true, message: '请输入备注', trigger: 'blur' }],
}

// ------------------------
// 5️⃣ 使用 Drawer
// ------------------------
const [Drawer, drawerApi] = useVbenDrawer({
  width: '600px',
  onConfirm: async () => {
    try {
      await formRef.value.validate()
      drawerApi.setState({ loading: true })

      const externalData = drawerApi.getData<{ record?: typeof defaultForm }>()
      if (externalData?.record) {
        // 编辑模式
        await certificateStore.updateCertificate(form.value)
      } else {
        // 新增模式
        await certificateStore.addCertificate(form.value)
      }

      drawerApi.close()
    } catch (err) {
      console.error('表单验证失败:', err)
    } finally {
      drawerApi.setState({ loading: false })
    }
  },
  onOpenChange(isOpen: boolean) {
    if (!isOpen) return

    const externalData = drawerApi.getData<{ record?: typeof defaultForm }>()

    if (externalData?.record) {
      // 编辑模式
      Object.assign(form.value, externalData.record)
      drawerApi.setState({ title: '编辑证书' })
    } else {
      // 新建模式，保留默认表单
      Object.assign(form.value, { ...defaultForm })
      drawerApi.setState({ title: '新建证书' })
    }
  },
})
</script>

<template>
  <Drawer>
    <ElForm ref="formRef" :model="form" :rules="rules" label-width="120px">
      <ElFormItem label="Apple ID" prop="appleId">
        <ElInput v-model="form.appleId" placeholder="请输入 Apple ID 或手机号" />
      </ElFormItem>

      <ElFormItem label="iPhone 证书数量" prop="iPhoneMax">
        <ElInputNumber v-model="form.iPhoneMax" :min="1" :max="200" />
      </ElFormItem>

      <ElFormItem label="iPad 证书数量" prop="iPadMax">
        <ElInputNumber v-model="form.iPadMax" :min="1" :max="100" />
      </ElFormItem>

      <ElFormItem label="发行者ID" prop="issuer">
        <ElInput v-model="form.issuer" placeholder="请输入发行者ID" />
      </ElFormItem>

      <ElFormItem label="密钥ID" prop="privateKeyId">
        <ElInput v-model="form.privateKeyId" placeholder="请输入密钥ID" />
      </ElFormItem>

      <ElFormItem label="私钥" prop="privateKey">
        <ElInput v-model="form.privateKey" type="textarea" :rows="6" placeholder="请输入 .p8 私钥内容" />
      </ElFormItem>

      <ElFormItem label="备注" prop="remark">
        <ElInput v-model="form.remark" type="textarea" :rows="4" placeholder="请输入备注" />
      </ElFormItem>
    </ElForm>
  </Drawer>
</template>