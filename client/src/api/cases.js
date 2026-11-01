const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
async function request(path, options = {}) {
  let response;
  try { response = await fetch(`${BASE}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...options.headers }, body: options.body ? JSON.stringify(options.body) : undefined }); }
  catch { throw new Error('Could not reach the case server. Check your connection and try again.'); }
  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.success) throw new Error(result?.error?.message || 'Something went wrong. Please try again.');
  return result.data;
}
export const createCase = (body) => request('/cases', { method: 'POST', body });
export const getCase = (id) => request(`/cases/${id}`);
export const discoverClue = (id, clueId) => request(`/cases/${id}/clues/${clueId}/discover`, { method: 'POST' });
export const requestHint = (id) => request(`/cases/${id}/hints`, { method: 'POST' });
export const accuse = (id, suspectId) => request(`/cases/${id}/accuse`, { method: 'POST', body: { suspectId } });
export const getResult = (id) => request(`/cases/${id}/result`);
