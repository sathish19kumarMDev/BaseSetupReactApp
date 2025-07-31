import { inject, injectable } from "inversify"
import { makeAutoObservable, flow } from "mobx"
import ApiService from "../model/apiBase/ApiService"
import * as Parameters from "../model/apiBase/Parameters"
import TYPES from "../dependancyInjector/types"
import { ProductListResponseModel } from "../model/apiResponseModel/ProductListResponseModel"

@injectable()
class HomeVM {
    private apiService: ApiService
    response: Parameters.ApiResponse<any> = new Parameters.ApiResponse<any>()
    isLoading = false
    productList: ProductListResponseModel[] = []
    search = ""

    constructor(@inject(TYPES.TApiService) apiService: ApiService) {
        this.apiService = apiService
        makeAutoObservable(this, {}, { autoBind: true })
    }

    // 🔄 API call method
    async callApi(params: string): Promise<void> {
        try {
            this.setIsLoding(true)
            const param: Parameters.ApiParameters = { id: "" }
            const response = await this.apiService.apiCallFromService()
            if (response.success) {
                this.setProductList(response.data)
            }
            console.log("PRINT_THE_RESPONSE HomeVM response : ", JSON.stringify(response))
        } catch (e: any) {
            console.log("PRINT_THE_ERROR HomeVM : ", e.message)
        } finally {
            this.setIsLoding(false)
        }
    }


    // 🔧 Setters
    setIsLoding(isLoading: boolean) {
        this.isLoading = isLoading
    }

    setProductList(productList: ProductListResponseModel[]) {
        this.productList = productList
        console.log("PRINT_THE_RESPONSE HomeVM productList : ", JSON.stringify(this.productList))
    }

    setSearch(value: string) {
        this.search = value
    }

    // 🔍 Computed: filtered list based on search input
    get filteredProductList(): ProductListResponseModel[] {
        return this.productList.filter(product =>
            product.name.toLowerCase().includes(this.search.toLowerCase())
        )
    }
}

export default HomeVM
