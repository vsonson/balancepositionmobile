import { Component, OnInit, NgZone, OnDestroy, ViewEncapsulation } from '@angular/core';
import { SwipeGestureEventData } from "ui/gestures";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";
import { DataService, PlayBookList, playBookData } from './data.service';
import { Loader, LoaderScope } from './../../common/components/loader/loader.service'
import { GC } from "utils/utils";

@Component({
  moduleId: module.id,
  selector: 'app-myplaybook',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './myplaybook.component.html',
  styleUrls: ['./myplaybook.component.css'],
  providers: [DataService]
})

export class MyplaybookComponent implements OnInit, OnDestroy {
  playbookList: PlayBookList[];
  swipeLayoutIndex: number = 0;
  swipeLayoutDirection: number = -1;
  init: boolean = false;

  constructor(
    private routerExtensions: RouterExtensions,
    page: Page,
    private zone: NgZone,
    private _dataService: DataService,
    private loader: Loader,
    public loaderScope: LoaderScope
  ) {
    page.actionBarHidden = true;

  }

  ngOnInit() {
    GC();
    this.initList();
    this.loader.show("loading");
    console.log(this.routerExtensions.router.url)
  }

  ngOnDestroy() {
    GC();

  }


  goBack() {
    this.routerExtensions.navigate(['/home/dashboard']);
  }

  getList() {
    return [
      { name: "My Mood", type: "General", order: 2, color: "red", img: "res://mood_grey", routerPath: "/myplaybook/mood" },
      { name: "My Sleep", type: "General", order: 2, color: "red", img: "res://sleep_grey", routerPath: "/myplaybook/sleep" },
      { name: "My Stress", type: "General", order: 2, color: "red", img: "res://stress_grey", routerPath: '/myplaybook/stress' },
      { name: "My Energy", type: "General", order: 2, color: "red", img: "res://energy_grey", routerPath: '/myplaybook/energy' },
      { name: "My Performance", type: "General", order: 2, color: "red", img: "res://performance_grey", routerPath: '/myplaybook/performance' },
      { name: "My Focus", type: "General", order: 2, color: "red", img: "res://focus_grey", routerPath: '/myplaybook/focus' },
      { name: "My Body", type: "General", order: 2, color: "red", img: "res://body_grey", routerPath: '/myplaybook/body' },
      { name: "My Interest", type: "Optional", order: 2, color: "red", img: "res://interest_grey", routerPath: '/myplaybook/interest' },
      { name: "My Injury", type: "Optional", order: 2, color: "red", img: "res://injury_grey", routerPath: '/myplaybook/injury' }
    ];
  }

  initList() {
    this.playbookList = this.getList();
    setTimeout(() => {
      this.init = true;
      playBookData.data = this.getList();
      this.loader.hide();
      this.updateCurrentRouter();
    }, 0)
  }

  updateCurrentRouter() {
    let url = this.routerExtensions.router.url;
    let index = -1;
    if (url !== '/myplaybook') {
      this.playbookList.forEach((item: PlayBookList) => {
        index += 1;
        if (item.routerPath == url) {
          this.swipeLayoutIndex = index;
          return;
        }
      })
    }
  }

  onSwipe(args: SwipeGestureEventData) {
    if (args.direction == 2 || args.direction == 1) {
      this.swipeLayoutDirection = args.direction;
      if (args.direction == 2) { //right
        if (this.swipeLayoutIndex == this.playbookList.length - 1) {
          this.swipeLayoutIndex = 0;
        }
        else {
          this.swipeLayoutIndex += 1;
        }

      }
      if (args.direction == 1) { //left
        if (this.swipeLayoutIndex == 0) {
          this.swipeLayoutIndex = this.playbookList.length - 1;
        }
        else {
          this.swipeLayoutIndex -= 1;
        }
      }
      console.log(this.playbookList[this.swipeLayoutIndex].routerPath, '<--navigateing')
      this.zone.run(() => {
        this.routerExtensions.navigate([this.playbookList[this.swipeLayoutIndex].routerPath]);
      })

    }
  }
  doGC(): void {
    GC();
  }

}