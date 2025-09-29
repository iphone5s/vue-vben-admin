// stores/certificate.ts
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

  /** 获取证书列表 */
  async function fetchCertificates() {
    loading.value = true;
    try {
      const data = await getCertificateListApi();
      certificates.value = data;
    } catch (err) {
      console.error('获取证书列表失败', err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  /** 添加证书（自动刷新列表） */
  async function addCertificate(payload: Certificate) {
    loading.value = true;
    try {
      await addCertificateApi(payload);
      await fetchCertificates();
    } catch (err) {
      console.error('添加证书失败', err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  /** 编辑证书（自动刷新列表） */
  async function updateCertificate(id: number, payload: Certificate) {
    loading.value = true;
    try {
      await updateCertificateApi(id, payload);
      await fetchCertificates();
    } catch (err) {
      console.error('更新证书失败', err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  /** 删除证书（自动刷新列表） */
  async function removeCertificate(id: number) {
    loading.value = true;
    try {
      await deleteCertificateApi(id);
      await fetchCertificates();
    } catch (err) {
      console.error('删除证书失败', err);
      throw err;
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