import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { Page } from "ui/page";
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { Location } from '@angular/common';
import { NotedialogboxComponent } from '../../../common/components/notedialogbox/notedialogbox.component';
import { ModalDialogOptions, ModalDialogService, RouterExtensions } from 'nativescript-angular';
import { InfoComponent } from '../info/info.component';
import { DataPointsService } from './../datapoints.service';
import { DataPointsHttpService } from './../datapoints-http.service';
import { Loader } from './../../../common/components/loader/loader.service';
import { Utility } from './../../../common/services/common.service';
import { GC } from "utils/utils";

class Focus {
  constructor(public Day?: string, public FocusRange?: number) {
  }
}

@Component({
  moduleId: module.id,
  selector: 'app-focus',
  templateUrl: './focus.component.html',
  styleUrls: ['./focus.component.css']
})

export class FocusComponent implements OnInit, OnDestroy {
  graphData: Focus[];
  isMakeNote: boolean;
  myStr: any;

  constructor(private dataPointsHttpService: DataPointsHttpService, private loader: Loader,
    private page: Page, private utility: Utility, private modalDialogService: ModalDialogService,
    private viewContainerRef: ViewContainerRef, private routerExtensions: RouterExtensions) {
    page.actionBarHidden = true;
  }


  ngOnInit() {
    GC();
    this.getData();
  }

  ngOnDestroy() {
    GC();
  }

  getData() {
    this.loader.show('loading..');
    this.dataPointsHttpService.getAllMetricData('Focus').subscribe((res) => {
      let tempData: Focus[] = [];
      let response: any[] = JSON.parse(JSON.stringify(res));
      for (let i = 0; i < response.length; i++) {
        tempData.push({ 'Day': this.utility.getDayNameInWeek(response[i].timestamp), 'FocusRange': response[i].datumValue });
      }
      this.graphData = tempData;
      this.loader.hide();
    }, (err) => {
      console.log("err", err)
      this.loader.hide();
    })
  }


  public back() {
    this.routerExtensions.back();
  }


  public openNote() {
    this.isMakeNote = true;
    this.myStr = { "title": "Mood", "imgURL": "res://mooc_grey", "isDialogVisible": this.isMakeNote };
    let options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: { data: this.myStr }
    };

    this.modalDialogService.showModal(NotedialogboxComponent, options).then(() => {

    });
  }

  public openInfo() {
    let options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: { data: 'something' }
    };

    this.modalDialogService.showModal(InfoComponent, options).then(() => {

    });
  }

  public trackMood() {
    this.routerExtensions.navigate(["/track/mood"]);
  }
  public moodPlaybook() {
    this.routerExtensions.navigate(["/myplaybook/mood"]);
  }
  doGC(): void {
    GC();
  }
}
