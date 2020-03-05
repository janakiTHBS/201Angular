import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppinglistModule } from './shopping-list/shopping-list.module';
import { LoggingService } from './logging.service';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import { RecipeEffects } from './recipes/store/recipes.effects';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RecipesModule,
    ReactiveFormsModule,
    HttpClientModule,
    ShoppinglistModule,
    SharedModule,
    CoreModule,
    AuthModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects,RecipeEffects]),
    StoreDevtoolsModule.instrument({logOnly:environment.production}),
    StoreRouterConnectingModule.forRoot()

  ],
  providers: [LoggingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
