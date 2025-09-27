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
    } finally {
      loading.value = false;
    }
  }

  /** 添加证书 */
  async function addCertificate(payload: Certificate) {
    const newCert = await addCertificateApi(payload);
    certificates.value.push(newCert);
    return newCert;
  }

  /** 编辑证书 */
  async function updateCertificate(id: number, payload: Certificate) {
    const updatedCert = await updateCertificateApi(id, payload);
    const idx = certificates.value.findIndex((c) => c.id === id);
    if (idx !== -1) {
      certificates.value[idx] = updatedCert;
    }
    return updatedCert;
  }

  /** 删除证书 */
  async function removeCertificate(id: number) {
    await deleteCertificateApi(id);
    certificates.value = certificates.value.filter((c) => c.id !== id);
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