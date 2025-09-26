<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useVbenDrawer } from '@vben/common-ui';

const data = ref<Record<string, any> | null>(null);

// 计算标题：有 data 表示编辑，否则新建
const drawerTitle = computed(() =>
  data.value ? '编辑证书' : '新建证书'
);

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm() {
    console.info('保存数据', data.value);
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      data.value = drawerApi.getData<Record<string, any> | null>() || null;
    }
  },
});
</script>

<template>
  <Drawer :title="drawerTitle">
    <a-form layout="vertical" class="p-4">
      <a-form-item label="证书名称">
        <a-input v-model:value="data.name" placeholder="请输入证书名称" />
      </a-form-item>

      <a-form-item label="证书编号">
        <a-input v-model:value="data.no" placeholder="请输入证书编号" />
      </a-form-item>
    </a-form>
  </Drawer>
</template>