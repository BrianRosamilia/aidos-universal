import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule({
  imports: [],
  providers: []
})
export class TransferStoreModule {

  static forRoot(providedLoader: any): ModuleWithProviders {
    return {
      ngModule: TransferStoreModule,
      providers: [
        providedLoader
      ]
    };
  }

}
