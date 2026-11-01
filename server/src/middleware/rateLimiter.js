import rateLimit from 'express-rate-limit';
export const createLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 8, standardHeaders: 'draft-7', legacyHeaders: false, message: { success:false, error:{ code:'RATE_LIMITED', message:'Too many case requests. Please wait a little and try again.' } } });
export const actionLimiter = rateLimit({ windowMs: 60 * 1000, limit: 40, standardHeaders: 'draft-7', legacyHeaders: false, message: { success:false, error:{ code:'RATE_LIMITED', message:'Too many actions. Please wait a moment.' } } });
