<script lang="ts" setup>

import { Page } from '@vben/common-ui';
import { useVbenForm } from '#/adapter/form';

import {
  ElCard,
  ElTable,
  ElButton,
  ElMessage,
} from 'element-plus';

const tableData = [
  { prop1: '1', prop2: 'A' },
  { prop1: '2', prop2: 'B' },
  { prop1: '3', prop2: 'C' },
  { prop1: '4', prop2: 'D' },
  { prop1: '5', prop2: 'E' },
  { prop1: '6', prop2: 'F' },
];

const handleClick = () => {
  console.log('click')
}

const [Form, formApi] = useVbenForm({
  commonConfig: {
    // 所有表单项
    componentProps: {
      class: 'w-80',
    },
  },
  
  layout: 'horizontal',
  submitButtonOptions: {
    content: '查询',
    style: 'margin-left: 10px;',
    // show: false,
  },
  
  handleSubmit: (values) => {
    ElMessage.success(`表单数据：${JSON.stringify(values)}`);
  },
  
  schema: [
    {
      component: 'Input',
      fieldName: 'string',
      label: 'Apple Id',
      componentProps: {
        style:"width: 240px",
        placeholder: '请输入苹果账号',
      },
    },
  ],
  wrapperClass: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
});

</script>

<template>
  <Page

  >
    <div>
      <ElCard class="mb-5">
        <Form />
      </ElCard>
      <ElCard class="mb-5">
        <ElTable :data="tableData" border style="width: 100%">
          <ElTable.TableColumn label="序号" prop="prop1" width="80" />
          <ElTable.TableColumn label="apple id" prop="prop2" />
          <ElTable.TableColumn label="iPhone" prop="prop2" />
          <ElTable.TableColumn label="iPad" prop="prop2" />
          <ElTable.TableColumn label="状态" prop="prop2" />
          <ElTable.TableColumn label="到期时间" prop="prop3" />
          <ElTable.TableColumn fixed="right" label="操作" width ="100">
          <template #default>
          <ElButton link type="primary" size="small" @click="handleClick"> 查看</ElButton>
          <ElButton link type="primary" size="small" @click="handleClick"> 编辑</ElButton>
          </template>
          </ElTable.TableColumn>
        </ElTable>
      </ElCard>
    </div>
  </Page>
</template>
