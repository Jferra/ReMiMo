import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import {Config} from "./config";
import {Observable} from "rxjs";

@Injectable()
export class RandomImageService {

  constructor(private http:Http) {}

  getImage(): Observable<string>{
    return this.http.get(Config.giphyApiUrl)
      .map(this.extractData)
      .map( (data:any) => data.image_original_url)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
