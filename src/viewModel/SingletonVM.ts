import { flow, makeAutoObservable } from "mobx";
import ApiService from "../model/apiBase/ApiService";
import { inject, injectable } from "inversify";
import TYPES from "../dependancyInjector/types";



@injectable()
class SingletonVM {
    private apiService : ApiService;

    constructor(@inject (TYPES.TApiService) apiService : ApiService){
        this.apiService = apiService
        makeAutoObservable(this,{

        })
    }

    callApi = flow(async function* (this : SingletonVM, params:string){
        try {
            
        }catch(e : any){
            console.log("PRINT_THE_ERROR SingletonVM : ",e.message);  
        }
        
    })

}

export default SingletonVM;