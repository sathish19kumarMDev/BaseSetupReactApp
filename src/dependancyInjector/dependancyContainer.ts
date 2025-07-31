import { Container } from "inversify";
import ApiService from "../model/apiBase/ApiService";
import HomeVM from "../viewModel/HomeVM";
import TYPES from "./types";


const dependancyContainer = new Container();

dependancyContainer.bind<ApiService>(TYPES.TApiService).to(ApiService);
dependancyContainer.bind<HomeVM>(TYPES.THomeVM).to(HomeVM);

export { dependancyContainer }