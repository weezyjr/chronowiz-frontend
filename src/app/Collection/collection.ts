export class Collection
{
  public _id?: string;

  public brandObject: string;
  public name: string;

  constructor(private isTestCollection?: boolean)
  {
    if (!isTestCollection)
    {

    }
    else if (isTestCollection)
    {
      this.brandObject = '5bf1b61d90039c2e2a89ffbf';
      this.name = 'Day-Date';
    }
  }
}
