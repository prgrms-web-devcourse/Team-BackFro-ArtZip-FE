import type { UploadFile } from 'antd';

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
