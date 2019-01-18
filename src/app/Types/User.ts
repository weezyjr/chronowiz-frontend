export class User
{
  _id?: string;
  email: string;
  password: string;
  jwt?: string;

  constructor(){
    this.email = '';
    this.password = '';
  }

}
