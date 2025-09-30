// #/api/certificate.ts
import { requestClient } from '#/api/request';

export interface Certificate {
  id: number;
  appleId: string;
  iPhoneMax: number;
  iPadMax: number;
  privateKey: string;
  privateKeyId: string;
  issuer: string;
  remark: string;
}

// 支持分页
export function getCertificateListApi(params?: { page?: number; pageSize?: number }) {
  const { page = 1, pageSize = 10 } = params || {};
  return requestClient.post<{ items: Certificate[]; total: number }>('/certificate/certificatelist', {
    page,
    pageSize,
  });
}

export function addCertificateApi(data: Certificate) {
  return requestClient.post<Certificate>('/certificate/addcertificate', data);
}

export function updateCertificateApi(id: number, data: Certificate) {
  return requestClient.put<Certificate>(`/certificate/${id}`, data);
}

export function deleteCertificateApi(id: number) {
  return requestClient.delete(`/certificate/${id}`);
}