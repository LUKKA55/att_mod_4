import axios, { AxiosError } from 'axios';

class Api {
	init() {
		this.setBaseUrl();
	}
	setBaseUrl = () => {
		return axios.create({ baseURL: 'https://api-mod-5.onrender.com' });
	};

	async doPost(url: string, body: object) {
		try {
			const response = await this.setBaseUrl().post(url, body);
			if (response.status === 200) {
				console.log('doPost', response.data);
				return response.data;
			}
			console.log('doPost', response.data);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				return error.response;
			}
		}
	}

	async doGet(url: string) {
		try {
			const response = await this.setBaseUrl().get(url);
			if (response.status === 200) {
				console.log('doGet', response.data);

				return response.data;
			}
			return 'error';
		} catch (error) {
			if (error instanceof AxiosError) {
				return error.response;
			}
		}
	}
	async doPut(url: string, body: object) {
		try {
			const response = await this.setBaseUrl().put(url, body);
			if (response.status === 200) {
				console.log('doPut', response.data);

				return response.data;
			}
			return 'error';
		} catch (error) {
			if (error instanceof AxiosError) {
				return error.response;
			}
		}
	}
	async doDelete(url: string) {
		try {
			const response = await this.setBaseUrl().delete(url);
			if (response.status === 200) {
				console.log('doDel', response.data);

				return response.data;
			}
			return 'error';
		} catch (error) {
			if (error instanceof AxiosError) {
				return error.response;
			}
		}
	}

	messageApi(msg: string) {
		return msg;
	}
}

const apiService = new Api();
export default apiService;
