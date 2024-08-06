import { api } from "utils/api";

export const uploadFile = (
  role: string,
  userId: number,
  file: File,
  onUploadProgress: any
): Promise<any> => {
  let formData = new FormData();

  formData.append("file", file);
  formData.append("userId", userId.toString());
  formData.append("role", role);

  return api.post("/files", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};
