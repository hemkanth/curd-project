import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CurdService } from './service/curd.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'view';
  buttonType;
  Form: FormGroup;
  modalForm: FormGroup;
  _List: any[] = [];
  modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: true,
    class: "my-modal"
  };

  constructor(private service: CurdService, private modalService: BsModalService) {
    this.buttonType = 'Submit';
    this.service.List().subscribe(response => {
      const Result = JSON.parse(response['_body']);
      console.log(Result);

      if (response['status'] === 200 && Result['Status']) {
        this._List = Result['Response'];
      }
    });
  }

  ngOnInit() {
    this.Form = new FormGroup({
      Name: new FormControl(null, [Validators.required, Validators.pattern('[A-za-z ]*')]),
      Age: new FormControl(null, [Validators.required, Validators.min(18), Validators.max(100)]),
      DOB: new FormControl(null, [Validators.required]),
      Email: new FormControl(null, [Validators.required, Validators.email]),
      Credit: new FormControl(null)
    });
    this.modalForm = new FormGroup({
      modalName: new FormControl(null, [Validators.required, Validators.pattern('[A-za-z ]*')]),
      modalAge: new FormControl(null, [Validators.required, Validators.min(18), Validators.max(100)]),
      modalDOB: new FormControl(null, [Validators.required]),
      modalEmail: new FormControl(null, [Validators.required, Validators.email]),
      modalCredit: new FormControl(null)
    });
  }

  Submit() {
    if (this.Form.valid) {

      this.service.Create(this.Form.value).subscribe(response => {
        const Result = JSON.parse(response['_body']);
        if (response['status'] === 200 && Result['Status'] === true) {
          this._List.splice(0, 0, Result['Response']);
        }
        else if(response['status'] === 400 && Result['Status'] === false) {
          console.log(Result['Response']);
          
        }
      });
    }
  }
  Delete(_index) {
    this.service.Delete(this._List[_index]['_id']).subscribe(response => {
      const Result = JSON.parse(response['_body']);
      if (response['status'] === 200 && Result['Status']) {
        this._List.splice(_index, 1);
      }
    });
  }
  update(_index) {
    this.buttonType = 'Done';
    const obj = this._List[_index];
    console.log(obj['DOB']);
    
    this.Form.controls['Name'].setValue(obj['Name']);
    this.Form.controls['Age'].setValue(obj['Age']);
    this.Form.controls['Email'].setValue(obj['Email']);
    this.Form.controls['DOB'].setValue(obj['DOB']);
    this.Form.controls['Credit'].setValue(obj['Credit']);
    this.Form.removeControl('Id');
    this.Form.addControl('Id', new FormControl(obj['_id'], Validators.required));
  }
  Done() {
    this.service.Update(this.Form.value).subscribe(response => {
      const Result = JSON.parse(response['_body']); 
      console.log(Result); 
      if (response['status'] === 200 && Result['Status']) {
        console.log(Result['Status']);
        const _Index = this._List.findIndex(obj => obj._id === Result['Response']['_id']);
        this._List[_Index] = Result['Response'];
        this.Form.removeControl('Id');
        this.Form.reset();
        this.Form.updateValueAndValidity();
        this.buttonType = "Submit";
      }
    });
  }
  Reset() {
    this.Form.removeControl('Id');
    this.Form.reset();
    this.Form.updateValueAndValidity();
    this.buttonType = "Submit";
  }
}
