import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { FormsModule } from '@angular/forms';
import { NativeScriptFormsModule } from "nativescript-angular/forms"
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { routes, declareComponents } from './myplaybook.routing';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { DataService } from "./data.service";
// import { LoaderComponent } from './../../common/components/loader/loader.component';
@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
    entryComponents: [],
    imports: [
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild(routes),
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        FormsModule,
        TNSFontIconModule.forRoot({
            'fa': './fonts/font-awesome.css',
            'mdi': './fonts/material-design-icons.css'
        })

    ],
    declarations: [
        declareComponents,
        // LoaderComponent
    ],
    providers: [ModalDialogService, DataService]
})
export class MyPlayBookModule { }
