// >> sidedrawer-getting-started-angular
import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "ui/page";

class BottomBarItems {
    name: string;
    link: string;
    icon: string;
    constructor(name, link, icon) {
        this.name = name;
        this.link = link;
        this.icon = icon;
    }
}


@Component({
    moduleId: module.id,
    selector: "bottom-tab",
    templateUrl: 'bottom-tab.component.html'
})
export class BottomTabComponent {

    items: Array<BottomBarItems> = [];

    constructor() {
        console.log('dashboard componet');
        this.items.push(new BottomBarItems("DashBoard", "/home/dashboard", 'res://dash_grey'));
        this.items.push(new BottomBarItems("Practice", "/home/practice", 'res://mindfullness_grey'));
        this.items.push(new BottomBarItems("Notebook", "/home/notebook", 'res://makenote_grey'));
        this.items.push(new BottomBarItems("myNetWork", "/datapoints/network", 'res://mynet_grey'));
        console.log("bottom bar", this.items)
    }
}
// << sidedrawer-getting-started-angular
