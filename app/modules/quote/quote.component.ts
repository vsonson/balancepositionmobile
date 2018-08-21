import { Injectable, OnDestroy } from "@angular/core";
import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, ViewEncapsulation } from "@angular/core";
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import { AlertService, SharedService } from '../../common/services/services-index';
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { GC } from "utils/utils";

@Component({
    moduleId: module.id,
    encapsulation: ViewEncapsulation.None,
    templateUrl: 'quote.component.html',
    styleUrls: ['./quote.component.scss']
})

@Injectable()
export class QuoteComponent implements OnInit, OnDestroy {
    public frameworks: Array<string>;
    authHeader: any = this.sharedService.getAuthHeader();
    API_URL: string = this.sharedService.getAPIUrl();
    currentQuote: any = {};
    public constructor(private http: Http, private params: ModalDialogParams, private routerExtensions: RouterExtensions,
        private sharedService: SharedService) {
    }

    ngOnInit() {
        GC();
        this.quoteOfTheDay().subscribe((data) => {
            this.currentQuote = data;
        });
    }

    ngOnDestroy() {
        GC();
    }


    public close() {
        this.params.closeCallback();
    }

    next() {
        this.params.closeCallback();
        this.routerExtensions.navigate(["/home/dashboard"]);
    }

    quoteOfTheDay() {
        console.log("Service Hi quote");
        return this.http.get(this.API_URL + "/quote-of-the-days/current", this.authHeader)
            .map((res: Response) => res.json())
        //.catch(this.handleErrors);
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        //return Observable.throw(error);
    }
    doGC(): void {
        GC();
    }

}
// << sidedrawer-getting-started-angular