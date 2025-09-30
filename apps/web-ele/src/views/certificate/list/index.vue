<script setup lang="ts">
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { useCertificateStore } from '#/store/certificate';
import { ElButton, ElMessage, ElTag } from 'element-plus';
import { useVbenDrawer } from '@vben/common-ui';
import ExtraDrawer from './drawer.vue';

const certificateStore = useCertificateStore();

// 注册 Drawer
const [Drawer, drawerApi] = useVbenDrawer({
  connectedComponent: ExtraDrawer,
});

const handleDetail = (row: any) => {
  ElMessage.info(`查看证书详情: ${row.certificateName}`);
};

const handleEdit = (row: any) => {
  ElMessage.success(`编辑证书: ${row.certificateName}`);
};

const handleDelete = (row: any) => {
  ElMessage.warning(`删除证书: ${row.certificateName}`);
};

const handleAdd = () => {
  drawerApi.setData({ title: '新建证书', record: null }).open();
};

// VxeTable 配置
const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    fit: true,
    columns: [
      { field: 'id', title: 'ID', width: 60 },
      { field: 'appleId', title: 'Apple Id', minWidth: 100, flex: 2 },
      { field: 'certificateName', title: '证书名称', minWidth: 250, flex: 3 },
      { field: 'iphone', title: 'iPhone', minWidth: 120, flex: 1, slots: { default: 'iphone' } },
      { field: 'ipad', title: 'iPad', minWidth: 100, flex: 1, slots: { default: 'ipad' } },
      { 
        field: 'expiryDate', 
        title: '到期时间', 
        minWidth: 120, 
        flex: 2,
        formatter: ({ cellValue }) => cellValue ? new Date(cellValue).toLocaleDateString() : '',
      },
      { field: 'status', title: '状态', minWidth: 80, flex: 1, slots: { default: 'status' } },
      { field: 'action', title: '操作', width: 200, slots: { default: 'action' } },
    ],
    proxyConfig: {
      props: { result: 'items', total: 'total' },
      ajax: {
        query: async ({ page, pageSize }) => {
          const currentPage = page?.currentPage || 1;
          const size = pageSize || page?.pageSize || 10;
          return await certificateStore.fetchCertificates({ page: currentPage, pageSize: size });
        },
      },
    },
    // 关闭原本刷新和放大按钮
    toolbarConfig: false,
    border: true,
    stripe: true,
    showOverflow: true,
    height: '100%',
  },
});
</script>

<template>
  <div class="p-4" style="height: 100vh; padding-bottom: 40px;">
    <Grid table-title="证书列表" class="h-full">
      <!-- 自定义工具栏 -->
      <template #toolbar-tools>
        <el-button type="primary" @click="handleAdd">添加</el-button>
        <el-button type="default" @click="gridApi.query()">刷新</el-button>
      </template>

      <template #iphone="{ row }">
        <span :style="{ color: row.iphone + row.mac > row.iphoneMax ? 'red' : 'inherit', fontWeight: row.iphone + row.mac > row.iphoneMax ? 'bold' : 'normal' }">
          {{ row.iphone + row.mac }} / {{ row.iphoneMax }}
        </span>
      </template>

      <template #ipad="{ row }">
        <span :style="{ color: row.ipad > row.ipadMax ? 'red' : 'inherit', fontWeight: row.ipad > row.ipadMax ? 'bold' : 'normal' }">
          {{ row.ipad }} / {{ row.ipadMax }}
        </span>
      </template>

      <template #status="{ row }">
        <el-tag :type="row.status === '正常' ? 'success' : 'danger'" size="small">{{ row.status }}</el-tag>
      </template>

      <template #action="{ row }">
        <div class="flex gap-1 px-6 justify-center">
          <el-button type="primary" size="small" @click="handleDetail(row)">详情</el-button>
          <el-button type="success" size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
        </div>
      </template>
    </Grid>

    <!-- 挂载 Drawer -->
    <Drawer />
  </div>
</template>