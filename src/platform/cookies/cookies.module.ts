import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule({
  imports: [],
  providers: []
})
export class CookiesModule {

  static forRoot(providedLoader: any): ModuleWithProviders {
    return {
      ngModule: CookiesModule,
      providers: [
        providedLoader
      ]
    };
  }

}
