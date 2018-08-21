import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { ListPicker } from "ui/list-picker";
import { topmost } from "ui/frame";
import { SwipeGestureEventData } from "ui/gestures";
import * as dockModule from "tns-core-modules/ui/layouts/dock-layout";
import { FlexboxLayout } from 'ui/layouts/flexbox-layout';
import { AnimationCurve } from 'ui/enums';
import { AnimationDefinition, Animation } from 'ui/animation';
import { GC } from "utils/utils";

let view: FlexboxLayout;



var enums = require("ui/enums");




@Component({
  moduleId: module.id,
  selector: 'deactivate-modal',
  templateUrl: './deactivateModal.component.html',
  styleUrls: ['./deactivateModal.component.scss']
})
export class DeactivateModalComponent implements OnInit, OnDestroy {



  constructor(private modalDialogParams: ModalDialogParams) {
    let params = this.modalDialogParams.context;
  }

  close() {
    this.modalDialogParams.closeCallback();
  }

  ngOnInit() {
    GC();
  }

  ngOnDestroy() {
    GC();
  }
}