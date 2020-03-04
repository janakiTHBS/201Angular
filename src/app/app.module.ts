import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
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
import { shoppinglistReducer } from './shopping-list/store/shopping-list.reducer';
import { AuthReducer } from './auth/store/auth.reducer';
import * as fromApp from './app.reducer';
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

  ],
  providers: [LoggingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
