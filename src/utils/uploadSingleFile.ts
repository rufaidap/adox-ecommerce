import {showMessage} from 'react-native-flash-message';

interface File {
  uploaded?: boolean;
  uploaded_url?: string;
  path?: string;
  uri?: string;
  type?: string;
  id?: string;
}

interface UploadResponse {
  uploaded_url?: string;
  uploaded: boolean;
  type?: string;
  file?: File;
}

export const uploadSingleFile = async (file: File): Promise<UploadResponse> => {
  if (file?.uploaded) {
    return {
      uploaded_url: file?.uploaded_url || file?.path || file?.uri,
      uploaded: true,
      type: file?.type,
    };
  } else {
    const formattedImage = {
      uri: file?.uri,
      type: file?.type,
      name: file?.id
        ? `${new Date().getTime()}${file?.id}`
        : `${new Date().getTime()}`,
    };
    const formData = new FormData();
    formData.append('file', formattedImage as unknown as Blob);
    try {
      const resData = await fetch(`${process.env.BASE_URL}/api/upload`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      }).then(res => res.json());

      if (resData?.path) {
        return {uploaded_url: resData?.path, uploaded: true, type: file?.type};
      } else {
        return {
          file: file,
          uploaded: false,
        };
      }
    } catch (error: any) {
      console.error('File upload error:', error);
      showMessage({
        type: 'danger',
        message: 'Upload Failed',
        description: error.message || 'Failed to upload file',
      });
      return {
        file: file,
        uploaded: false,
      };
    }
  }
};
