import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    HttpModule
  ],
  providers: []
})
export class DataModule {

  static forRoot(providedLoader: any): ModuleWithProviders {
    return {
      ngModule: DataModule,
      providers: [
        providedLoader
      ]
    };
  }

}
