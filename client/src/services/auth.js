export const isAuthenticated = () => {
  const token = localStorage.getItem('adminToken');
  return !!token;
};

export const logout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminInfo');
  window.location.href = '/admin/login';
};

export const getAdminInfo = () => {
  const info = localStorage.getItem('adminInfo');
  return info ? JSON.parse(info) : null;
};