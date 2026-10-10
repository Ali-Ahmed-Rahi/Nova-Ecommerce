export const sendSuccess = <T>(message: string, data: T, statusCode = 200) => ({
  success: true,
  message,
  data,
  statusCode,
});

export const sendError = (message: string, errors: unknown[] = [], statusCode = 400) => ({
  success: false,
  message,
  errors,
  statusCode,
});
