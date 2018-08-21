import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { Loader } from './../../../common/components/loader/loader.service';
import { InfoComponent } from '../info/info.component';
import { RouterExtensions, ModalDialogOptions, ModalDialogService } from 'nativescript-angular';
import { DataPointsHttpService } from './../datapoints-http.service';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { Page } from "ui/page";
import { Location } from '@angular/common';
import { NotedialogboxComponent } from '../../../common/components/notedialogbox/notedialogbox.component';
import { Utility } from './../../../common/services/common.service';
import { GC } from "utils/utils";

class Injury {
  constructor(public Day?: string, public InjuryLevel?: number) {
  }
}


@Component({
  moduleId: module.id,
  selector: 'app-injury',
  templateUrl: './injury.component.html',
  styleUrls: ['./injury.component.css']
})
export class InjuryComponent implements OnInit, OnDestroy {
  myStr: any;
  dataPointName: string = 'Stress';
  isMakeNote: boolean;
  graphData: Injury[];

  constructor(page: Page, private _location: Location, private modalDialogService: ModalDialogService, private loader: Loader, private utility: Utility,
    private viewContainerRef: ViewContainerRef, private httpService: DataPointsHttpService, private routerExtensions: RouterExtensions) {
    page.actionBarHidden = true;
  }


  ngOnInit() {
    GC();
    console.log("oninit");
    // this.graphData = new ObservableArray([]);
    this.getData();

  }

  ngOnDestroy() {
    GC();
  }

  getData() {
    this.loader.show('loading..');
    this.httpService.getAllMetricData('Injury').subscribe((res) => {
      let tempData: Injury[] = [];
      let response: any[] = JSON.parse(JSON.stringify(res));
      for (let i = 0; i < response.length; i++) {
        tempData.push({ 'Day': this.utility.getDayNameInWeek(response[i].timestamp), 'InjuryLevel': response[i].datumValue });
      }
      this.graphData = tempData;
      this.loader.hide();
    }, (err) => {
      console.log("err", err)
      this.loader.hide();
    })
  }
  public goBack() {
    this._location.back();
  }

  public openNote() {
    this.isMakeNote = true;
    this.myStr = { "title": "Injury", "imgURL": "res://injury_grey", "isDialogVisible": this.isMakeNote };
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
      context: { screen: 'stress' }
    };

    this.modalDialogService.showModal(InfoComponent, options).then(() => {

    });
  }

  public trackStress() {
    this.routerExtensions.navigate(["/track/injury"]);
  }
  public stressPlaybook() {
    this.routerExtensions.navigate(["/myplaybook/injury"]);
  }


  doGC(): void {
    GC();
  }
}
