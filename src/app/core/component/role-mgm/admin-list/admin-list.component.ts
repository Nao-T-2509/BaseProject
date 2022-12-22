import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RoleService } from 'src/app/core/service/role.service';
import { DecentralizationComponent } from '../decentralization/decentralization.component';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {
  roleList: any;

  page = 0;
  size = 10;
  totalCount = 0;
  array: number[] = [1];
  pageCount=0;
  pageActive = 0;
  userList: any;
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

  // Hàm được gọi khi khởi tạo và ấn để chuyển trang
  getDetailPage(page: number) {
    
  }

  
  // Thay đổi số user được hiển thị
  changeSize() {
    this.getDetailPage(this.page);
  }
  constructor(private dialog: MatDialog, private roleService: RoleService) { }

  ngOnInit(): void {
    this.roleList = [
      {
        stt: '1',
        user: 'ADMIN',
        nameAdmin: 'ADMIN',
        role: 'Tổng',
        active: true,
        note: 'aaaaa'
      }
    ]
    this.roleService.searchRoleList(this.page, this.size).subscribe(
      data => {}
    )
  }

  addRole() {
    this.dialog.open(DecentralizationComponent, {
      width: '90%',
      height: '100%'
    })
  }
}
