import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { SafePipe } from './../../../../pipe/safe.pipe';
import { NotificationService } from 'src/app/core/service/notification.service';
import { UploadFileToCdnService } from 'src/app/core/service/uploadFileToCdn.service';
import { NotiComponent } from '../../../noti/noti.component';
import { PreviewNotiOnScreenComponent } from '../preview-noti-on-screen/preview-noti-on-screen.component';
import { ReviewListSentComponent } from '../review-list-sent/review-list-sent.component';

@Component({
  selector: 'app-view-edit-noti',
  templateUrl: './view-edit-noti.component.html',
  styleUrls: ['./view-edit-noti.component.scss']
})
export class ViewEditNotiComponent implements OnInit {
  cities = [
    'TP. Hồ Chí Minh',
    'Hà Nội',
    'Đà Nẵng'
  ];
  listType: any;
  EditNotiForm!: FormGroup;
  fileName: any;
  languages = 'vietnamese';
  isDisabled!: boolean;
  typeOfNoti = ''
  imgSrc1: any;
  imgSrc2: any;
  imgSrc3: any;
  metadata = new Array;
  isIntend = false;
  videoLink = ''
  parseMetadata: any;
  metadataList!: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private notificationService: NotificationService,
    private fb: FormBuilder, 
    private dialog: MatDialog, 
    public dialogRef: MatDialogRef<ViewEditNotiComponent>,
    private _snackBar: MatSnackBar, 
    private uploadFileService: UploadFileToCdnService
    ) { }

  ngOnInit(): void {
    // get list notiTypeId
    this.getListNotiTypeID()

    // get typeOfNoti
    this.getTypeOfNoti()

    // get type View or Edit to disabled
    this.getTypeViewOrEdit()

    // get metadata parse
    this.getMetadataParse()

    // form tạo noti
    this.EditNotiForm = this.fb.group({
      title: [this.data.item.title, [Validators.required]],
      body: [this.data.item.body, [Validators.required]],
      notificationTypeId: [{value: this.data.item.notificationTypeId, disabled: this.isDisabled}, [Validators.required]],
      typeOfNoti: [{value: this.typeOfNoti, disabled: this.isDisabled}, [Validators.required]],
      languages: [this.languages],
      intendTime: [this.data.item.intendTime],
      linkVideo: [this.videoLink]
    })
  }

  getListNotiTypeID() {
    this.notificationService.getListNotiType(0, 100).subscribe(data => {
      this.listType = data;
    })
  }

  getTypeOfNoti() {
    if(this.data.item.status === 'Đã gửi') {
      this.typeOfNoti = 'Gửi'
    }
    if(this.data.item.status === 'Nháp') {
      this.typeOfNoti = 'Nháp'
    }
    if(this.data.item.status === 'Đã đặt lịch') {
      this.typeOfNoti = 'Đặt lịch'
    }
  }

  getTypeViewOrEdit() {
    this.isDisabled  = this.data.type === 'View' ? true : false;
  }

  getMetadataParse() {
    if(this.testJSON(this.data.item.metadata)) {
      this.parseMetadata = JSON.parse(this.data.item.metadata);
      // get imagesMetadata
      if(this.parseMetadata.images) {
        this.metadata = this.parseMetadata.images;
      }
      // get Metadata
      if(this.parseMetadata.images) {
        this.imgSrc1 = this.parseMetadata.images[0];
        this.imgSrc2 = this.parseMetadata.images[1];
        this.imgSrc3 = this.parseMetadata.images[2];
      }
      if(this.parseMetadata.video) {
        this.videoLink = this.parseMetadata.video;
      }
    }
  }

  EditNoti() {
    // get type of Noti
    let intendTime = null;
    let isTrigger = null;

    let typeOfNoti = this.EditNotiForm.get('typeOfNoti')!.value;
    if(typeOfNoti === 'Nháp') {
      intendTime = null;
      isTrigger = false;
    }
    if(typeOfNoti === 'Gửi') {
      intendTime = null;
      isTrigger = true
    }
    if(typeOfNoti === 'Đặt lịch') {
      let temp = new Date(this.EditNotiForm.get('intendTime')!.value);
      intendTime = moment(temp).format("YYYY-MM-DDTHH:mm:ssZ");
      isTrigger = false;
    }
    // get sendTo type
    let sendType = 0;
    let sendTo = null;
    // get metadata
    let imagesMetadata: any = [];
    this.metadata.forEach((meta: any) => {
      if(meta != '') {
        imagesMetadata.push(meta);
      }
    })
    this.metadataList = {
      video: this.EditNotiForm.get('linkVideo')?.value != '' ? this.EditNotiForm.get('linkVideo')?.value : null,
      images: imagesMetadata
    }
    console.log(this.metadataList);
    let metaStringify = JSON.stringify(this.metadataList);
    const body = {
      id: this.data.item.id,
      title: this.EditNotiForm.get('title')!.value,
      body: this.EditNotiForm.get('body')!.value,
      notificationTypeId: this.EditNotiForm.get('notificationTypeId')!.value,
      note: null,
      sendType: sendType,
      sendTo: sendTo,
      userIds: [
        'chưa trả :)'
      ],
      metadata: metaStringify,
      intendTime: intendTime,
      isTrigger: isTrigger
    }
    this.notificationService.updateNoti(body).subscribe(
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
        }, 100);
      }
    )
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

  // Delete Noti function
  deleteNoti() {
    this.notificationService.deleteNoti(this.data.item.id).subscribe(
      data => {},
      err => {
        this._snackBar.openFromComponent(NotiComponent, {
          duration: 1000,
          data: {
            message: 'Xóa thông báo thất bại, vui lòng thử lại',
            status: false
          }
        })
      },
      () => {
        this._snackBar.openFromComponent(NotiComponent, {
          duration: 1000,
          data: {
            message: 'Xóa thông báo thành công',
            status: true
          }
        })
        setTimeout(() => {
          this.dialogRef.close({ isCloseDialog: true });
        }, 200);
      }
    )
  }

  // review List Sent Dialog
  previewNotiOnScreen() {
    const dialogRef = this.dialog.open(PreviewNotiOnScreenComponent, {
      width: '500px',
      maxHeight: '90vh',
      data: {
        item: this.data.item,
        type: 'View'
      }
    })
  }

  // uploat Image to cdn
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

  // get image and insert to HTML
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

  // unChoose picture
  removeSelect(index: any) {
    this.metadata[index] = '';
    console.log(this.metadata);
  }

  // make block or not to dateTimePicker
  getStatusNoti() {
    if(this.EditNotiForm.get('typeOfNoti')!.value === 'Đặt lịch') {
      this.isIntend = true;
    }
    else {
      this.isIntend = false;
    }
    console.log(this.isIntend);
  }

  // test to make sure ? Text is JSON
  testJSON(text: any){
    if (typeof text!=="string"){
        return false;
    }
    try{
        var json = JSON.parse(text);
        return (typeof json === 'object');
    }
    catch (error){
        return false;
    }
  }
}
