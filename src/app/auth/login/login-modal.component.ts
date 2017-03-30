import { Component, Inject } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { GLOBAL_CONFIG, GlobalConfig } from '../../../config';

@Component({
  selector: 'aidos-login-modal',
  styleUrls: ['login-modal.component.scss'],
  templateUrl: 'login-modal.component.html'
})
export class LoginModalComponent {

  constructor(public activeModal: NgbActiveModal, @Inject(GLOBAL_CONFIG) public config: GlobalConfig) {

  }

}
