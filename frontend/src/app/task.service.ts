import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private WebReqService: WebRequestService) { }

  createList(title: string){
    //send web req to create new list
    return this.WebReqService.post("lists", {title});
  }
}
