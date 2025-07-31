import { inject, injectable } from "inversify";
import ApiService from "../model/apiBase/ApiService";
import { action, flow, makeAutoObservable, observable } from "mobx";
import * as Parameters from "../model/apiBase/Parameters"
import TYPES from "../dependancyInjector/types";
import { ProductListResponseModel } from "../model/apiResponseModel/ProductListResponseModel";

@injectable()
class HomeVM{
    private apiService : ApiService
    response: Parameters.ApiResponse<any> = new Parameters.ApiResponse<any>();
    isLoading = false
    productList: ProductListResponseModel[] = [];

    constructor(@inject(TYPES.TApiService) apiService : ApiService){
        this.apiService = apiService
        makeAutoObservable(this,{
            isLoading : observable,
            productList : observable,
            callApi:action,
            setIsLoding:action,
            setProductList:action
        })
    }

    callApi = flow(async function* (this : HomeVM,params: string){
        try {
            const param : Parameters.ApiParameters = {
                id : ""
            }
            this.setIsLoding(true)
            const response = await this.apiService.apiCallFromService()

            if(response.success){
              this.setProductList(response.data)
            }
            
            console.log("PRINT_THE_RESPONSE HomeVM response : ",JSON.stringify(response));
            
                this.setIsLoding(false)
            
        }catch(e : any){
            this.setIsLoding(false)
            console.log("PRINT_THE_ERROR HomeVM : ",e.message);  
        }    
    })

    setIsLoding(isLoading: boolean) {
        this.isLoading = isLoading
      }
    setProductList(productList: ProductListResponseModel[]) {
        this.productList = productList
        console.log("PRINT_THE_RESPONSE HomeVM productList : ",JSON.stringify(this.productList));
        
      }
}

export default HomeVM