<script setup lang="ts">
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { useCertificateStore } from '#/store/certificate';

const certificateStore = useCertificateStore();

// VxeTable 配置
const [Grid] = useVbenVxeGrid({
  gridOptions: {
    columns: [
      { field: 'id', title: 'ID', width: 80 },
      { field: 'appleId', title: 'Apple Id', width: 180 },
      { field: 'certificateName', title: '证书名称', width: 200 },
      {
        field: 'iphone',
        title: 'iPhone',
        width: 120,
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
        width: 100,
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
      { field: 'expiryDate', title: '到期时间', width: 130 },
      {
        field: 'status',
        title: '状态',
        width: 100,
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
        width: 220,
        cellRender: {
          name: 'CellCustom',
          options: {
            renderContent: () => '详情 | 编辑 | 删除'
          }
        }
      }
    ],
    proxyConfig: {
      props: {
        result: 'items', // 数据数组
        total: 'total',  // 总数
      },
      ajax: {
        query: async () => {
          // fetchCertificates 已返回 { items, total }
          const data = await certificateStore.fetchCertificates();
          console.log('VxeTable query 返回:', data);
          return data; 
        }
      }
    },
    toolbarConfig: {
      refresh: true, // 自带刷新按钮
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
    <Grid table-title="证书列表" />
  </div>
</template>