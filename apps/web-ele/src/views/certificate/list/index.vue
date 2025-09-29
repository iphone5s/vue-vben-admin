<script setup lang="ts">
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { useCertificateStore } from '#/store/certificate';

const certificateStore = useCertificateStore();

const handleDetail = (row: any) => {
  console.log('证书详情', row);
};

const handleEdit = (row: any) => {
  console.log('编辑证书', row);
};

const handleDelete = (row: any) => {
  console.log('删除证书', row);
};

// VxeTable 配置
const [Grid] = useVbenVxeGrid({
  gridOptions: {
    fit: true, // 表格宽度自动填充
    columns: [
      { field: 'id', title: 'ID', width: 60 }, // 固定宽
      { field: 'appleId', title: 'Apple Id', minWidth: 100, flex: 2 }, // 20%
      { field: 'certificateName', title: '证书名称', minWidth: 250, flex: 3 }, // 30%
      {
        field: 'iphone',
        title: 'iPhone',
        minWidth: 20,
        flex: 1, // 10%
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
        minWidth: 20,
        flex: 1, // 10%
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
      { 
        field: 'expiryDate',
        title: '到期时间',
        minWidth: 120,
        flex: 2, // 20%
        formatter: ({ cellValue }) => {
          if (!cellValue) return '';
          const date = new Date(cellValue);
          const y = date.getFullYear();
          const m = date.getMonth() + 1;
          const d = date.getDate();
          return `${y}年${m}月${d}日`;
        }
      },
      {
        field: 'status',
        title: '状态',
        minWidth: 20,
        flex: 1, // 10%
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
        width: 200, // 固定宽
        slots: { default: 'action' } 
      }
    ],
    proxyConfig: {
      props: {
        result: 'items',
        total: 'total'
      },
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
      zoom: true
    },
    border: true,
    stripe: true,
    showOverflow: true,
    height: 'auto'
  }
});
</script>

<template>
  <div class="p-4">
    <Grid table-title="证书列表">
      <!-- 自定义操作列 -->
      <template #action="{ row }">
        <button class="mr-2 text-blue-500" @click="handleDetail(row)">详情</button>
        <button class="mr-2 text-green-500" @click="handleEdit(row)">编辑</button>
        <button class="text-red-500" @click="handleDelete(row)">删除</button>
      </template>
    </Grid>
  </div>
</template>