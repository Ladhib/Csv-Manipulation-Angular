import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatchngPageComponent } from './matchng-page/matchng-page.component';
import { HttpClientModule } from '@angular/common/http';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManMatchingDialogComponent } from './man-matching-dialog/man-matching-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { NgxSpinnerModule } from 'ngx-spinner';

import {MatBadgeModule} from '@angular/material/badge';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import { UsersListComponent } from './users-list/users-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MatchngPageComponent,
    ManMatchingDialogComponent,
    UsersListComponent,
    RoutingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DragDropModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgxCsvParserModule,
    NgxSpinnerModule,
    MatBadgeModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
