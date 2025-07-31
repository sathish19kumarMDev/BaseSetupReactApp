
export interface ApiParameters {
    id : string
}

export class ApiResponse<T> {
success: boolean;
data?: T;
errorMessage?: string;
apiPath?: string;
extraData?: any

constructor(success: boolean = false, data?: T, errorMessage?: string, apiPath?: string, extraData?: any) {
  this.success = success;
  this.data = data;
  this.errorMessage = errorMessage;
  this.apiPath = apiPath;
  this.extraData = extraData;
}
}