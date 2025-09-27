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

export function getCertificateListApi() {
  return requestClient.get<Certificate[]>('/certificate');
}

export function addCertificateApi(data: Certificate) {
  return requestClient.post<Certificate>('/certificate', data);
}

export function updateCertificateApi(id: number, data: Certificate) {
  return requestClient.put<Certificate>(`/certificate/${id}`, data);
}

export function deleteCertificateApi(id: number) {
  return requestClient.delete(`/certificate/${id}`);
}