import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, ViewEncapsulation } from "@angular/core";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer, SideDrawerLocation } from 'nativescript-ui-sidedrawer';
import { GC } from "utils/utils";
import { Navigation } from './../../../common/services/common.service';

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.None,
    selector: "app-dashboard",
    templateUrl: './notification.component.html'
})
export class NotificationComponent  {

    constructor(
            page: Page,
            private navigation: Navigation
        ) {
        page.actionBarHidden = true;
    }

    goBack() {
        this.navigation.back();
    }
    doGC(): void {
    GC();

  }

}