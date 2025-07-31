import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { API_KEY, APP_TYPE, BASE_URL } from "./AppConstants";
import DeviceInfo from "react-native-device-info";

class AxiosInstanceReference {
    private axiosInstance: AxiosInstance
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: BASE_URL,
            // headers: {
            //     'Content-Type': 'application/json',
            //     'api-key': API_KEY,
            //     'app-type': APP_TYPE
            // }
        })
        this.setupInterceptors()
    }
    private async setupInterceptors() {
        this.axiosInstance.interceptors.request.use(
            async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
                // if(config.url != "device/register"){
                //     const authInstance = getAuth();
                //     const getCurrentUser = await new Promise<string | null>((resolve) => {
                //         const unsubscribe = onAuthStateChanged(authInstance, (user) => {
                //             if (user) {
                //                 user.getIdToken().then(resolve).catch(() => resolve(null));
                //             } else {
                //                 resolve(null);
                //             }
                //             unsubscribe();
                //         });
                //     });
                //     if (getCurrentUser) {
                //         try {
                //             //const idToken = await getCurrentUser.getIdToken()
                //             config.headers['Authorization'] = getCurrentUser
                //         } catch (error:any) {
                //             console.log('Firebase Error' + error)
                //             throw error;
                //         }
                //     }
                // }
                const deviceId = await DeviceInfo.getDeviceId();
                if (deviceId) {
                    config.data = {
                        deviceId: deviceId
                    };
                }
                console.log(`Request - Endpoint: ${config.baseURL + "" + config.url}, Headers: ${JSON.stringify(config.headers)}, Parameters: ${JSON.stringify(config.data)}`);
                return config
            }
        )
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                console.log(`Response - Endpoint: ${response.config.url}, Response: ${JSON.stringify(response.data)}, \n\n`);
                return response
            },
            (error: any) => {
                console.log(`Response - - Endpoint: ${error.config.url},FAILURE : ` + JSON.stringify(error.response) || error.message);
                return Promise.reject(error.response || error.message)
            }
        )
    }
    public getAxiosInstance(): AxiosInstance {
        return this.axiosInstance
    }
}

const axiosInstance = new AxiosInstanceReference().getAxiosInstance();
export { axiosInstance }