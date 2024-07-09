export const ResponseJson = (res, status, message, data) => {
  return res.status(status).json({
    statusCode: status,
    message: message || "",
    result: data,
  });
};
