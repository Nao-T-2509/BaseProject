import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/core/service/customer.service';
import { NotiComponent } from '../../noti/noti.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  requestDetail!: any;
  annonimousAvatar = './../../../../../../assets/images/annonimous.jpg';
  isChangeStatus =  false;
  status: string = '';
  adminResponeForm!: FormGroup;
  messageToast = '';
  isSuccess!: boolean;
  constructor(private router: Router, private customerService: CustomerService, 
    public dialogRef: MatDialogRef<CustomerDetailComponent>, private fb: FormBuilder, 
    private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    const id = this.data.id;
    this.customerService.getDetailRequest(id).subscribe(
      data => {
        this.requestDetail = data; 
        this.status = data.status;
        this.adminResponeForm = this.fb.group({
          adminNote: [this.requestDetail.adminNote]
        })
      }
    )
  }

  changeStatus(statusNew: string) {
    this.status = statusNew;
  }

  updateRequest() {
    const body = {
      id: this.requestDetail.id,
      type: null,
      username: null,
      customerName: null,
      phoneNumber: null,
      email: null,
      description: null,
      imageLink: null,
      adminNote: this.adminResponeForm.get('adminNote')?.value,
      status: this.status,
      relatedID: null,
      createdDate: null
    }
    this.customerService.upadateRequest(body).subscribe(
      data => {},
      err => {
        this._snackBar.openFromComponent(NotiComponent, {
          duration: 1000,
          data: {
            message: 'Cập nhật thất bại, vui lòng thử lại',
            status: false
          }
        })
      },
      () => {
        this._snackBar.openFromComponent(NotiComponent, {
          duration: 1000,
          data: {
            message: 'Cập nhật thành công',
            status: true
          }
        })
        setTimeout(() => {
          this.dialogRef.close({ isCloseDialog: true });
        }, 200);
      }
    )
  }

}
