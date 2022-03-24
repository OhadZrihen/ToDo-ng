import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

export interface Task {
  name:string;
  isUpdated:boolean;
  isVisible:boolean;
}
enum SortOptions {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none'

}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  tasks:Task[] = [];
  SortEnum = SortOptions;
  sorted = SortOptions.NONE;
  constructor() {
    
   }

  ngOnInit(): void {
  }
handelSubmit(addForm:NgForm){
  let newTask:Task = {name:addForm.value.task,isUpdated: false,isVisible:true}
  this.tasks.push({ name: addForm.value.task , isUpdated:false,isVisible:true });
  addForm.resetForm();
}
handelRemove(t:string){
this.tasks = this.tasks.filter((myTask:Task)=> myTask.name != t);
}
handelUpdate(t:Task){
  t.isUpdated = true;
}
handelFinishUpdate(oldName:string,newTaskName:string){
  let updatedTask:Task = this.tasks.filter((t)=>t.name === oldName)[0];
  updatedTask.name = newTaskName;
  updatedTask.isUpdated = false;
   
}
handleSort(direction:SortOptions){
  
  if(direction==this.sorted){
    this.sorted = SortOptions.NONE;
    return;
  }
  this.sorted == direction;
  switch (direction) {
    case SortOptions.ASC:
      this.tasks = this.tasks.sort((a:Task,b:Task)=>{
        let aLower = a.name.toLowerCase();
        let bLower = b.name.toLowerCase();
        if (aLower<bLower){
          return -1;
        }
        if (aLower>bLower){
          return 1;
        }
        return 0;
      })
      break;
      case SortOptions.DESC:
        this.tasks = this.tasks.sort((a:Task,b:Task)=>{
          let aLower = a.name.toLowerCase();
          let bLower = b.name.toLowerCase();
          if (aLower<bLower){
            return 1;
          }
          if (aLower>bLower){
            return -1;
          }
          return 0;
        })
        break;

    
    default:
      
      break;
  }
}
handleSearch(value:string){
  this.tasks.map((task)=>{
    task.isVisible = (task.name.includes(value));
  })
}
}
