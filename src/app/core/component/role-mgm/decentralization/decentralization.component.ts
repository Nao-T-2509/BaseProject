import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decentralization',
  templateUrl: './decentralization.component.html',
  styleUrls: ['./decentralization.component.scss']
})
export class DecentralizationComponent implements OnInit {
  selectAll!: any;
  constructor() { };
  checkedParent: boolean[] = [];
  checkedChildren: boolean[] = [];
  roleList = [
    {
      id: 1,
      name: 'Tạo User',
      list: [
        'Tạo mới user',
        'Xem user',
        'Sửa user',
        'Phân quyền',
        'Phê duyệt',
        'Xóa user'
      ]
    },
    {
      id: 2,
      name: 'QL CTV',
      list: [
        'Xem CTV',
        'Sửa CTV',
        'Phê duyệt CTV'
      ]
    },
    {
      id: 3,
      name: 'QL Request',
      list: [
        'Xem Request',
        'Phản hồi Request',
        'Tạo thông báo'
      ]
    },
    {
      id: 4,
      name: 'QL thanh toán',
      list: [
        'Xem kỳ thanh toán',
        'Sửa kỳ thanh toán',
        'Phê duyệt kỳ thanh toán'
      ]
    },
    {
      id: 5,
      name: 'QL Nâng cấp',
      list: [
        'Xem CTV',
        'Sửa yêu cầu',
        'Phê duyệt yêu cầu'
      ]
    },
    {
      id: 6,
      name: 'QL QR',
      list: [
        'Tạo lô QR',
        'Quản lý lô QR',
        'Sửa thông tin theo lô QR'
      ]
    }
  ]

  ngOnInit(): void {
  }

  isSelectAll(e: any, index: number) {
      this.checkedParent[index] = e.checked;
  }

  noCheckAll(e: any, index: number) {
    if(e.checked === false) {
      this.checkedChildren[index] = false;
    }
  }

}
