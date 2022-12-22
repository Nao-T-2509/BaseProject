import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { UserService } from 'src/app/core/service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewUpdateUserComponent } from './view-update-user/view-update-user.component';
import { CreateUserComponent } from './create-user/create-user.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  page = 1;
  size = 50;
  totalCount = 0;
  array: number[] = [1];
  pageCount = 0;
  pageActive = 0;
  userList: any = [];
  rolelist = [
    'ROLE_USER', 'ROLE_ADMIN'
  ];
  isShowSearch: boolean = false
  nodata = true
  searchForm!: FormGroup;

  listStatus = [
    {
      name: 'Đã kích hoạt',
      value: 'True',
    },
    {
      name: 'Ngừng kích hoạt',
      value: 'False'
    },
    {
      name: 'Tất cả',
      value: 'All'
    }
  ]

  // Fake data

  constructor(private fb: FormBuilder, private userService: UserService,
    public datepipe: DatePipe, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      username: this.fb.control(null),
      email: this.fb.control(null),
      phone: this.fb.control(null),
      role: this.fb.control(null),
      isActived: this.fb.control('All'),
      createDate: this.fb.control(null),
      fullname: this.fb.control(null)
    });

    this.searchForm.get('createDate')?.patchValue(null);

    this.getDetailPage(this.page);

    if (this.userList == []) {
      this.nodata = true
    }
    else {
      this.nodata = false
    }
  }

  // Hàm được gọi khi ấn vào nút search -> Trả về value của form search
  getSearchBody() {
    let searchBodyValue = this.searchForm.value;
    for (let key in searchBodyValue) {
      if (searchBodyValue[key] === undefined) {
        searchBodyValue[key] = null;
      }
      if (key === 'createDate') {
        if (searchBodyValue[key] != null) {
          const temp = new Date(searchBodyValue[key]);
          searchBodyValue[key] = moment(temp).format("YYYY-MM-DD");
        }
      }
    }
    return searchBodyValue;
  }


  // Hàm được gọi khi khởi tạo và ấn để chuyển trang
  getDetailPage(page: number) {
    this.page = page;
    let body = this.getSearchBody();
    this.userService.SearchUser(page, this.size, body).subscribe(data => {
      this.userList = [];
      data.userDtos.forEach((element: any) => {
        const user = {
          id: element.id,
          name: element.login || 'No data',
          fullname: element.firstName || 'No data',
          role: element.authorities || 'No data',
          email: element.email || 'No data',
          phone: element.phoneNumber || 'No data',
          date: this.datepipe.transform(element.createdDate, 'hh:mm a dd-MM-yyyy') || 'No data',
          status: element.activated || false,
        }
        this.userList.push(user);
      });
      this.totalCount = data.totalCount;
      this.ArrayPageNumber(this.totalCount, this.size)
    })
  }

  // Hàm được gọi để tạo ra số trang
  ArrayPageNumber(totalCount: number, size: number) {
    let i = 0;
    this.array = [];
    for (let index = 1; index <= totalCount; index++) {
      if (index % size === 0) i++;
    }
    if (totalCount % size === 0) this.pageCount = i;
    else this.pageCount = i + 1;
    for (let index = 1; index <= this.pageCount; index++) {
      this.array[index - 1] = index;
    }
  }

  // Hàm lùi trang
  previousPage() {
    this.page--;
    this.getDetailPage(this.page);
  }

  // Hàm chuyển tiếp trang
  nextPage() {
    this.page++;
    this.getDetailPage(this.page);
  }

  // Xóa dữ liệu của ô input datepicker
  clearDatePicker() {
    this.searchForm.get('createDate')?.patchValue(null);
  }

  // Xóa dữ liệu của tất cả input trong form search
  clearSearchData() {
    this.searchForm.setValue(
      {
        username: null,
        fullname: null,
        email: null,
        phone: null,
        role: null,
        isActived: 'All',
        createDate: null
      }
    )
  }

  // Hàm được gọi khi ấn vào nút search
  searchListMember() {
    const body = this.getSearchBody();
    this.page = 1;
    this.size = 50;
    this.userService.SearchUser(this.page, this.size, body).subscribe(data => {
      this.userList = [];
      data.userDtos.forEach((element: any) => {
        const user = {
          id: element.id,
          name: element.login || 'No data',
          fullname: element.firstName || 'No data',
          role: element.authorities || 'No data',
          email: element.email || 'No data',
          phone: element.phoneNumber || 'No data',
          date: this.datepipe.transform(element.createdDate, 'hh:mm a dd-MM-yyyy'),
          status: element.activated || false,
        }
        this.userList.push(user);
      });
      this.totalCount = data.totalCount;
      if (this.totalCount < this.size) this.size = this.totalCount;
      this.ArrayPageNumber(this.totalCount, this.size)
    })
  }

  // Thay đổi số user được hiển thị
  changeSize() {
    this.getDetailPage(this.page);
  }

  // Add user
  addUser() {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '70%',
      height: 'auto'
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (data?.isCloseDialog === true) {
          this.searchListMember();
        }
      }
    )
  }

  // view, update Detail
  viewUpdate(name: any) {
    const dialogRef = this.dialog.open(ViewUpdateUserComponent, {
      width: '70%',
      height: 'auto',
      data: {
        username: name
      }
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (data?.isCloseDialog === true) {
          this.searchListMember();
        }
      }
    )
  }

  stopPropagation(e: any) {
    e.stopPropagation();
  }

}
