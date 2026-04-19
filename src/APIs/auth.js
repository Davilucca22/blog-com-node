// src/APIs/auth.js
export const getToken = () => localStorage.getItem('token');

export const getAuthHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const logout = () => {
    localStorage.removeItem('token');
};