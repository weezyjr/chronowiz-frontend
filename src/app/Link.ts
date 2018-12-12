export class Link {
  name: string;
  url: string;
  activated?: Boolean;
  constructor(name: string, url: string, activated?: Boolean) {
    this.name = name;
    this.url = url;
    if (activated) {
      this.activated = true;
    }
    else{
      this.activated = false;
    }
  }
}
