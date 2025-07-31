import { AxiosResponse } from "axios";
import { injectable } from "inversify";
import * as Parameters from "./Parameters";
import { plainToClass } from "class-transformer";
import { axiosInstance } from "./AxiosInstance";
import { ProductListResponseModel } from "../apiResponseModel/ProductListResponseModel";

@injectable()
class ApiService{

    async apiCallFromService():Promise<Parameters.ApiResponse<any>>{
        return this.handleApiCall(()=> axiosInstance.get('productlist'),"apiPath",ProductListResponseModel,{})
    }

    private async handleApiCall<T>(apiCall: () => Promise<AxiosResponse>, path: string, transformTo?: new (...args: any[]) => T, extraData?: any): Promise<Parameters.ApiResponse<T>> {
        try {
          const response = await apiCall();

          console.log("PRINT_THE_RESPONSE ApiService response for service : ",response);
          
          if (response.status === 201 || response.status == 200) {
            let data = response.data;
            if (transformTo != undefined) {
              data = plainToClass(transformTo, data);
            }
            return { success: true, data, apiPath: path, extraData: extraData };
          } else {
            const errorMessage = response.data.message || 'Unknowns error 1';
            return { success: false, errorMessage: errorMessage, apiPath: path };
          }
        } catch (error: any) {
          const errorMessage = error.data.message || 'Unknowns error 2';
          return { success: false, errorMessage: errorMessage, apiPath: path };
        }
      }
}

export default ApiService