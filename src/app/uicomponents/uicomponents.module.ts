import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../Components/footer/footer.component';
import { HeaderComponent } from '../Components/header/header.component';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from '../Components/side-menu/side-menu.component';
import { BreadcrumbComponent } from '../Components/breadcrumb/breadcrumb.component';
import { CollectionSectionComponent } from '../Components/collection-section/collection-section.component';
import { GenderPipe } from '../Filters/gender.pipe';
import { SafeUrlPipe } from '../Filters/safeUrl.pipe';
import { CollectionNamePipe } from '../Filters/collectionName.pipe';
import { HeroComponent } from '../Components/hero/hero.component';
import { CollapsibleComponent } from '../Components/collapsible/collapsible.component';
import { FilterCollapsibleComponent } from '../Components/filter-collapsible/filter-collapsible.component';
import { AttributeTableComponent } from '../Components/attribute-table/attribute-table.component';
import { WatchSectionComponent } from '../Components/watch-section/watch-section.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    BreadcrumbComponent,
    CollectionSectionComponent,
    CollectionNamePipe,
    SafeUrlPipe,
    GenderPipe,
    HeroComponent,
    CollapsibleComponent,
    FilterCollapsibleComponent,
    AttributeTableComponent,
    WatchSectionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    BreadcrumbComponent,
    CollectionSectionComponent,
    CollectionNamePipe,
    SafeUrlPipe,
    GenderPipe,
    HeroComponent,
    CollapsibleComponent,
    FilterCollapsibleComponent,
    AttributeTableComponent,
    WatchSectionComponent,
  ]
})
export class UIcomponentsModule { }
