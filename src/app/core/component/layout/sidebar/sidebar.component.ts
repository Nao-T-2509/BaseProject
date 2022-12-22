import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  usermenu = false;
  qrmenu = false;
  paymentmenu = false;
  rolemenu = false;
  collaborators = false;
  item = 'last';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ChangeStatus() {
    this.item = 'last';
    this.paymentmenu = false;
    this.qrmenu = false;
    this.usermenu = false;
    this.collaborators = false;
    this.rolemenu = false;
  }
  load() {
    window.location.reload();
  }
}
