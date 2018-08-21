import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrls  } from './../../common/constants/api-urls';
import { SharedService } from './../../common/services/shared.service';

@Injectable()
export class DrawerHttpService {
	private headers: any;
	constructor(
					private http: HttpClient,
					private sharedService: SharedService
		) { 
				this.headers = sharedService.getHttpHeaders();
		}

	
updateUserInfo(email:string,firstName:string,profilePic:string,profilePicContentType:string,phone:string)
{
	let data = {
			email,firstName,profilePic,profilePicContentType,phone
		};

		console.log("url : ",  apiUrls.host + apiUrls.urls.userInfoResourcePut.updateUserInfo, JSON.stringify(data), JSON.stringify(this.headers.headers));
		
	return this.http.post(apiUrls.host + apiUrls.urls.userInfoResourcePut.updateUserInfo, data,  this.headers);
}

}