import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NotificationService } from 'src/app/core/service/notification.service';
import { CreateNotiComponent } from './create-noti/create-noti.component';
import { ViewEditNotiComponent } from './view-edit-noti/view-edit-noti.component';

@Component({
  selector: 'app-noti-list',
  templateUrl: './noti-list.component.html',
  styleUrls: ['./noti-list.component.scss']
})
export class NotiListComponent implements OnInit {
  page = 0;
  size = 20;
  totalCount = 0;
  array: number[] = [1];
  pageCount=0;
  pageActive = 0;
  isShowSearch: boolean = false;
  searchForm!: FormGroup;
  isSuccess = false;
  listNotiType: any;
  notiList: any;
  statusList = [
    'Đã gửi', 'Nháp', 'Đã đặt lịch'
  ]
  constructor(
    private fb: FormBuilder, 
    public datepipe: DatePipe, 
    private router: Router,
    private notificationService: NotificationService, 
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.searchForm =  this.fb.group({
      keyword: '',
      type: '',
      fromDate: '',
      toDate: '',
      status: '',
      createdBy: '',
      sendTo: ''
    });
    this.notificationService.getListNotiType(0, 100).subscribe(
      data => this.listNotiType = data
    )
    this.searchListNoti();
  }

  getSearchBody() {
    let searchBodyValue = this.searchForm.value;
    for(let key in searchBodyValue) {
      if(searchBodyValue['fromDate'] != '') {
        const temp = new Date(searchBodyValue['fromDate']);
        searchBodyValue['fromDate'] = moment(temp).format("YYYY-MM-DD");
      }
      if(searchBodyValue['toDate'] != '') {
        const temp = new Date(searchBodyValue['toDate']);
        searchBodyValue['toDate'] = moment(temp).format("YYYY-MM-DD");
      }
    }
    return searchBodyValue;
  }

  // Xóa dữ liệu của ô input datepicker
  clearDatePicker() {
    this.searchForm.get('fromDate')?.patchValue(null);
    this.searchForm.get('toDate')?.patchValue(null);
  }

  // hàm được gọi khi ấn vào nút search & ngOnInit
  searchListNoti() {
    let searchBodyValue = this.getSearchBody();
    // lấy ra param để truyền vào API
    let isSend: any = '';
    let isIntend: any = ''
    if(searchBodyValue.status === 'Đã gửi') {
      isSend = true
    }
    else if(searchBodyValue.status === 'Nháp') {
      isSend = false;
      isIntend = false;
    }
    else if(searchBodyValue.status === 'Đã đặt lịch') {
      isSend = false;
      isIntend = true;
    }
    this.notificationService.searchListNoti(
      searchBodyValue.keyword, searchBodyValue.type, isSend, isIntend, searchBodyValue.fromDate, 
      searchBodyValue.toDate, this.page, this.size
    ).subscribe(
      data => {
          let _this = this;
          this.notiList = [];
          // gen ra số trang
          this.totalCount = data.totalCount;
          if(this.totalCount < this.size) {
            this.size = this.totalCount;
          }
          this.ArrayPageNumber(this.totalCount, this.size);
          // lấy ra list noti
          this.notiList = data.data.map(function(e: any) {
          let status;
          // lấy ra status
          if(e.isSend === true) {
            status = 'Đã gửi'
          }
          else {
            if(e.intendTime != null) {
              status = 'Đã đặt lịch'
            }
            else {
              status = 'Nháp'
            }
          }
          // lấy ra ngày gửi
          let sentDate: any;
          if(e.isSend === true) {
            sentDate = _this.datepipe.transform(e.lastModifiedDate, 'dd-MM-yyyy')
          }
          else {
            sentDate = 'Chưa gửi'
          }
          // lấy ra số tượng theo SendType
          let quantitySend: any;
          if(e.sendType === 0) {
            quantitySend = 'Tất cả'
          }
          else if(e.sendType === 1) {
            quantitySend = '1 người nhận. ID: ' + e.sendTo;
          }
          else if(e.sendType === 2) {
            // quantitySend = e.note
            quantitySend = '1 số người'
          }
          return {
            id: e.id,
            title: e.title,
            type: e.notificationTypeName,
            notificationTypeId: e.notificationTypeId,
            createdBy: e.createdBy,
            sentDate: sentDate,
            sendTo: e.sendTo,
            quantitySend: quantitySend,
            quantitySeen: e.quantitySeen,
            status: status,
            body: e.body,
            sendType: e.sendType,
            intendTime: e.intendTime,
            isSend: e.isSend,
            lastModifiedDate: e.lastModifiedDate,
            metadata: e.metadata
          }
        })
      }
    )
  }

   // Hàm được gọi để tạo ra số trang
  ArrayPageNumber(totalCount: number, size: number) {
    let i = 0;
    this.array = [];
    for (let index = 1; index <= totalCount; index++) {
      if(index%size === 0) i++;
    }
    if(totalCount%size === 0) this.pageCount = i;
    else this.pageCount = i+1;
    for (let index = 1; index <= this.pageCount; index++) {
      this.array[index-1]=index;
    }
  }

  // Xóa dữ liệu của tất cả input trong form search
  clearSearchData() {
    this.searchForm.setValue(
      {
        keyword: '',
        type: '',
        fromDate: '',
        toDate: '',
        status: '',
        createdBy: '',
        sendTo: ''
      }
    )
  }

  showDetailNoti(item: any, type: any) {
    const dialogRef = this.dialog.open(ViewEditNotiComponent, {
      width: '90%',
      height: '95%',
      data: {
        item: item,
        type: type
      }
    });
    dialogRef.afterClosed().subscribe(
      data => {
        this.searchListNoti();
      }
    )
  }

  stopPropagation(e: any) {
    e.stopPropagation();
  } 

  // Hàm lùi trang
  previousPage() {
    this.page--;
    this.searchListNoti();
  }

  // Hàm chuyển tiếp trang
  nextPage() {
    this.page++;
    this.searchListNoti();
  }

  // Thay đổi số user được hiển thị
  changeSize() {
    this.searchListNoti();
  }
  
  createNoti() {
    const dialogRef = this.dialog.open(CreateNotiComponent, {
      width: '90%',
      height: '95%'
    });
    dialogRef.afterClosed().subscribe(
      data => {
        this.searchListNoti();
      }
    )
  }
}
