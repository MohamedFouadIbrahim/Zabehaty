import axios from 'axios';

const isTestingMode = true

// Create axios client, pre-configured with baseURL
const APIKit = axios.create({
	baseURL: isTestingMode ? 'https://v3-testing.zabe7ti.website/api/': 'https://v3.zabe7ti.website/public/api/',
	timeout: 15000
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = token => {
	APIKit.defaults.headers.common['Authorization'] = `Bearer ${token}`
	APIKit.defaults.headers.common['Version'] = `1`
	APIKit.defaults.headers.common['App-Version'] = `1`

	/*APIKit.interceptors.request.use(function(config) {
		config.headers.Authorization = `Bearer ${token}`;
		return config;
	});*/
};
export const setAppLanguage = language => {
	APIKit.defaults.headers.common['lang'] = `${language}`
	/*APIKit.interceptors.request.use(function(config) {
		config.headers.Language = `${language}`;
		return config;
	});*/
};

export const setBranchId = (branchId) => {
	APIKit.defaults.headers.common['branch-id'] = branchId;
}

export const removeBranchId = () =>{
	APIKit.defaults.headers.common['branch-id'] = undefined;
}

export default APIKit;
