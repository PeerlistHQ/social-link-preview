import axios from 'axios';

export const updateUser = (data) => {
	const path = `api/v1/user/update`;
	return axios.post(path, data);
};
