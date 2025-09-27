<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useVbenDrawer } from '@vben/common-ui';
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';

const form = ref({
  appleId: '',
  name: '',
  iPhone: '',
  iPad: '',
  expire: '',
  status: '',
});

const drawerTitle = ref('新建证书'); // 默认标题

const data = ref<Record<string, any> | null>(null);

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm() {
    console.log('提交表单数据:', form.value);
    drawerApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const externalData = drawerApi.getData<{ title?: string; record?: any }>();
      if (externalData?.record) {
        // 编辑模式
        drawerTitle.value = externalData.title || '编辑证书';
        form.value = { ...externalData.record };
      } else {
        // 新建模式
        drawerTitle.value = externalData?.title || '新建证书';
        form.value = { appleId: '', name: '', iPhone: '', iPad: '', expire: '', status: '' };
      }
      data.value = externalData;
    }
  },
});
</script>

<template>
  <Drawer :title="drawerTitle">
    <div class="p-4 flex flex-col gap-3">
      <ElForm :model="form" label-width="100px">
        <ElFormItem label="Apple Id">
          <ElInput v-model="form.appleId" placeholder="请输入 Apple Id" />
        </ElFormItem>
        <ElFormItem label="名称">
          <ElInput v-model="form.name" placeholder="请输入名称" />
        </ElFormItem>
        <ElFormItem label="iPhone">
          <ElInput v-model="form.iPhone" placeholder="请输入 iPhone 型号" />
        </ElFormItem>
        <ElFormItem label="iPad">
          <ElInput v-model="form.iPad" placeholder="请输入 iPad 型号" />
        </ElFormItem>
        <ElFormItem label="到期时间">
          <ElInput v-model="form.expire" placeholder="请输入到期时间" />
        </ElFormItem>
        <ElFormItem label="状态">
          <ElInput v-model="form.status" placeholder="请输入状态" />
        </ElFormItem>
      </ElForm>

      <div class="flex justify-end gap-2 mt-4">
        <ElButton @click="drawerApi.close()">取消</ElButton>
        <ElButton type="primary" @click="drawerApi.onConfirm()">确定</ElButton>
      </div>
    </div>
  </Drawer>
</template>