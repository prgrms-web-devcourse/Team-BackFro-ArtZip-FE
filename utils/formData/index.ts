import type { UploadFile } from 'antd';

export const objectToFormData = <T>(object: T, _formData?: FormData) => {
  const formData = _formData ? _formData : new FormData();
  formData.append('data', new Blob([JSON.stringify({ ...object })], { type: 'application/json' }));
  return formData;
};

export const filesToFormData = (files: FileList | UploadFile[], _formData?: FormData) => {
  const formData = _formData ? _formData : new FormData();
  for (let i = 0; i < files.length; i++) {
    if ('originFileObj' in files[i]) {
      formData.append('files', (files[i] as UploadFile).originFileObj as File); // TODO: 추후 files도 인자로 받을 예정
    } else {
      formData.append('files', files[i] as File);
    }
  }
  return formData;
};
