import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup, ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {AccountService} from "../../services/account.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {CreateUserRequest} from "../../models/accountModels";

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  listDataOfRole:any = [];
  constructor(private fb: UntypedFormBuilder,
              private notification: NzNotificationService,
              private accountService: AccountService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      fullName: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      doB: [null, [Validators.required,this.validatorDate]],
      address: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required,this.createPasswordStrengthValidator(),Validators.minLength(6)]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      role: [null,[Validators.required]]
    });
    this.accountService.getRole().subscribe(res => {
      this.listDataOfRole = res;
    })
  }
    createPasswordStrengthValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

      const value = control.value;

      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]+/.test(value);

      const hasLowerCase = /[a-z]+/.test(value);

      const hasNumeric = /[0-9]+/.test(value);

      const hasSpecialChar = /[!@#$%^&*]+/.test(value);

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

      return !passwordValid ? {passwordStrength:true}: null;
    }
  }

  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  validatorDate = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if ((new Date()).getFullYear() - (new Date(control.value)).getFullYear() < 16) {
      return { c: true, error: true };
    }
    return {};
  };

  updateConfirmValidator() {
    Promise.resolve().then(() => this.validateForm.controls['checkPassword'].updateValueAndValidity());
  }

  submitForm() {
    if (this.validateForm.valid) {
      let role: string[] = [];
      role.push(this.validateForm.value.role)
      const data: CreateUserRequest = {
        fullName: this.validateForm.value.fullName,
        gender: Number.parseInt(this.validateForm.value.gender),
        doB: this.validateForm.value.doB,
        phoneNumber: this.validateForm.value.phoneNumber,
        address: this.validateForm.value.address,
        email: this.validateForm.value.email,
        password: this.validateForm.value.password,
        roles: role
      }
      this.accountService.createUser(data).subscribe(res => {
        if(res.status == 1){
          this.notification.success("Thành công", res.message)
        }else {
          this.notification.error("Thất bại",res.message)
        }
        this.validateForm.reset();
      },() => {
        this.notification.error("Lỗi","Thêm không thành công");
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
