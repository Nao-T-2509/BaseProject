import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlogService } from 'src/app/core/service/blog.service';
import { QuestionService } from 'src/app/core/service/question.service';
import { RoleService } from 'src/app/core/service/role.service';
import { DecentralizationComponent } from '../decentralization/decentralization.component';
import { ViewAdminListComponent } from './view-admin-list/view-admin-list.component';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {
  QSList: any;
  BlogList: any;

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
  constructor(private dialog: MatDialog, private roleService: RoleService, private questionService: QuestionService, private blogService: BlogService) { }

  ngOnInit(): void {
    this.questionService.getAllQuetion().subscribe(data => {
      this.QSList = data;
      // console.log(data);
    })
    this.blogService.getAllBlog().subscribe(data => {
      this.BlogList = data;
      // console.log(data);
    })
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

  viewUpdate(id: any){
    const dialogRef = this.dialog.open(ViewAdminListComponent, {
      width: '70%',
      height: 'auto',
      data: {
        id: id,
      }
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (data?.isCloseDialog === true) {
          // this.searchListMember();
        }
      }
    )
  }
}
