import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MultiLoadingService } from './multi-loading.service';

@NgModule({
    imports: [IonicModule],
    providers: [MultiLoadingService],
    exports: [MultiLoadingService]
})
export class MultiLoadingModule {

}