import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TextComponent } from './components/text/text.component';
import { InputComponent } from './components/input/input.component';
import { DetailsComponent } from './components/details/details.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer } from './state/reducer';
import { ControlsComponent } from './components/controls/controls.component';

@NgModule({
  declarations: [
    AppComponent,
    TextComponent,
    InputComponent,
    DetailsComponent,
    ControlsComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ game: reducer }),
    StoreDevtoolsModule.instrument({
      name: 'Quick Typer'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
