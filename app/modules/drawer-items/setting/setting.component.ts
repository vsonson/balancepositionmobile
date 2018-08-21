import { Component, ViewContainerRef, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, ViewEncapsulation, OnDestroy } from "@angular/core";
import { Page } from "ui/page";
import * as dialogs from "ui/dialogs";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer, SideDrawerLocation } from 'nativescript-ui-sidedrawer';
import { ModalComponent } from "../modal/modal.component";
import { DeactivateModalComponent } from "../deactivateModal/deactivateModal.component";
import { DeactivateAccountModalComponent } from "../deactivateAccountModal/deactivateAccountModal.component";
import { DeactivateFormModalComponent } from "../deactivateFormModal/deactivateFormModal.component";
import { TimePickerComponent } from '../timepickerModal/timepicker.component';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import * as imagepicker from "nativescript-ssi-imagepicker";
import { Switch } from "ui/switch";
import { TimePicker } from "ui/time-picker";
import { UserService } from "../../auth/shared/user/user.service";
import { SharedService } from '../../../common/services/services-index';
import { User } from "../../auth/shared/user/user";
import { Loader } from '../../../common/components/loader/loader.service';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { constants } from '../../../common/constants/messages';
import { confirm } from "ui/dialogs";
import { Navigation } from './../../../common/services/common.service';
import { DrawerHttpService } from './../drawer-http-service';
import { alert } from "ui/dialogs";
import { GC } from "utils/utils";

import { RouterExtensions } from 'nativescript-angular/router';
@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.None,
    selector: "app-dashboard",
    templateUrl: './setting.component.html',
    providers: [UserService, SharedService],
    styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit, AfterViewInit, OnDestroy {

    public edit: boolean = true;
    public isNameEdit: boolean = false;
    public alertName: boolean = false;
    public alertPhone: boolean = false;
    public isAddEmail: boolean = false;
    public alertEmail: boolean = false;
    public scheck: boolean;
    public fcheck: boolean;
    public emailAdded: boolean = false;
    public name: string;
    imageAssets = [];
    imageSrc: any;
    isSingleMode: boolean = true;
    thumbSize: number = 80;
    previewSize: number = 30;
    public currentTrackTime: string;
    public currentPracticeTime: string;
    public isPhoneEdit: boolean = false;
    public isPasswordEdit
    public phone: string;
    public email: string;
    public userInfoJson: any;
    public phoneReg: any
    user: User;
    constantsMessage: any = constants;
    public profileImgB64:string;





    constructor(private userService: UserService,
        private router: RouterExtensions,
        page: Page, private modalDialogService: ModalDialogService, private navigation: Navigation,
        private viewContainerRef: ViewContainerRef, private loader: Loader, private sharedService: SharedService, private httpService: DrawerHttpService) {
        this.user = new User();
        page.actionBarHidden = true;
        this.name = "Kara Stroupl";
        this.imageSrc = "res://profile_grey";
        this.phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        let nameReg = /^[a-zA-Z]+$/;


        this.currentTrackTime = new Date().toLocaleTimeString().substr(0, 5);
        this.currentPracticeTime = new Date().toLocaleTimeString().substr(0, 5)
        this.getUserInfo();

    }

    ngOnInit() {
        GC();
        // this.updateUser();

    }

    ngOnDestroy() {
        GC();
    }

    ngAfterViewInit() {
        this.loader.hide();
    }

    back() {
        this.router.back();
    }
    editname() {

        this.isNameEdit = true;
        this.edit = false;
        console.log(this.edit);
    }

    changeName() {

        if (!!this.name) {
            this.alertName = true;
        }
        else if (!(this.name.match(/^[a-zA-Z\s]*$/))) {
            this.alertName = true;
        }
        else {
            this.alertName = false;
            this.isNameEdit = false;
            this.edit = true;
            this.updateUser();
        }

    }

    editphone() {
        this.isPhoneEdit = true;
    }

    changephone() {
        if (this.phone == null || !this.phoneReg.test(this.phone)) {
            this.alertPhone = true;
            return false
        }
        else {
            this.alertPhone = false;
            this.isPhoneEdit = false;
            this.updateUser();
            
        }
    }

    clearName() {
        this.name =null;
    }

    addemail() {
        this.isAddEmail = true;
    }
    changeEmail() {
        if (this.email == '') {
            this.alertEmail = true;
        }
        else if (this.email == ' ') {
            this.alertEmail = true;
        }
        else if (!(this.email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))) {
            this.alertEmail = true;

        }
        else {
            this.updateUser();
            this.alertEmail = false;
            this.isAddEmail = false;
            this.emailAdded = true;
        }
    }

    clearEmail() {
        this.email = "";
    }

    clearPhone() {
        this.phone = null;
    }

    public onFirstChecked(args) {
        let firstSwitch = <Switch>args.object;
        if (firstSwitch.checked) {
            this.fcheck = true;
            this.currentTrackTime = new Date().toLocaleTimeString().substr(0, 5);
        } else {
            this.fcheck = false;
        }
    }

    public onSecondChecked(args) {
        let secondSwitch = <Switch>args.object;
        if (secondSwitch.checked) {
            this.scheck = true;
            this.currentPracticeTime = new Date().toLocaleTimeString().substr(0, 5);
        } else {
            this.scheck = false;
        }
    }


    openModal() {
        let options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: { data: this.user }
        };

        this.modalDialogService.showModal(ModalComponent, options).then(() => {
            this.getUserInfo()
        });
    }

    openDeactivateAccountModal() {
        let options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: { data: 'something' }
        };

        this.modalDialogService.showModal(DeactivateAccountModalComponent, options).then((result) => {

            this.openDeactivateModal();
        });
    }

    openDeactivateFormModal() {

        let options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: { data: 'something' }
        };

        this.modalDialogService.showModal(DeactivateFormModalComponent, options).then(() => {

        });
    }

    openDeactivateModal() {
        let options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: { data: 'something' }
        };

        this.modalDialogService.showModal(DeactivateModalComponent, options).then((result) => {

            this.openDeactivateFormModal();
        });
    }

    public onSelectSingleTap() {
        this.isSingleMode = true;

        let context = imagepicker.create({
            mode: "single"
        });
        this.startSelection(context);
    }

    private startSelection(context) {
        let that = this;

        context
            .authorize()
            .then(() => {
                that.imageAssets = [];
                that.imageSrc = null;
                return context.present();
            })
            .then((selection) => {

                that.imageSrc = that.isSingleMode && selection.length > 0 ? selection[0] : null;
                console.log("that.imageSrc", that.imageSrc);
                // set the images to be loaded from the assets with optimal sizes (optimize memory usage)
                selection.forEach(function (element) {
                    element.options.width = that.isSingleMode ? that.previewSize : that.thumbSize;
                    element.options.height = that.isSingleMode ? that.previewSize : that.thumbSize;
                });

                that.imageAssets = selection; selection.forEach(function (element) {
                    element.options.width = that.isSingleMode ? that.previewSize : that.thumbSize;
                    element.options.height = that.isSingleMode ? that.previewSize : that.thumbSize;
                });

                that.imageAssets = selection;
                this.updateUser();
            }).catch(function (e) {
                console.log(e);
            });
    }

    showTimePicker(type, remindeType) {
        console.log('showpicker is calling');
        let dataTime = (type == 'Track' ? this.currentTrackTime : this.currentPracticeTime)
        let options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: { data: dataTime, reminderLabel: remindeType }
        };
        this.modalDialogService.showModal(TimePickerComponent, options).then((res) => {
            if (res.status == "new") {
                if (type == 'Track') {
                    this.currentTrackTime = new Date(res.selTime).toLocaleTimeString().substr(0, 5);
                }
                else {
                    this.currentPracticeTime = new Date(res.selTime).toLocaleTimeString().substr(0, 5);
                }
            }
            else {
                if (type == 'Track') {
                    this.currentTrackTime = res.selTime
                }
                else {
                    this.currentPracticeTime = res.selTime
                }
            }
        });
    }

    getUserInfo() {
        this.loader.show('Loading...');
        this.userService.getUserInfo("13")
            .subscribe((res) => {
                this.loader.hide();
                console.log("Get User Info", JSON.stringify(res));
                if (!!res) {
                    this.userInfoJson = res;
                    this.user.primarySport = res.primarySport;
                    this.user.country = res.country;
                    this.user.state = res.state;
                    this.user.gender = res.gender;
                    this.user.dateOfBirth = res.dateOfBirth;
                    this.user.educationLevel = res.educationLevel;
                    this.user.phone = res.phone;
                    this.sharedService.setUserInfo(this.user);
                }
            }, (err) => {
                this.loader.hide();
                console.log("err")
            })

    }

    updateUser() {
        this.profileImgB64 = this.imageSrc.toBase64String('png');
        console.log("BASE64 image",this.profileImgB64);
        this.httpService.updateUserInfo(this.email, this.name, this.profileImgB64,"BASE64", this.phone)
            .subscribe((data) => {
                console.log("Update User Info Success", JSON.stringify(data));
                let options = {
                    title: "Success",
                    message: "Updated",
                    okButtonText: "OK"
                };
                alert(options).then(() => {
                    console.log(" chosen!");
                });
            }, (err) => {
                console.log("Error", JSON.stringify(err));
                let options = {
                    title: "Error",
                    message: "Error",
                    okButtonText: "OK"
                };
                alert(options).then(() => {
                    console.log(" chosen!");
                });
            })
    }
    doGC(): void {
        GC();
    }
}

