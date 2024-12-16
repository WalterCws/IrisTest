import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule   } from '@angular/forms';
import { TaskDTO } from '../../models/taskDTO';
import { ApiService } from '../../services/api.service';
import { ApiResponse } from '../../models/ApiResponse';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NgFor,NgIf,FormsModule,ReactiveFormsModule,NgClass],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  options = ['All', 'Done', 'Pending', 'Expired'];
  selectedOption: string = this.options[0];
  tasks : TaskDTO[] = []
  showTasks: TaskDTO[] = this.tasks;
  form: FormGroup;
  today: string;

  constructor(private fb: FormBuilder, private apiService: ApiService, private datePipe: DatePipe) {
    const todayDate = new Date();
    const offset = todayDate.getTimezoneOffset()
    const today = new Date(todayDate.getTime() - (offset*60*1000))

    this.today = today.toISOString().split('T')[0];
    this.form = this.fb.group({
      description: ['', Validators.required],
      deadlineAt: ['']
    });

    apiService.getJWTToken().subscribe((response: any) => {  
      localStorage.setItem('jwt', response.data);
    });

     this.getAllTask();
  }

  getAllTask(){
    this.apiService.getAllTask().subscribe((response: ApiResponse<TaskDTO[]>) => {
      this.tasks = response.data;
      this.tasks.forEach(s => {
        if(s.deadlineAt != null){
          s.deadlineAt = new Date(s.deadlineAt)
        }
      })
      this.showTasks = this.tasks;
      this.onSelectOption();
    });
  }

  onSelectOption() {
    let today = new Date()
    switch(this.selectedOption){     
      case "Done" : 
      this.showTasks = this.tasks.filter(s => s.isCompleted);
      break;
      case "Pending" : 
      this.showTasks = this.tasks.filter(s => !s.isCompleted);
      break;
      case "Expired" : 
      this.showTasks = this.tasks.filter(s => {
        return s.deadlineAt != null && s.deadlineAt.getTime() <  today.getTime()
      } );
      break;
      default: 
      this.showTasks = this.tasks;
    }
  }

  onCompleteTask(task: TaskDTO){    
    this.apiService.completeTask(task).subscribe(() => {
      this.getAllTask()
    });
  }

  onFavouriteTask(task: TaskDTO){
    this.apiService.favouriteTask(task).subscribe(() => {
      this.getAllTask()
    });
  }

  onDeleteTask(task: TaskDTO){    
    this.apiService.deleteTask(task).subscribe(() => {
      this.getAllTask()
    });
  }

  onSubmit(){
    if(this.form.valid){
      let task = { 
        deadlineAt: this.form.value.deadlineAt == "" ? null : this.form.value.deadlineAt,
        description: this.form.value.description
      };
      
      this.apiService.createTask(task).subscribe(() => {
        this.form.reset()
        this.getAllTask()
      })
    }
  }
}
