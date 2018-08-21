import { NgModule, NO_ERRORS_SCHEMA, NgModuleFactoryLoader } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule, NSModuleFactoryLoader } from "nativescript-angular/router";
import { HttpModule } from '@angular/http';
import { CommonModule } from "@angular/common";
import { AppComponent } from "./app.component";
import { PrivacyPolicyComponent } from './modules/privacy_policy/privacyPolicy.component';
import { TermsOfServiceComponent } from './modules/termsOfService/termsOfService.component';
import { routing } from "./app.routing";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';
import { NativeScriptHttpModule } from "nativescript-angular";

// Custom component servives directives, pipes
// import * as services from './modules/_services/index';
import { AuthGuard } from './common/services/auth.guard';
// import { MinLengthDirective, IsEmailDirective } from './modules/_directives/index';
import { AlertComponent } from './modules/alert/index';
import { InAppBrowserComponent } from './common/components/in-app-browser/in-app-browser.component';
import { PbmodalComponent } from "./modules/home/dashboard/pbmodal/pbmodal.component";
import { MyDataModalComponent } from "./modules/home/dashboard/myDataModal/myDataModal.component";
import { TimePickerComponent } from './modules/drawer-items/timepickerModal/timepicker.component';
// import { LoaderComponent } from './common/components/loader/loader.component';
import { LoaderScope, Loader } from './common/components/loader/loader.service';
import { Navigation, Utility } from './common/services/common.service';

import * as frescoModule from "nativescript-fresco";
import * as applicationModule from "tns-core-modules/application";
if (applicationModule.android) {
  applicationModule.on("launch", () => {
    frescoModule.initialize();
  });
}


// import { TNSFrescoModule } from "nativescript-fresco/angular";

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    PbmodalComponent,
    TimePickerComponent,
    // LoaderComponent,
    MyDataModalComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    InAppBrowserComponent
    // MinLengthDirective, 
    // IsEmailDirective
  ],
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    CommonModule,
    NativeScriptRouterModule,
    routing,
    HttpModule,
    TNSCheckBoxModule,
    NativeScriptHttpModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [
    NativeScriptModule,
    NativeScriptRouterModule,
    AlertComponent,
    TNSCheckBoxModule
  ],
  providers: [
    AuthGuard,
    LoaderScope,
    Loader,
    Utility,
    Navigation,
    ModalDialogService,
    // ...services.serviceContainer,

    {

      provide: NgModuleFactoryLoader,
      useClass: NSModuleFactoryLoader
    }
  ],
  entryComponents: [PbmodalComponent, TimePickerComponent, MyDataModalComponent]
})
export class AppModule { }
