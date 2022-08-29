import type { UploadFile } from 'antd';
import { RcFile } from 'antd/lib/upload';

export const objectToFormData = <T>(key: string, value: T, _formData?: FormData) => {
  const formData = _formData ? _formData : new FormData();
  formData.append(key, new Blob([JSON.stringify({ ...value })], { type: 'application/json' }));
  return formData;
};

export const filesToFormData = (
  key: string,
  files: FileList | UploadFile[],
  _formData?: FormData,
) => {
  const formData = _formData ? _formData : new FormData();
  for (let i = 0; i < files.length; i++) {
    if ('originFileObj' in files[i]) {
      formData.append(key, (files[i] as UploadFile).originFileObj as File);
    } else {
      formData.append(key, files[i] as File);
    }
  }
  return formData;
};

export const getBase64 = (file: RcFile | File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
