<script lang="ts" setup>
import { ref } from 'vue';
import { Page, useVbenForm, useVbenDrawer } from '@vben/common-ui';
import {
  ElCard,
  ElTable,
  ElTableColumn,
  ElButton,
  ElMessage,
} from 'element-plus';

// 引入抽屉内容
import ExtraDrawer from './drawer.vue';

// 表格数据
const tableData = ref([
  { id: '1', appleId: 'test1@apple.com', name: '名称A', iPhone: 'iPhone12', iPad: 'iPad Pro', status: '正常', expire: '2025-01-01' },
  { id: '2', appleId: 'test2@apple.com', name: '名称B', iPhone: 'iPhone13', iPad: 'iPad Air', status: '正常', expire: '2025-02-01' },
]);

// ====== 抽屉相关 ======
const [Drawer, drawerApi] = useVbenDrawer({
  connectedComponent: ExtraDrawer,
});

// 添加按钮
const handleAdd = () => {
  drawerApi.setData({
    title: '新建证书',
    record: null,
  }).open();
};

// 编辑按钮
const handleEdit = (row: any) => {
  drawerApi.setData({
    title: '编辑证书',
    record: row,
  }).open();
};

// 删除按钮
const handleDelete = (row: any) => {
  ElMessage.warning(`点击删除，序号：${row.id}`);
};

// 刷新按钮
const handleRefresh = () => {
  ElMessage.success('点击刷新');
};

// ====== 查询表单 ======
const [Form] = useVbenForm({
  layout: 'horizontal',
  submitButtonOptions: {
    content: '查询',
    style: 'margin-left: 10px;',
  },
  handleSubmit: (values) => {
    ElMessage.success(`表单数据：${JSON.stringify(values)}`);
  },
  schema: [
    {
      component: 'Input',
      fieldName: 'appleId',
      label: 'Apple Id',
      componentProps: {
        style: 'width: 240px',
        placeholder: '请输入苹果账号',
      },
    },
  ],
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
        <!-- 工具栏 -->
        <div class="mb-3 flex justify-end gap-2">
          <ElButton type="primary" @click="handleAdd">添加</ElButton>
          <ElButton @click="handleRefresh">刷新</ElButton>
        </div>

        <ElTable :data="tableData" border style="width: 100%">
          <ElTableColumn label="序号" prop="id" width="80" />
          <ElTableColumn label="Apple Id" prop="appleId" />
          <ElTableColumn label="名称" prop="name" />
          <ElTableColumn label="iPhone" prop="iPhone" />
          <ElTableColumn label="iPad" prop="iPad" />
          <ElTableColumn label="到期时间" prop="expire" />
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

    <!-- 挂载抽屉 -->
    <Drawer />
  </Page>
</template>