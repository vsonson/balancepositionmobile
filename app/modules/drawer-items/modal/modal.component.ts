import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page } from 'ui/page';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { ListPicker } from "ui/list-picker";
import { topmost } from "ui/frame";
import { SwipeGestureEventData } from "ui/gestures";
import * as dockModule from "tns-core-modules/ui/layouts/dock-layout";
import { FlexboxLayout } from 'ui/layouts/flexbox-layout';
import { AnimationCurve } from 'ui/enums';
import { AnimationDefinition, Animation } from 'ui/animation';
import { User } from "../../auth/shared/user/user";
import { UserService } from "../../auth/shared/user/user.service"
import { Http } from '@angular/http';
import { Headers, Response } from "@angular/http";
import { SharedService } from '../../../common/services/services-index';
import { Loader } from '../../../common/components/loader/loader.service';
import { countries_states } from '../../auth/shared/country_states'
import { constants } from '../../../common/constants/messages';
import { confirm } from "ui/dialogs";
import { GC } from "utils/utils";

//import * as _ from 'lodash';

let http = require("tns-core-modules/http");


let view: FlexboxLayout;



var enums = require("ui/enums");


let sportList = ["N/A", "Baseball", "Softball", "Basketball", "Football", "Wrestling", "Lacrosse", "Golf", "Cross Country",
  "Track and Field", "Gymnastics", "Swim and Dive", "Volleyball", "Tennis", "Field Hockey", "Soccer", "Ice Hockey",
  "Fencing"];
let educationList = ["N/A", "High school", "College", "Graduate"];
let yearList = []//["N/A","1990", "1991", "1992"];
let genderList = ["N/A", "Male", "Female", "Non-binary"];
let countryList = [];//["N/A","USA", "Paraguay", "Uruguay"];
let stateList = [];//["N/A", "PA", "DE"];
let slides = [1, 2, 3];
let isClassVisible = false;




@Component({
  moduleId: module.id,
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  providers: [UserService, SharedService],
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  public sportList: Array<string>;
  public educationList: Array<string>;
  public yearList: Array<string>;
  public genderList: Array<string>;
  public countryList: Array<string>;
  public stateList: any;
  public picked: string;
  public slide: any = 0;
  public slide2: boolean = false;
  public slide3: boolean = false;
  public selectedIndex = 0;
  public direction: number;
  public SWIPE_ACTION: any = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  public swipeDirection = 2;
  public userInfoJson: Array<any>;
  public paramsFrom: any;
  public userInfo: any;
  public sportIndex: any = 0;
  public eduIndex: any = 0;
  public genderIndex: any = 0;
  public countryIndex: any = 0;
  public stateIndex: any = 0;
  public dobIndex: any = 0;
  //public propIndex: any;

  user: User;
  constantsMessage: any = constants;


  constructor(private userService: UserService, private sharedService: SharedService, private http: Http, private modalDialogParams: ModalDialogParams, private loader: Loader) {
    this.user = new User();
    console.log("inside constructor");
    console.log(this.modalDialogParams.context.data);
    this.userInfo = this.modalDialogParams.context.data;
    //this.user.primarySport = this.userInfo.primarySport
    this.user = this.userInfo
    this.sportList = [];
    this.educationList = [];
    this.yearList = [];
    this.genderList = [];
    this.countryList = [];
    this.stateList = [];
    this.userInfoJson = [];
    // this.getUserInfo();
    //console.log(params.data);
    for (let i = 0; i < sportList.length; i++) {
      this.sportList.push(sportList[i]);
    }
    for (let i = 0; i < educationList.length; i++) {
      this.educationList.push(educationList[i]);
    }
    for (let i = 1980; i < 2019; i++) {
      this.yearList.push(i.toString());
    }
    for (let i = 0; i < genderList.length; i++) {
      this.genderList.push(genderList[i]);
    }
    for (let i = 0; i < countries_states.length; i++) {
      this.countryList.push(countries_states[i].name);
    }
    // for (let i = 0; i < stateList.length; i++) {
    //   this.stateList.push(stateList[i]);
    // }

  }



  close() {
    this.modalDialogParams.closeCallback();
  }
  public selectedIndexChanged(args, userInfoparam) {
    let picker = <ListPicker>args.object;
    console.log(args.object);


    this.picked = this.sportList[picker.selectedIndex];
    this.selectedIndex = picker.selectedIndex;
    if (userInfoparam == '1') {
      this.user.primarySport = this.sportList[this.selectedIndex];
    } else if (userInfoparam == '2') {
      this.user.educationLevel = this.educationList[this.selectedIndex];


    } else if (userInfoparam == '3') {
      this.user.dateOfBirth = this.yearList[this.selectedIndex];


    }
    else if (userInfoparam == '4') {
      this.user.gender = this.genderList[this.selectedIndex];


    }
    else if (userInfoparam == '5') {
      this.user.country = this.countryList[this.selectedIndex];
      let stateObj = countries_states[this.selectedIndex].states;
      this.stateList = [];
      for (let i = 0; i < stateObj.length; i++) {
        this.stateList.push(stateObj[i].name);
      }


    }
    else if (userInfoparam == '6') {
      this.user.state = this.stateList[this.selectedIndex];

      // this.userInfoJson.push({'state':this.stateList[this.selectedIndex]});
    }
    console.log(JSON.stringify(this.user));
  }
  onTap() {


  }
  onSwipe(args: SwipeGestureEventData, currentIndex) {
    this.swipeDirection = args.direction;
    let isClassVisible = true;
    let nextIndex = 0;
    let grid = <FlexboxLayout>args.object;
    let slideAnim = 'slide' + currentIndex + 2;
    if ((args.direction === 1) && (currentIndex != 0)) {
      nextIndex = currentIndex - 1;
    } else if ((args.direction === 2) && (currentIndex < 2)) {
      nextIndex = currentIndex + 1;
    } else if (currentIndex == 2) {
      nextIndex = 2;
    }
    else if (currentIndex == 0) {
      nextIndex = 0;
    }
    this.slide = nextIndex;


  }

  storeUserInfo() {
    console.log("done calling");
    let userInfo = this.sharedService.getUserInfo(this.user);
    //this.user.username=userInfo.username;
    //this.user.password=userInfo.password;
    if (this.user) {
      this.loader.show('Loading...');
      this.userService.userInfo(this.user).subscribe((data) => {
        // this.loader.hide();
        this.modalDialogParams.closeCallback();
        let userinfoSuccessAlert = {
          title: this.constantsMessage.alert,
          message: this.constantsMessage.userinfoSuccess,
          okButtonText: this.constantsMessage.ok
        };

        confirm(userinfoSuccessAlert).then((result: boolean) => {
          //this.router.navigate(["/auth/signin"]);
        });

      }, (err) => {
        // this.loader.hide();
        console.log("err")
      })
    }
    //       if(this.paramsFrom == "SignUP") {

    //         this.userService.login(this.user).subscribe((data) => {
    //           // store token inside localstorage
    //           this.sharedService.setToken(data);

    //         }, error => {
    //           //this.alertService.error(this.errorMessage.badCredentials, true);
    //         });
    //       }
    //   }, error => {

    //   });
    // }
  }

  ngOnInit() {
    GC();
    for (var i = 0; i < this.sportList.length; i++) {
      if (this.userInfo["primarySport"] == this.sportList[i]) {
        this.sportIndex = i;
      }
    }

    for (var i = 0; i < this.educationList.length; i++) {
      if (this.userInfo["educationLevel"] == this.educationList[i]) {
        this.eduIndex = i;
      }
    }

    for (var i = 0; i < this.genderList.length; i++) {
      if (this.userInfo["gender"] == this.genderList[i]) {
        this.genderIndex = i;
      }
    }

    for (var i = 0; i < this.yearList.length; i++) {
      if (this.userInfo["dateOfBirth"] == this.yearList[i]) {
        this.eduIndex = i;
      }
    }

    for (var i = 0; i < this.countryList.length; i++) {
      if (this.userInfo["country"] == this.countryList[i]) {
        this.countryIndex = i;
      }
    }

    for (var i = 0; i < this.stateList.length; i++) {
      if (this.userInfo["state"] == this.stateList[i]) {
        this.stateIndex = i;
      }
    }
    // this.setIndex(this.userInfo, 'primarySport', 'sportIndex');
    // this.setIndex(this.userInfo, 'educationLevel', 'eduIndex');
    // this.setIndex(this.userInfo, 'gender', 'genderIndex');
    // this.setIndex(this.userInfo, 'country', 'countryIndex');
    // this.setIndex(this.userInfo, 'state', 'stateIndex');
    //this.setIndex(this.userInfo, 'primarySport', this.genderIndex);

  }

  ngOnDestroy() {
    GC();
  }


  // setIndex(list, propName, propIndex) {
  //   for(var i=0;i < list.length; i++) {
  //     if(this.userInfo[propName] == list[i] && ) {
  //       this[propIndex] = i;
  //     }
  //   }
  // } 

}