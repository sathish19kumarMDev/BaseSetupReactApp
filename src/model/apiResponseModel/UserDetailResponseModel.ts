export class UserInfoModel {
  constructor(
    public id: string = '',
    public firstName: string = '',
    public lastName: string = '',
    public email: string = '',
    public dateOfBirth: string = '',
    public phoneNo: string = '',
    public phoneExt: string = '',
    public zipCode: string = '',
    public latitude: number = 0,
    public longitude: number = 0,
    public country: string = '',
    public countryCode: string = '',
    public address: Address = new Address(),
    public image: string = '',
    public customerId: string = ''
  ) { }
}

export class Address {
  constructor(
    public postalCode: string = '',
    public city: string = '',
    public state: string = '',
    public countryCode: string = '',
    public fullAddress: string = '',
    public country: string = '',
    public addrOne: string = '',
    public addrTwo: string = ''
  ) { }
}