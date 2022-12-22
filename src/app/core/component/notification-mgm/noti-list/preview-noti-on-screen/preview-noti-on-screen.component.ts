import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-preview-noti-on-screen',
  templateUrl: './preview-noti-on-screen.component.html',
  styleUrls: ['./preview-noti-on-screen.component.scss']
})
export class PreviewNotiOnScreenComponent implements OnInit {
  timeSent: any;
  parseMetadata: any;
  listImages: any;
  videoLink: any;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public datepipe: DatePipe,
  public _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getMetadataParse();
    // click from View Screen
    if(this.data.type === 'View') {
      if(this.data.item.isSend ===  true) {
        this.timeSent = this.datepipe.transform(this.data.item.lastModifiedDate, 'HH:mm dd/MM/YYYY')
      }
      else {
        if(this.data.item.intendTime) {
            this.timeSent = this.datepipe.transform(this.data.item.intendTime, 'HH:mm dd/MM/YYYY')
          }
        else {
          this.timeSent = this.datepipe.transform(Date.now(), 'HH:mm dd/MM/YYYY')
        }
      }
    } 
    // click from Create Screen
    else if(this.data.type === 'Create'){
      if(this.data.item.typeOfNoti === 'Nháp' || this.data.item.typeOfNoti === 'Gửi ngay') {
        this.timeSent = this.datepipe.transform(Date.now(), 'HH:mm dd/MM/YYYY');
      } 
      else if(this.data.item.typeOfNoti === 'Đặt lịch gửi') {
        this.timeSent = this.datepipe.transform(this.data.item.intendTime, 'HH:mm dd/MM/YYYY')
      }
    }
  }

  getMetadataParse() {
    if(this.data.type === 'View') {
      if(this.testJSON(this.data.item.metadata)) {
        this.parseMetadata = JSON.parse(this.data.item.metadata);
        this.listImages = this.parseMetadata.images;
        if(this.parseMetadata.video) {
          this.getEmbed(this.parseMetadata.video)
        }
      }
    }
    else if(this.data.type === 'Create') {
      this.listImages = this.data.item.metadata.images;
      if(this.data.item.metadata.video) {
        this.getEmbed(this.data.item.metadata.video);
      }
    }
  }

  getEmbed(videoUrl: string) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = videoUrl.match(regExp);
    this.videoLink =
      'https://www.youtube.com/embed/' +
      (match && match[2].length === 11 ? match[2] : '');
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
