import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  createList(title: string){
    return this.taskService.createList(title).subscribe((res: any)=>{
      console.log(res);
      
      //navigate to /lists/res:id

    });
  }

}
