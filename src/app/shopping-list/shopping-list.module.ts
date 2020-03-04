import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoggingService } from '../logging.service';

@NgModule({
    declarations:[
        ShoppingListComponent,
    ShoppingEditComponent,
    ],
    imports:[SharedModule,CommonModule,FormsModule,ReactiveFormsModule,RouterModule.forChild([
        {path:'shopping',component:ShoppingListComponent},
    ])],
    providers:[LoggingService]
})
export class ShoppinglistModule {

}