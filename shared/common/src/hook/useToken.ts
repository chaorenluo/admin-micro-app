import { $localstorage } from "@shared/common";

// 获取 admin token
const getAdminToken = () => {
  const token = $localstorage.get('admin_token');
  if (!token) {
    return '';
  }
  return token;
};

export const useToken = () => ({
  getAdminToken
});
