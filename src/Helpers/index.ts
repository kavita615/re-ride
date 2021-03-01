export const logger = (
  endPoint: string | undefined,
  log: any,
  isError?: boolean,
) => {
  if (__DEV__) {
    if (isError) {
      console.log(endPoint, log.response);
    } else {
      console.log(endPoint, log);
    }
  }
};

export const onError = (error: any) => {
  if (error?.response) {
    console.log(error.response);
  } else {
  }
};
