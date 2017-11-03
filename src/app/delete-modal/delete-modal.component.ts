import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  @Input() modalRef: BsModalRef;
  @Output() deleteEvent = new EventEmitter();
  public title: string;

  constructor(public bsModalRef: BsModalRef) { }

  delete(): void {
    this.deleteEvent.emit();
  }
}
