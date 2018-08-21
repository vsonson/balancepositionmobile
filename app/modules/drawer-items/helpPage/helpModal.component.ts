import { Component, OnInit, OnDestroy } from '@angular/core';
import { SwipeGestureEventData } from "ui/gestures";
import * as dockModule from "tns-core-modules/ui/layouts/dock-layout";
import { FlexboxLayout } from 'ui/layouts/flexbox-layout';
import { AnimationCurve } from 'ui/enums';
import { AnimationDefinition, Animation } from 'ui/animation';
import { ChangeDetectionStrategy } from "@angular/core";
import { Page } from "ui/page";

import { GC } from "utils/utils";





@Component({
    moduleId: module.id,
    selector: 'help-modal',
    templateUrl: './helpModal.component.html',
    styleUrls: ['./helpModal.component.scss']
})
export class HelpModalComponent implements OnInit, OnDestroy {


    public direction: number;

    public slide1: boolean = true;
    public slide2: boolean = false;
    public slide3: boolean = false;
    public slide4: boolean = false;





    constructor(page: Page) {

        page.actionBarHidden = true;

    }





    ngOnInit() {
        GC();
    }

    ngOnDestroy() {
        GC();
    }


    onSwipe(args: SwipeGestureEventData) {

        if (this.slide1) {
            this.direction = args.direction;
            this.slide1 = false;
            this.slide2 = true;
            this.slide3 = false;
            this.slide4 = false;

        } else if (this.slide2) {
            this.direction = args.direction;
            this.slide1 = false;
            this.slide2 = false;
            this.slide3 = true;
            this.slide4 = false;

        } else if (this.slide3) {
            this.direction = args.direction;
            this.slide1 = false;
            this.slide2 = false;
            this.slide3 = false;
            this.slide4 = true;

        }
        else if (this.slide4) {
            this.direction = args.direction;
            this.slide1 = true;
            this.slide2 = false;
            this.slide3 = false;
            this.slide4 = false;

        }


    }
    public onItemTap(args) {
        console.log("Item Tapped at cell index: " + args.index);
    }

    doGC(): void {
        GC();

    }
}









