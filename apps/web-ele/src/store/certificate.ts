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

  /** 获取证书列表，直接返回 getCertificateListApi 的结果 */
  async function fetchCertificates() {
    loading.value = true;
    try {
      const data = await getCertificateListApi();
      certificates.value = data.items; // 如果你还想在 store 里保存列表
      return data; // { items, total } 直接返回
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
      await fetchCertificates();
    } finally {
      loading.value = false;
    }
  }

  async function updateCertificate(id: number, payload: Certificate) {
    loading.value = true;
    try {
      await updateCertificateApi(id, payload);
      await fetchCertificates();
    } finally {
      loading.value = false;
    }
  }

  async function removeCertificate(id: number) {
    loading.value = true;
    try {
      await deleteCertificateApi(id);
      await fetchCertificates();
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