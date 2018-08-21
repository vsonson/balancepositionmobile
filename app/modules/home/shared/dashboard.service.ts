import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { SharedService } from './../../../common/services/services-index';

@Injectable()
export class DashboardService {
  constructor(private http: Http, private sharedService: SharedService) {}
  
  authHeader: any = this.sharedService.getAuthHeader();
  API_URL: string = this.sharedService.getAPIUrl();

  dataPoint() {
    return this.http.get( this.API_URL + "/data-points", this.authHeader
    )
    .map((res: Response) => res.json())
    .catch(this.handleErrors);
  }

  quoteOfTheDay() {
    console.log("Service Hi quote");
    return this.http.get( this.API_URL + "/quote-of-the-days/current", this.authHeader)
    .map((res: Response) => res.json())
    .catch(this.handleErrors);
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }

}