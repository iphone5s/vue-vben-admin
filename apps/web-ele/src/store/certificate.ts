import { ref } from 'vue';
import { defineStore } from 'pinia';
import {
  getCertificateListApi,
  addCertificateApi,
  updateCertificateApi,
  deleteCertificateApi,
  type Certificate,
} from '#/api';

export const useCertificateStore = defineStore('certificate', () => {
  const loading = ref(false);
  const certificates = ref<Certificate[]>([]);

  /** 获取证书列表，支持分页 */
  async function fetchCertificates(params?: { page?: number; pageSize?: number }) {
    loading.value = true;
    try {
      const { page = 1, pageSize = 10 } = params || {};
      const data = await getCertificateListApi({ page, pageSize });
      certificates.value = data.items; // 保存到 store
      return data; // VxeTable 需要 { items, total }
    } catch (err) {
      console.error('获取证书列表失败', err);
      return { items: [], total: 0 };
    } finally {
      loading.value = false;
    }
  }

  async function addCertificate(payload: Certificate) {
    loading.value = true;
    try {
      await addCertificateApi(payload);
      // 添加后刷新第一页
      await fetchCertificates({ page: 1, pageSize: 10 });
    } finally {
      loading.value = false;
    }
  }

  async function updateCertificate(id: number, payload: Certificate) {
    loading.value = true;
    try {
      await updateCertificateApi(id, payload);
      // 更新后刷新当前页（可改成传参动态刷新）
      await fetchCertificates({ page: 1, pageSize: 10 });
    } finally {
      loading.value = false;
    }
  }

  async function removeCertificate(id: number) {
    loading.value = true;
    try {
      await deleteCertificateApi(id);
      // 删除后刷新当前页
      await fetchCertificates({ page: 1, pageSize: 10 });
    } finally {
      loading.value = false;
    }
  }

  function $reset() {
    certificates.value = [];
    loading.value = false;
  }

  return {
    certificates,
    loading,
    fetchCertificates,
    addCertificate,
    updateCertificate,
    removeCertificate,
    $reset,
  };
});