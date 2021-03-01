import {useCallback, useState} from 'react';
import {
  downloadFile,
  DownloadFileOptions,
  DownloadProgressCallbackResult,
  UploadFileOptions,
  uploadFiles,
  UploadProgressCallbackResult,
} from 'react-native-fs';

function useDataTransfer() {
  const [percentage, setPercentage] = useState(0);

  const uploadProgress = (response: UploadProgressCallbackResult) => {
    const _percentage = Math.floor(
      (response.totalBytesSent / response.totalBytesExpectedToSend) * 100,
    );
    setPercentage(_percentage);
  };

  const downloadProgress = (response: DownloadProgressCallbackResult) => {
    const _percentage = Math.floor(
      (response.bytesWritten / response.contentLength) * 100,
    );
    setPercentage(_percentage);
  };

  const upload = useCallback(async (options: UploadFileOptions) => {
    setPercentage(0);
    return uploadFiles({
      ...options,
      progress: uploadProgress,
    });
  }, []);

  const download = useCallback(async (options: DownloadFileOptions) => {
    setPercentage(0);
    return downloadFile({
      ...options,
      progress: downloadProgress,
      background: true,
    });
  }, []);

  return {upload, download, percentage};
}

export default useDataTransfer;
