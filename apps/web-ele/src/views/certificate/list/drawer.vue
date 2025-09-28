<script lang="ts" setup>
import { ref } from 'vue';
import { useVbenDrawer } from '@vben/common-ui';
import { ElForm, ElFormItem, ElInput, ElInputNumber } from 'element-plus';

import { useCertificateStore } from '#/store';

const certificateStore = useCertificateStore();

interface FormType {
  appleId: string;
  iPhoneMax: number;
  iPadMax: number;
  privateKey: string;
  privateKeyId: string;
  issuer: string;
  remark: string;
}

// 初始化表单默认值
const form = ref<FormType>({
  appleId: '',
  iPhoneMax: 50, // 默认值 50，范围 1-200
  iPadMax: 20,   // 默认值 20，范围 1-100
  privateKey: '',
  privateKeyId: '',
  issuer: '',
  remark: '',
});

const drawerTitle = ref('新建证书');
const data = ref<Record<string, any> | null>(null);

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm: async () => {
    console.log('提交表单数据:', form.value);
    drawerApi.setState({ loading: true });
    await certificateStore.addCertificate();
    drawerApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const externalData = drawerApi.getData<{ title?: string; record?: FormType }>();
      if (externalData?.record) {
        // 编辑模式
        drawerTitle.value = externalData.title || '编辑证书';
        form.value = { ...externalData.record };
      } else {
        // 新建模式
        drawerTitle.value = externalData?.title || '新建证书';
        form.value = {
          appleId: '',
          iPhoneMax: 50,
          iPadMax: 20,
          privateKey: '',
          privateKeyId: '',
          issuer: '',
          remark: '',
        };
      }
      data.value = externalData;
    }
  },
});
</script>

<template>
  <Drawer :title="drawerTitle">
    <div class="p-4 flex flex-col gap-3">
      <ElForm :model="form" label-width="140px">
        <ElFormItem label="Apple ID">
          <ElInput v-model="form.appleId" placeholder="请输入 Apple ID" />
        </ElFormItem>

        <ElFormItem label="iPhone证书最大数量">
          <ElInputNumber
            v-model="form.iPhoneMax"
            :min="1"
            :max="200"
            placeholder="请输入iPhone证书最大数量"
          />
        </ElFormItem>

        <ElFormItem label="iPad证书最大数量">
          <ElInputNumber
            v-model="form.iPadMax"
            :min="1"
            :max="100"
            placeholder="请输入 iPad 最大数量"
          />
        </ElFormItem>

        <ElFormItem label="证书密钥">
          <ElInput
            type="textarea"
            v-model="form.privateKey"
            placeholder="请输入密钥"
            :rows="6"
          />
        </ElFormItem>

        <ElFormItem label="密钥ID">
          <ElInput
            v-model="form.privateKeyId"
            placeholder="密钥ID"
          />
        </ElFormItem>

        <ElFormItem label="Issuer">
          <ElInput
            v-model="form.issuer"
            placeholder="请输入Issuer"
          />
        </ElFormItem>

        <ElFormItem label="备注">
          <ElInput
            type="textarea"
            v-model="form.remark"
            placeholder="请备注appleid的相关账号密码信息，以方便后续登录需要"
            :rows="4"
          />
        </ElFormItem>
      </ElForm>
    </div>
  </Drawer>
</template>