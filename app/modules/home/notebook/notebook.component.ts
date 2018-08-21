import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import { HomeUI } from './../home-ui.service';
import { GC } from "utils/utils";

@Component({
  moduleId: module.id,
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.css']
})

export class NoteBookComponent implements OnInit, OnDestroy {
  date: Date;
  exactDate: Date;
  disableNextDateBtn: boolean = true;
  notebookItems: ListItems[] = [];
  selectedList: string;
  noteText: string;
  constructor(
    page: Page,
    private routerExtensions: RouterExtensions,
    private homeUi: HomeUI
  ) {
    page.actionBarHidden = true;
    this.homeUi.setAppBarTitle("NoteBook")
  }

  ngOnInit() {
    GC();
    this.initDate();
    this.initListItems();
  }

  ngOnDestroy() {
    GC();
  }
  doGC(): void {
    GC();
  }


  initListItems() {
    this.notebookItems.push({ name: "General", id: "general", notes: "I will not sleep untill 12:00 clock because of exams.." });
    this.notebookItems.push({ name: "Track", id: "track" });
    this.notebookItems.push({ name: "Mood", id: "mood" });
    this.notebookItems.push({ name: "Sleep", id: "sleep" });
    this.notebookItems.push({ name: "Stress", id: "stress" });
    this.notebookItems.push({ name: "Injury", id: "injury" });
    this.notebookItems.push({ name: "Performance", id: "performance" });
    this.notebookItems.push({ name: "Body", id: "body" });
    this.notebookItems.push({ name: "Nutrition", id: "nutrition" });
    this.notebookItems.push({ name: "Focus", id: "focus" });
    this.notebookItems.push({ name: "Energy", id: "energy" });
    this.notebookItems.push({ name: "Interest", id: "interest" });
    this.notebookItems.push({ name: "Practise", id: "practise" });
    this.selectedList = "general";
  }


  selectList(id: string, index: number) {
    if (this.notebookItems[index].notes)
      this.noteText = this.notebookItems[index].notes;
    else
      this.noteText = "";
    this.selectedList = id;
  }

  addNote(index: number) {
    this.notebookItems[index].notes = this.noteText;
    this.selectedList = null;
  }

  initDate() {
    this.date = new Date();
    this.date.setHours(0);
    this.date.setMinutes(0);
    this.date.setSeconds(0);
    this.exactDate = new Date(this.date);
  }


  prevDate() {
    this.date.setDate(this.date.getDate() - 1);
    this.disableNextDateBtn = false;
  }

  nextDate() {
    if (this.disableNextDateBtn) return;
    this.date.setDate(this.date.getDate() + 1)
    if (this.compareExactDate(this.exactDate, this.date) == 1 || this.compareExactDate(this.exactDate, this.date) == 0) {
      this.disableNextDateBtn = true;
    }
  }

  getDateFormatString(_date: Date) {
    return (_date.getMonth() + 1) + "/" + _date.getDate() + "/" + _date.getFullYear();
  }

  compareExactDate(a: Date, b: Date) {  //returns 1 if a is greater, returns 0 if both are equal, returns 2 if b is greater
    if (a.getFullYear() == b.getFullYear()) {
      if (a.getMonth() == b.getMonth())
        if (a.getDate() == b.getDate())
          return 0;
    }
    if (a.getFullYear() < b.getFullYear()) {
      return 1;
    }

    if (a.getMonth() < b.getMonth()) {
      return 1;
    }

    if (a.getDate() < b.getDate()) {
      return 1;
    }
    return 2;
  }



}

interface ListItems {
  name: string;
  id: string;
  notes?: string;
}

