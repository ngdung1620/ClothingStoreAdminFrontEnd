import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder, UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {AccountService} from "../../services/account.service";
import {CreateUserRequest, EditUserRequest} from "../../models/accountModels";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {

  validateForm!: UntypedFormGroup;
  listDataOfRole:any = [];
  constructor(private fb: UntypedFormBuilder,
              private notification: NzNotificationService,
              private accountService: AccountService,
              private rote: Router) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      fullName: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      doB: [null, [Validators.required,this.validatorDate]],
      address: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      role: [null,[Validators.required]]
    });
    this.accountService._idUser$.subscribe(id => {
      if(id == ''){
        this.rote.navigate(['/manage-account/list-account'])
      }else {
        this.accountService._idUser$.subscribe(id => {
          this.accountService.getUser(id).subscribe(res => {
            let doB = new Date(res.doB).toISOString().slice(0, 10);
            this.validateForm.controls['fullName'].setValue(res.fullName);
            this.validateForm.controls['gender'].setValue(res.gender.toString());
            this.validateForm.controls['doB'].setValue(doB);
            this.validateForm.controls['address'].setValue(res.address);
            this.validateForm.controls['phoneNumber'].setValue(res.phoneNumber);
            this.validateForm.controls['role'].setValue(res.roles[0]);
          })
        })
        this.accountService.getRole().subscribe(res => {
          this.listDataOfRole = res;
        })
      }
    });


  }
  validatorDate = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if ((new Date()).getFullYear() - (new Date(control.value)).getFullYear() < 16) {
      return { c: true, error: true };
    }
    return {};
  };

  submitForm() {
    if (this.validateForm.valid) {
      let userId = '';
      this.accountService._idUser$.subscribe(id => userId = id);
      const data: EditUserRequest = {
        userId: userId,
        fullName: this.validateForm.value.fullName,
        gender: Number.parseInt(this.validateForm.value.gender),
        doB: this.validateForm.value.doB,
        phoneNumber: this.validateForm.value.phoneNumber,
        address: this.validateForm.value.address,
        roles: [this.validateForm.value.role]
      }
      this.accountService.editUser(data).subscribe( res => {
        this.notification.success("Thành công", "Cập nhật thành công");
        this.rote.navigate(['/manage-account/list-account'])
      })
    }else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
