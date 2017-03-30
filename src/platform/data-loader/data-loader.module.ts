import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    HttpModule
  ],
  providers: []
})
export class DataLoaderModule {

  static forRoot(providedLoader: any): ModuleWithProviders {
    return {
      ngModule: DataLoaderModule,
      providers: [
        providedLoader
      ]
    };
  }

}
