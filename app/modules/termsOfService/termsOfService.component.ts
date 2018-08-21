import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, ViewEncapsulation } from "@angular/core";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer, SideDrawerLocation } from 'nativescript-ui-sidedrawer';
import { Location } from '@angular/common';
import { GC } from "utils/utils";

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.None,
    selector: "app-dashboard",
    templateUrl: './termsOfService.component.html'
})
export class TermsOfServiceComponent  {

    constructor(
            page: Page, private _location:Location
        ) {
        page.actionBarHidden = true;
    }

    public goBack() {
        this._location.back();
    }
    doGC(): void {
    GC();
  }
}