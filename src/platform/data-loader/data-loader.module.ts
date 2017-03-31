import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule({
  imports: [],
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
