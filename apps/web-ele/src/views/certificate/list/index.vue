<script lang="ts" setup>
import { onMounted } from 'vue';
import { ElCard, ElTable, ElTableColumn, ElButton, ElMessage } from 'element-plus';
import { Page, useVbenForm, useVbenDrawer } from '@vben/common-ui';

import ExtraDrawer from './drawer.vue';
import { useCertificateStore } from '#/store';

const certificateStore = useCertificateStore();

// 抽屉
const [Drawer, drawerApi] = useVbenDrawer({
  connectedComponent: ExtraDrawer,
});

// 添加
const handleAdd = () => {
  drawerApi.setData({ title: '新建证书', record: null }).open();
};

// 编辑
const handleEdit = (row: any) => {
  drawerApi.setData({ title: '编辑证书', record: row }).open();
};

// 删除
const handleDelete = async (row: any) => {
  try {
    await certificateStore.removeCertificate(row.id);
    ElMessage.success('删除成功');
  } catch (err) {
    ElMessage.error('删除失败');
    console.error(err);
  }
};

// 刷新
const handleRefresh = async () => {
  try {
    await certificateStore.fetchCertificates();
    ElMessage.success('列表已刷新');
  } catch (err) {
    ElMessage.error('刷新失败');
    console.error(err);
  }
};

// 查询表单
const [Form] = useVbenForm({
  layout: 'horizontal',
  submitButtonOptions: { content: '查询', style: 'margin-left: 10px;' },
  handleSubmit: (values) => {
    ElMessage.success(`表单数据：${JSON.stringify(values)}`);
  },
  schema: [
    {
      component: 'Input',
      fieldName: 'appleId',
      label: 'Apple Id',
      componentProps: { style: 'width: 240px', placeholder: '请输入苹果账号' },
    },
  ],
});

// 初始化
onMounted(async () => {
  await certificateStore.fetchCertificates();
});
</script>

<template>
  <Page>
    <div>
      <!-- 查询表单 -->
      <ElCard class="mb-5">
        <Form />
      </ElCard>

      <!-- 表格 -->
      <ElCard class="mb-5">
        <div class="mb-3 flex justify-end gap-2">
          <ElButton type="primary" @click="handleAdd">添加</ElButton>
          <ElButton @click="handleRefresh">刷新</ElButton>
        </div>

        <ElTable :data="certificateStore.certificates" border style="width: 100%">
          <ElTableColumn label="序号" prop="id" width="60" />
          <ElTableColumn label="Apple Id" prop="appleId" />
          <ElTableColumn label="证书名称" prop="certificateName" />
          <ElTableColumn label="iPhone" prop="iPhoneMax" />
          <ElTableColumn label="iPad" prop="iPadMax" />
          <ElTableColumn label="到期时间" prop="expiryDate" />
          <ElTableColumn label="状态" prop="status" />
          <ElTableColumn fixed="right" label="操作" width="180">
            <template #default="scope">
              <ElButton link type="primary" size="small" @click="handleEdit(scope.row)">编辑</ElButton>
              <ElButton link type="danger" size="small" @click="handleDelete(scope.row)">删除</ElButton>
            </template>
          </ElTableColumn>
        </ElTable>
      </ElCard>
    </div>

    <!-- 抽屉 -->
    <Drawer />
  </Page>
</template>