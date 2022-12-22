import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CustomerService } from '../../service/customer.service';
import { RoleService } from '../../service/role.service';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

@Component({
  selector: 'app-customer-request',
  templateUrl: './customer-request.component.html',
  styleUrls: ['./customer-request.component.scss']
})
export class CustomerRequestComponent implements OnInit {
  isShowSearch = false;
  searchForm!: FormGroup;
  statusList: any;
  page = 1;
  size = 50;
  totalCount = 0;
  array: number[] = [1];
  pageActive = 0;
  pageCount=0;
  rolelist: any = [];
  customerList: any;
  
  constructor(private fb: FormBuilder, private router: Router, 
    private customerService: CustomerService, public datepipe: DatePipe,
    private roleService: RoleService, public dialog: MatDialog) { }

  ngOnInit(): void {
    // get role list
    this.roleService.GetRoleList().subscribe(data => {
      data.forEach((element: any) => {
        this.rolelist.push(element);
      });
    })

    this.searchForm = this.fb.group({
      cr: null,
      customerName: null,
      phone: null,
      type: null,
      status: null,
      email: null,
      createdDate: null
    })
    // get list customer
    this.customerService.getCustomerRequestList(this.page, this.size).subscribe(
      data => {
        this.totalCount = data.totalCount;
        this.customerList = data.customerRequests;
      }
    )

    this.getDetailPage1(this.page);

    // list Status
    this.statusList = [
      {
        name: 'Đang xử lý',
        value: 'processing'
      },
      {
        name: 'Chưa xử lý',
        value: 'dontStart'
      },
      {
        name: 'Hoàn tất',
        value: 'done'
      }
    ]
  }

  getDetailPage(page: number) {
    
  }

  getDetailPage1(page: number) {
    this.page = page;
    let body = this.getSearchBody();
    this.customerService.getCustomerRequestList(page, this.size).subscribe(data => {
        this.customerList = [];
        this.customerList = data.customerRequests;
        this.totalCount = data.totalCount;
        this.ArrayPageNumber(this.totalCount, this.size)
        if(this.size > this.totalCount) this.size = this.totalCount;
      });
    }

  getSearchBody() {
    let searchBodyValue = this.searchForm.value;
    for(let key in searchBodyValue) {
      if(searchBodyValue[key] === undefined) {
        searchBodyValue[key] = null;
      }
      if(key === 'createdDate') {
        if(searchBodyValue[key] != null) {
          const temp = new Date(searchBodyValue[key]);
          searchBodyValue[key] = moment(temp).format("YYYY-MM-DD");
        }
      }
    } 
    return searchBodyValue;
  }

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

  clearDatePicker() {
    this.searchForm.get('createdDate')?.patchValue(null);
  }

  searchListMember() {

  }

  clearSearchData() {
    this.searchForm.setValue({
      cr: null,
      customerName: null,
      phone: null,
      type: null,
      status: null,
      email: null,
      createdDate: null
    })
  }

  changeSize() {
    this.getDetailPage1(this.page);
  }

  nextPage() {
    this.page++;
    this.getDetailPage1(this.page);
  }

  previousPage() {
    this.page--;
    this.getDetailPage1(this.page);
  }

  viewDetailRequest(id: any) {
    const dialogRef = this.dialog.open(CustomerDetailComponent, { 
      width: '70%',
      height: 'fit-content',
      data: {id: id}
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if(data?.isCloseDialog === true) {
          this.getDetailPage1(this.page);
        }
      }
    )
  }

}

