import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthinterceptorService } from './authinterceptor.service';
import { LoggingService } from './logging.service';

@NgModule({
    providers:[{provide:HTTP_INTERCEPTORS,useClass:AuthinterceptorService,multi:true}]
})
export class CoreModule {

}