import { Injectable } from '@angular/core';
import { Hacker } from '../models/hacker';
import { IHacker } from '../models/IHacker';
import { HackerFormComponent } from '../component/hacker-form/hacker-form.component';

@Injectable({
  providedIn: 'root'
})
export class ManagerHackerService {

  constructor(data : HackerFormComponent) { }

  /**
   * Get hackers stored locally on client side (localStorage)
   * @returns list of Hackers
   */
  getAllHackers(): Hacker[] {
    return JSON.parse(localStorage.getItem('badguys') || '[]');
  }

  setAllHackerInLS(data : Array<String>) {
    localStorage.setItem('badguys', JSON.stringify(data));
  }

  //editHacker(hacker: IHacker) {
  //  this.editHackerEvent.emit(hacker)  
  //}

}