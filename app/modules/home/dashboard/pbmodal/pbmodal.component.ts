import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
// import { GC } from '../../../../../node_modules/utils/utils';

@Component({
  moduleId: module.id,
  selector: 'app-pbmodal',
  templateUrl: './pbmodal.component.html',
  styleUrls: ['./pbmodal.component.scss']
})
export class PbmodalComponent implements OnInit, OnDestroy {
  public firstContent = " ";
  public secondContent = "Sleep";
  public thirdContent = "Focus(goes_to_playbook)";
  public fourthContent = " ";
  public fifthContent = "";
  constructor(private params: ModalDialogParams) {

  }
  public close(res: string) {
    this.params.closeCallback(res);
  }

  ngOnInit() {
    // GC();
  }

  ngOnDestroy() {
    // GC();
  }

}
