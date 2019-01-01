export class User
{
  _id?: number;
  email: string;
  password: string;
  jwt?: string;

  constructor(){
    this.email = '';
    this.password = '';
  }

}
