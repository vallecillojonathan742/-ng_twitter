import { getLocaleDateFormat } from "@angular/common";

export class PostList {
  public $key: string = '';
  public user: string = '';
  public message: string = '';
  public createTweet: string = this.getLocaleDateFormat();

  getLocaleDateFormat() {
    var date = new Date();
      return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()  + ' ' + date.getHours() + ':' + date.getMinutes();
  }
}