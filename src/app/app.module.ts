import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from "./app.component";
import { ProfileCompComponent } from "./profile-comp/profile-comp.component";
import { AngularSplitModule } from "angular-split";

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule, FormsModule, AngularSplitModule.forRoot()],
  declarations: [AppComponent, ProfileCompComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
