import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
  private Source = new BehaviorSubject('');
  data = this.Source.asObservable();

  constructor() { }

  changeData(data: any) {
    this.Source.next(data);
  }
}