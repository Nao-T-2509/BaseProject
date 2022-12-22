import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-noti',
  templateUrl: './noti.component.html',
  styleUrls: ['./noti.component.scss']
})
export class NotiComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
