import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-list-sent',
  templateUrl: './review-list-sent.component.html',
  styleUrls: ['./review-list-sent.component.scss']
})
export class ReviewListSentComponent implements OnInit {
  listReview = [
    {
      login: 'user03',
      fullname: 'Nguyễn Văn A',
      role: 'role_user',
      age: '18',
      gender: 'Nam',
      city: 'Hà Nội',
      referrentCode: 'eztek'
    },
    {
      login: 'user03',
      fullname: 'Nguyễn Văn A',
      role: 'role_user',
      age: '18',
      gender: 'Nam',
      city: 'Hà Nội',
      referrentCode: 'eztek'
    },
    {
      login: 'user03',
      fullname: 'Nguyễn Văn A',
      role: 'role_user',
      age: '18',
      gender: 'Nam',
      city: 'Hà Nội',
      referrentCode: 'eztek'
    },
    {
      login: 'user03',
      fullname: 'Nguyễn Văn A',
      role: 'role_user',
      age: '18',
      gender: 'Nam',
      city: 'Hà Nội',
      referrentCode: 'eztek'
    },
    {
      login: 'user03',
      fullname: 'Nguyễn Văn A',
      role: 'role_user',
      age: '18',
      gender: 'Nam',
      city: 'Hà Nội',
      referrentCode: 'eztek'
    },
    {
      login: 'user03',
      fullname: 'Nguyễn Văn A',
      role: 'role_user',
      age: '18',
      gender: 'Nam',
      city: 'Hà Nội',
      referrentCode: 'eztek'
    }
  ]
  page = 1;
  size = 20;
  array = [1];
  pageActive = 1;
  totalCount = 0;
  constructor() { }

  ngOnInit(): void {
  }

  previousPage() {

  }

  nextPage() {

  }

  searchListReview() {

  }

  changeSize() {}
}
