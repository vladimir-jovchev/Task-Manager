import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

 createNewlist(){
    return this.taskService.createList("TitleTest").subscribe((res: any)=>{
      console.log(res);
    });
  }
    
}


