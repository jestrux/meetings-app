const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const get = (endpoint) => {
	return request({
		method: "GET",
		endpoint,
	});
};

export const post = (endpoint, data) => {
	return request({
		method: "POST",
		endpoint,
		data,
	});
};

export const remove = (endpoint) => {
	return request({
		method: "DELETE",
		endpoint,
	});
};

export const request = ({ method = "GET", endpoint = "", data }) => {
	const requestProperties = {
		method,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			// Authorization: "Bearer " + localStorage.getItem("authUser").token,
		},
	};

	if (data) {
		requestProperties.body = JSON.stringify(data);
	}

	return fetch(BASE_URL + endpoint, requestProperties).then((res) =>
		res.json()
	);
};
