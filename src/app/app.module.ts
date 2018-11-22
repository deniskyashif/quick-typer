import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducer } from './state/reducer';
import { GameEffects } from './state/effects';
import { TextApiService } from './services/text.api.service';

import { AppComponent } from './app.component';
import { TextComponent } from './components/text.component';
import { InputComponent } from './components/input.component';
import { DetailsComponent } from './components/details.component';
import { ControlsComponent } from './components/controls.component';
import { environment } from 'src/environments/environment';


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
    EffectsModule.forRoot([GameEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument({ name: 'Quick Typer' })
  ],
  providers: [ TextApiService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
