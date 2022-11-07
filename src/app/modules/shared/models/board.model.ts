import { Task } from './task.model';

export class Board {
  constructor(
    public name?: string,
    public description?: string,
    public dateOfCreation?: Date,
    public tasks?: Task[],
    public id?: string
  ) {}
}
