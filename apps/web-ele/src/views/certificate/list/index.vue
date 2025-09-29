<script setup lang="ts">  
import { useVbenVxeGrid } from '#/adapter/vxe-table';  
import { useCertificateStore } from '#/store/certificate';  
import { ElButton, ElMessage, ElTag } from 'element-plus';  
  
const certificateStore = useCertificateStore();  
  
const handleDetail = (row: any) => {  
  console.log('证书详情', row);  
  ElMessage.info(`查看证书详情: ${row.certificateName}`);  
};  
  
const handleEdit = (row: any) => {  
  console.log('编辑证书', row);  
  ElMessage.success(`编辑证书: ${row.certificateName}`);  
};  
  
const handleDelete = (row: any) => {  
  console.log('删除证书', row);  
  ElMessage.warning(`删除证书: ${row.certificateName}`);  
};  
  
// VxeTable 配置  
const [Grid, gridApi] = useVbenVxeGrid({  
  gridOptions: {  
    fit: true, // 表格宽度自动填充  
    columns: [  
      { field: 'id', title: 'ID', width: 60 },  
      { field: 'appleId', title: 'Apple Id', minWidth: 100, flex: 2 },  
      { field: 'certificateName', title: '证书名称', minWidth: 250, flex: 3 },  
      {  
        field: 'iphone',  
        title: 'iPhone',  
        minWidth: 120,  
        flex: 1,  
        slots: { default: 'iphone' }  
      },  
      {  
        field: 'ipad',  
        title: 'iPad',  
        minWidth: 100,  
        flex: 1,  
        slots: { default: 'ipad' }  
      },  
      {   
        field: 'expiryDate',  
        title: '到期时间',  
        minWidth: 120,  
        flex: 2,  
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
        minWidth: 80,  
        flex: 1,  
        slots: { default: 'status' }  
      },  
      {  
        field: 'action',  
        title: '操作',  
        width: 200,  
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
  
// 手动刷新数据  
const handleRefresh = () => {  
  gridApi.query();  
  ElMessage.success('数据刷新成功');  
};  
</script>  
  
<template>  
  <div class="p-4">  
    <div class="mb-4">  
      <el-button type="primary" @click="handleRefresh">  
        刷新数据  
      </el-button>  
    </div>  
      
    <Grid table-title="证书列表">  
      <!-- iPhone 设备数量显示 -->  
      <template #iphone="{ row }">  
        <span   
          :style="{   
            color: row.iphone + row.mac > row.iphoneMax ? 'red' : 'inherit',  
            fontWeight: row.iphone + row.mac > row.iphoneMax ? 'bold' : 'normal'  
          }"  
        >  
          {{ row.iphone + row.mac }} / {{ row.iphoneMax }}  
        </span>  
      </template>  
        
      <!-- iPad 设备数量显示 -->  
      <template #ipad="{ row }">  
        <span   
          :style="{   
            color: row.ipad > row.ipadMax ? 'red' : 'inherit',  
            fontWeight: row.ipad > row.ipadMax ? 'bold' : 'normal'  
          }"  
        >  
          {{ row.ipad }} / {{ row.ipadMax }}  
        </span>  
      </template>  
        
      <!-- 状态显示 - 正常为绿色，其他为红色 -->  
      <template #status="{ row }">  
        <el-tag   
          :type="row.status === '正常' ? 'success' : 'danger'"  
          size="small"  
        >  
          {{ row.status }}  
        </el-tag>  
      </template>  
        
      <!-- 操作按钮 - 增加左右间距 -->  
      <template #action="{ row }">  
        <div class="flex gap-1 px-6 justify-center"> 
          <el-button   
            type="primary"   
            size="small"   
            @click="handleDetail(row)"  
          >  
            详情  
          </el-button>  
          <el-button   
            type="success"   
            size="small"   
            @click="handleEdit(row)"  
          >  
            编辑  
          </el-button>  
          <el-button   
            type="danger"   
            size="small"   
            @click="handleDelete(row)"  
          >  
            删除  
          </el-button>  
        </div>  
      </template>  
    </Grid>  
  </div>  
</template>