export function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);
  const status = error.status || (error.name === 'CastError' ? 404 : error.name === 'ValidationError' ? 400 : 500);
  const code = error.code || (status === 404 ? 'CASE_NOT_FOUND' : status === 400 ? 'VALIDATION_ERROR' : 'INTERNAL_ERROR');
  if (status >= 500) console.error(`[${req.requestId}] ${req.method} ${req.path}: ${error.message}`);
  const development = process.env.NODE_ENV !== 'production';
  const message = status < 500
    ? error.message
    : development && code === 'AI_GENERATION_FAILED'
      ? error.message
      : 'An unexpected error occurred. Please try again.';
  res.status(status).json({ success:false, error:{ code, message, ...(development && status >= 500 ? { requestId: req.requestId } : {}) } });
}
