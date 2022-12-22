import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CollaboratorService } from '../../service/collaborator.service';
import { LicenseService } from '../../service/license.service';
import { NotiComponent } from '../noti/noti.component';

@Component({
  selector: 'app-unlocktransaction',
  templateUrl: './unlocktransaction.component.html',
  styleUrls: ['./unlocktransaction.component.scss']
})
export class UnlocktransactionComponent implements OnInit {
  listTransactions = [
    'Cộng tác viên', 'Gói nâng cấp'
  ];
  type: any;
  CTVForm!: FormGroup;
  UpgradeForm!: FormGroup;
  isShowDetail = false;
  statusNow: any;
  isLocked: any;
  isLockedLetter!: string;
  selectForm!: FormGroup;
  lockedBy!: any;

  constructor(private fb: FormBuilder, private collaboratorService: CollaboratorService, private _snackBar: MatSnackBar,
    private licenseService: LicenseService) { }

  ngOnInit(): void {
    this.CTVForm = this.fb.group({
      id: null
    });
    this.UpgradeForm = this.fb.group({
      id: null
    })
    this.selectForm = this.fb.group({
      selectControl: null
    })
  }

  getType(e: any) {
    this.type = e;
  } 

  getDetailCTV() {
    this.collaboratorService.getDetailCollab(this.CTVForm.get('id')!.value).subscribe(
      data => {
        this.isShowDetail = true;
        this.isLocked = data.locked;
        if(this.isLocked === true) {
          this.isLockedLetter = 'Đã Lock Giao Dịch';
          this.lockedBy = data.lockedBy;
        }
        if(this.isLocked === false) {
          this.isLockedLetter = 'Chưa Lock Giao Dịch'
        }
      }
    )
  }

  getDetailUpgrade() {
    this.isShowDetail = true;
    this.licenseService.checkLockStatus(this.UpgradeForm.get('id')!.value).subscribe(
      data => {
        this.isShowDetail = true;
        this.isLocked = data.lock;
        if(this.isLocked === true) {
          this.isLockedLetter = 'Đã Lock Giao Dịch';
          this.lockedBy = data.lockBy;
        }
        if(this.isLocked === false) {
          this.isLockedLetter = 'Chưa Lock Giao Dịch'
        }
      }
    )
  }

  lockTransaction() {
    if(this.type === 'Cộng tác viên') {
      this.collaboratorService.UpdateLock(this.CTVForm.get('id')!.value, true).subscribe(
        data => {},
        err => {
          this._snackBar.openFromComponent(NotiComponent, {
            duration: 1000,
            data: {
              message: 'Bạn đã Lock giao dịch thất bại',
              status: false
            },
          })
          setTimeout(() => {
            this.resetInput()
          }, 200)
        },
        () => {
          this._snackBar.openFromComponent(NotiComponent, {
            duration: 1000,
            data: {
              message: 'Bạn đã Lock giao dịch thành công',
              status: true
            },
          })
          setTimeout(() => {
            this.resetInput()
          }, 200)
        })
    }
    else if(this.type === 'Gói nâng cấp') {
      const body = {
        id: this.UpgradeForm.get('id')!.value,
        lock: true,
        lockBy: localStorage.getItem('username'),
      }
      this.licenseService.updateLockStatus(body).subscribe(
        data => {},
        err => {
          this._snackBar.openFromComponent(NotiComponent, {
            duration: 1000,
            data: {
              message: 'Bạn đã Lock giao dịch thất bại',
              status: false
            },
          })
          setTimeout(() => {
            this.resetInput()
          }, 200)
        },
        () => {
          this._snackBar.openFromComponent(NotiComponent, {
            duration: 1000,
            data: {
              message: 'Bạn đã Lock giao dịch thành công',
              status: true
            },
          })
          setTimeout(() => {
            this.resetInput()
          }, 200)
        })
    }
  }

  unLockTransaction() {
    if(this.type === 'Cộng tác viên') {
      this.collaboratorService.UpdateLock(this.CTVForm.get('id')!.value, false).subscribe(
        data => {},
        err => {
          this._snackBar.openFromComponent(NotiComponent, {
            duration: 1000,
            data: {
              message: 'Bạn đã UnLock giao dịch thất bại',
              status: false
            },
          })
          setTimeout(() => {
            this.resetInput()
          }, 200)
        },
        () => {
          this._snackBar.openFromComponent(NotiComponent, {
            duration: 1000,
            data: {
              message: 'Bạn đã UnLock giao dịch thành công',
              status: true
            },
          })
          setTimeout(() => {
            this.resetInput()
          }, 200)
        })
    }
    else if(this.type === 'Gói nâng cấp') {
      const body = {
        id: this.UpgradeForm.get('id')!.value,
        lock: false,
        lockBy: localStorage.getItem('username'),
      }
      this.licenseService.updateLockStatus(body).subscribe(
        data => {},
        err => {
          this._snackBar.openFromComponent(NotiComponent, {
            duration: 1000,
            data: {
              message: 'Bạn đã UnLock giao dịch thất bại',
              status: false
            },
          })
          setTimeout(() => {
            this.resetInput()
          }, 200)
        },
        () => {
          this._snackBar.openFromComponent(NotiComponent, {
            duration: 1000,
            data: {
              message: 'Bạn đã UnLock giao dịch thành công',
              status: true
            },
          })
          setTimeout(() => {
            this.resetInput()
          }, 200)
        })
    }
  }

  resetInput() {
    this.type = false;
    this.isShowDetail = false;
    this.CTVForm.patchValue({id: null});
    this.UpgradeForm.patchValue({id: null})
    this.selectForm.patchValue({selectControl: null})
  }

}
