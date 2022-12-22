import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/service/notification.service';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReviewListSentComponent } from '../review-list-sent/review-list-sent.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotiComponent } from '../../../noti/noti.component';
import { PreviewNotiOnScreenComponent } from '../preview-noti-on-screen/preview-noti-on-screen.component';
import { UploadFileToCdnService } from 'src/app/core/service/uploadFileToCdn.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-create-noti',
  templateUrl: './create-noti.component.html',
  styleUrls: ['./create-noti.component.scss']
})
export class CreateNotiComponent implements OnInit {
  languages = 'vietnamese';
  setDate = false;
  listType: any;
  date!: moment.Moment;
  disabled = false;
  cities = [
    'TP. Hồ Chí Minh',
    'Hà Nội',
    'Đà Nẵng'
  ];
  fileName: any;
  createNotiForm!: FormGroup;
  source_image = [];
  imgSrc1: any;
  imgSrc2: any;
  imgSrc3: any;
  metadata = new Array;
  videoSource = 'https://www.youtube.com/watch?v=qDk4wfVxvIM';
  isIntend = false;
  metadataList!: any;

  constructor(private notificationService: NotificationService, private fb: FormBuilder, 
    private dialog: MatDialog, private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<CreateNotiComponent>,
    private uploadFileService: UploadFileToCdnService, public sanitizer: DomSanitizer) { 
    
  }

  ngOnInit(): void {
    this.notificationService.getListNotiType(0, 100).subscribe(data => {
      this.listType = data;
    })
    // form tạo noti
    this.createNotiForm = this.fb.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
      notificationTypeId: ['', [Validators.required]],
      intendTime: '',
      typeOfNoti: ['', [Validators.required]],
      languages: '',
      linkVideo: ['']
    })
  }

  importFile(e: any) {
    this.fileName = e.target.files[0].name
  }

  reviewListSent() {
    const dialogRef = this.dialog.open(ReviewListSentComponent, {
      width: '90%',
      height: 'fit-content'
    })
  }

  createNoti() {
    // get type of Noti
    let intendTime = null;
    let isTrigger = null;

    let typeOfNoti = this.createNotiForm.get('typeOfNoti')!.value;
    if(typeOfNoti === 'Nháp') {
      intendTime = null;
      isTrigger = false;
    }
    if(typeOfNoti === 'Gửi ngay') {
      intendTime = null;
      isTrigger = true
    }
    if(typeOfNoti === 'Đặt lịch gửi') {
      let temp = new Date(this.createNotiForm.get('intendTime')!.value);
      intendTime = moment(temp).format("YYYY-MM-DDTHH:mm:ssZ");
      isTrigger = false;
    }
    // get sendTo type
    let sendType = 0;
    let sendTo = null;

    // get metadata
    let imagesMetadata: any = [];
    this.metadata.forEach(meta => {
      if(meta != '') {
        imagesMetadata.push(meta);
      }
    })
    this.metadataList = {
      video: this.createNotiForm.get('linkVideo')?.value != '' ? this.createNotiForm.get('linkVideo')?.value : null,
      images: imagesMetadata
    }
    let metaStringify = JSON.stringify(this.metadataList);
    // get body 
    const body = {
      title: this.createNotiForm.get('title')!.value,
      body: this.createNotiForm.get('body')!.value,
      notificationTypeId: this.createNotiForm.get('notificationTypeId')!.value,
      note: null,
      sendType: sendType,
      sendTo: sendTo,
      userIds: [
        "string 1",
        "string 2"
      ],
      metadata: metaStringify,
      intendTime: intendTime,
      isTrigger: isTrigger
    }
    this.notificationService.addNoti(body).subscribe(
      data => {},
      err => {
        this._snackBar.openFromComponent(NotiComponent, {
          duration: 1000,
          data: {
            message: 'Thất bại, vui lòng thử lại',
            status: false
          }
        })
      },
      () => {
        this._snackBar.openFromComponent(NotiComponent, {
          duration: 1000,
          data: {
            message: 'Thành công',
            status: true
          }
        })
        setTimeout(() => {
          this.dialogRef.close({ isCloseDialog: true });
        }, 1000);
      }
    )
  }

  previewNotiOnScreen() {
    // get metadata List
    let imagesMetadata: any = [];
    this.metadata.forEach(meta => {
      if(meta != '') {
        imagesMetadata.push(meta);
      }
    })
    let metadataList = {
      video: this.createNotiForm.get('linkVideo')?.value != '' ? this.createNotiForm.get('linkVideo')?.value : null,
      images: imagesMetadata
    }
    // open dialog
    const dialogRef = this.dialog.open(PreviewNotiOnScreenComponent, {
      width: '500px',
      maxHeight: '90vh',
      data: {
        type: 'Create',
        item: this.getItemOfPreview(metadataList)
      }
    })
  }

  uploadImage(e: any) {
    if(e.target.files.length === 1) {
      this.uploadFileService.uploadOneFile(e.target.files[0], 'Notification').subscribe(
        data => {
          this.metadata.push(data[0])
        },
        err => {
          this._snackBar.openFromComponent(NotiComponent, {
            duration: 1000,
            data: {
              message: 'Tải ảnh lên thất bại, vui lòng thử lại',
              status: false
            }
          })
        },
        () => {
        }
      )
    }
  }

  onUploadImage(e: any, index: number) {
    const file = e.target.files[0];
    if(e.target.files && file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if(index === 1) {
          this.imgSrc1 = e.target!.result;
        }
        if(index === 2) {
          this.imgSrc2 = e.target!.result;
        }
        if(index === 3) {
          this.imgSrc3 = e.target!.result;
        }
        
      }
      reader.readAsDataURL(file)
    }
  }

  removeSelect(index: number) {
    this.metadata[index] = '';
  }

  getStatusNoti() {
    if(this.createNotiForm.get('typeOfNoti')!.value === 'Đặt lịch gửi') {
      this.isIntend = true;
    }
    else {
      this.isIntend = false;
    }
  }

  // get Item to view in preview when create Noti
  getItemOfPreview(metadataList: any) {
    const item = {
      title: this.createNotiForm.get('title')!.value,
      body: this.createNotiForm.get('body')!.value,
      metadata: metadataList,
      intendTime: this.createNotiForm.get('intendTime')!.value,
      typeOfNoti: this.createNotiForm.get('typeOfNoti')!.value,
    }
    return item;
  }
}
