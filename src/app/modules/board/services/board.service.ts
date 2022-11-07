import { Injectable } from '@angular/core';
import { Task } from '../../shared/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor() {}

  getTasksByStatus(tasks: Task[], status: string) {
    return tasks.filter((task) => task.status === status);
  }
}
