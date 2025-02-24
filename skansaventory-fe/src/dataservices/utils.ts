export const getBaseUrl = () => {
	return import.meta.env.VITE_API_URL;
};

export const getAccessToken = (): string | null => {
    return localStorage.getItem('token');
};

export const getRefreshToken = (): string | null => {
    return localStorage.getItem('refreshToken');
}

export const headersDefault = {
	'Content-Type': 'application/json',
	Authorization: `Bearer ${getAccessToken()}`,
};

export const headersPdf = {
	'Content-Type': 'application/pdf',
	Authorization: `Bearer ${getAccessToken()}`,
};

export const headersExcel = {
	'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	Authorization: `Bearer ${getAccessToken()}`,
};

export const headersMultipart = {
	'Content-Type': 'multipart/application',
	Authorization: `Bearer ${getAccessToken()}`,
};