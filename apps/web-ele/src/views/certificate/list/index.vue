<script setup lang="ts">
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { useCertificateStore } from '#/store/certificate';

const certificateStore = useCertificateStore();

const handleDetail = (row: any) => console.log('证书详情', row);
const handleEdit = (row: any) => console.log('编辑证书', row);
const handleDelete = (row: any) => console.log('删除证书', row);

const [Grid] = useVbenVxeGrid({
  formOptions: {
    collapsed: false,
    schema: [
      {
        component: 'Input',
        fieldName: 'appleId',
        label: 'Apple Id',
        componentProps: { placeholder: '请输入 Apple Id' },
      },
      {
        component: 'Input',
        fieldName: 'certificateName',
        label: '证书名称',
        componentProps: { placeholder: '请输入证书名称' },
      },
    ],
    submitButtonOptions: { content: '查询' },
    showCollapseButton: true,
  },
  gridOptions: {
    fit: true,           // 自动按容器宽度调整列宽
    autoResize: true,    // 随容器变化自动调整
    border: true,
    stripe: true,
    showOverflow: true,
    height: 'auto',
    columns: [
      { field: 'id', title: 'ID', width: 80 },
      { field: 'appleId', title: 'Apple Id', width: 180 },
      { field: 'certificateName', title: '证书名称', width: 200 },
      {
        field: 'iphone',
        title: 'iPhone',
        minWidth: 120,
        cellRender: {
          name: 'CellCustom',
          options: {
            renderContent: ({ row }) => `${row.iphone + row.mac} / ${row.iphoneMax}`,
            renderStyle: ({ row }) => ({
              color: row.iphone + row.mac > row.iphoneMax ? 'red' : 'inherit'
            })
          }
        }
      },
      {
        field: 'ipad',
        title: 'iPad',
        minWidth: 100,
        cellRender: {
          name: 'CellCustom',
          options: {
            renderContent: ({ row }) => `${row.ipad} / ${row.ipadMax}`,
            renderStyle: ({ row }) => ({
              color: row.ipad > row.ipadMax ? 'red' : 'inherit'
            })
          }
        }
      },
      { field: 'expiryDate', title: '到期时间', minWidth: 130 },
      {
        field: 'status',
        title: '状态',
        minWidth: 100,
        cellRender: {
          name: 'CellCustom',
          options: {
            renderContent: ({ row }) => row.status,
            renderStyle: ({ row }) => ({
              color: row.status === '正常' ? 'green' : 'red'
            })
          }
        }
      },
      {
        field: 'action',
        title: '操作',
        minWidth: 220,
        slots: { default: 'action' }  // 自定义操作列
      }
    ],
    proxyConfig: {
      props: { result: 'items', total: 'total' },
      ajax: {
        query: async () => {
          const data = await certificateStore.fetchCertificates();
          console.log('VxeTable query 返回:', data);
          return data;
        }
      }
    },
    toolbarConfig: {
      refresh: true,
      zoom: true,
      search: true
    }
  }
});
</script>

<template>
  <div class="p-4 w-full">
    <Grid table-title="证书列表">
      <template #action="{ row }">
        <button class="mr-2 text-blue-500" @click="handleDetail(row)">详情</button>
        <button class="mr-2 text-green-500" @click="handleEdit(row)">编辑</button>
        <button class="text-red-500" @click="handleDelete(row)">删除</button>
      </template>
    </Grid>
  </div>
</template>