export function errorHandler(err, req, res, next) {
  console.error("Error:", err.message);

  const status = err.status || 500;
  const detail = err.detail || null;

  res.status(status).json({
    error: err.message,
    detail,
  });
}