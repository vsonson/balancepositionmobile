import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrawerItemComponent } from './drawer-items.component';
import { SettingComponent } from './setting/setting.component';
import { HelpComponent } from './help/help.component';
import { ReferComponent } from './refer/refer.component';
import { PremiumComponent } from './premium/premium.component';
import { NotificationComponent } from './notification/notification.component';
import { ResourcesComponent } from './resources/resources.component';
import { FAQModalComponent } from './faq-modal/faq-modal.component';
import { HelpModalComponent } from './helpPage/helpModal.component';

// import { PrivacyPolicyComponent } from './privacy_policy/privacyPolicy.component';
// import { TermsOfServiceComponent } from './termsOfService/termsOfService.component';
import { ModalComponent } from './modal/modal.component';


export const routes: Routes = [
  { 
  	path: '', component: DrawerItemComponent,
  	children: [
  		{
  			path: 'setting',
  			component: SettingComponent
  		},
      {
        path: 'help',
        component: HelpComponent
      },
      {
        path: 'refer',
        component: ReferComponent
      },
      {
        path: 'premium',
        component: PremiumComponent
      },
      {
        path: 'notification',
        component: NotificationComponent
      },
      // {
      //   path: 'privacy',
      //   component: PrivacyPolicyComponent
      // },
      // {
      //   path: 'terms',
      //   component: TermsOfServiceComponent
      // },
      {
        path: 'popup',
        component: ModalComponent
      },
      {
        path: 'resources',
        component: ResourcesComponent
      },
      {
        path: 'faq',
        component: FAQModalComponent
      },
      {
        path: 'helppage',
        component: HelpModalComponent
      }

  	]

  }
  ];