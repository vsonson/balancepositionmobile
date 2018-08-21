import { Component, ViewEncapsulation, OnInit, ViewContainerRef } from "@angular/core";
import { Page } from "ui/page";
import { Location } from '@angular/common';
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular";
import { NotedialogboxComponent } from "../../../common/components/notedialogbox/notedialogbox.component";
import { Track } from './../track-model';
import { TrackService } from './../track.service';
import { TrackHttpService } from './../track-http.service';
import { RouterExtensions } from "nativescript-angular/router";
import { Loader } from '../../../common/components/loader/loader.service';
import { alert } from "ui/dialogs";
import { GC } from "utils/utils";


@Component({
	moduleId: module.id,
	selector: "app-track-items",
	//providers: [ TrackService ],
	templateUrl: './mood.component.html',
	styleUrls: ['./mood.component.css']
})
export class MoodComponent {

	date: Date;
	exactDate: Date;
	disableNextDateBtn: boolean = true;
	myStr: any;
	public dataPointName: string;
	isMakeNote: boolean;
	track: Track
	constructor(
		private trackService: TrackService,
		page: Page,
		private _location: Location,
		private modalDialogService: ModalDialogService,
		private viewContainerRef: ViewContainerRef,
		private routerExtensions: RouterExtensions,
		private loader: Loader,
		private trackHttpService: TrackHttpService
	) {
		this.track = new Track()
		this.date = new Date();
		this.dataPointName = "Mood";
		this.date.setHours(0);
		this.date.setMinutes(0);
		this.date.setSeconds(0);
		this.track.timestamp = this.date;
		this.exactDate = new Date(this.date);

		page.actionBarHidden = true;
	}

	prevDate() {
		this.date.setDate(this.date.getDate() - 1);
		this.track.timestamp = this.date;
		this.disableNextDateBtn = false;
	}

	nextDate() {
		if (this.disableNextDateBtn) return;
		this.date.setDate(this.date.getDate() + 1)
		if (this.trackService.compareExactDate(this.exactDate, this.date) == 1 || this.trackService.compareExactDate(this.exactDate, this.date) == 0) {
			this.disableNextDateBtn = true;
		}
	}


	getDateFormatString(_date: Date) {
		return (_date.getMonth() + 1) + "/" + _date.getDate() + "/" + _date.getFullYear();
	}


	public goBack() {
		this._location.back();
	}

	public done() {
		// console.log(JSON.stringify(this.track));
		// if (this.track.value && this.track.timestamp) {
		// 	this.loader.show('Loading...');
		// 	this.trackService.postTrack(this.track, "mood-data").subscribe((data) => {
		// 		console.log("response came")
		// 		this.routerExtensions.navigate(["/home/dashboard"]);

		// 	}, error => {
		// 		this.loader.hide();
		// 	});
		// }
		this.loader.show('Setting Mood..');

		this.trackHttpService.createMoodDatum(this.dataPointName, this.track.value, this.track.timestamp.toISOString())
			.subscribe((res) => {
				console.log("success", JSON.stringify(res));
				this.loader.hide();
				let options = {
					title: "Success",
					message: "Mood has been set succesfully!",
					okButtonText: "OK"
				};
				alert(options).then(() => {
					console.log("Race chosen!");
				});
			}, (err) => {
				console.log("ERR", JSON.stringify(err));
				this.loader.hide();
				let options = {
					title: "Error",
					message: "Error in setting Mood!",
					okButtonText: "OK"
				};
				alert(options).then(() => {
					console.log("Race chosen!");
				});
			})

	}

	public selectMood(moodType) {
		console.log("moodtype", moodType);
		this.track.value = moodType
	}

	// public awful()
	// {
	//   console.log("awful clicked");
	// }
	// public bad()
	// {
	//   console.log("bad clicked");
	// }
	// public ehhh()
	// {
	//   console.log("ehhh clicked");
	// }
	// public good()
	// {
	//   console.log("good clicked");
	// }
	// public great()
	// {
	//   console.log("great clicked");
	// }
	public openNote() {
		this.isMakeNote = true;
		this.myStr = { "title": "Mood", "imgURL": "res://mood_grey", "isDialogVisible": this.isMakeNote };
		let options: ModalDialogOptions = {
			viewContainerRef: this.viewContainerRef,
			fullscreen: false,
			context: { data: this.myStr }
		};

		this.modalDialogService.showModal(NotedialogboxComponent, options).then(() => {

		});
	}
	doGC(): void {
		GC();
	}

}

