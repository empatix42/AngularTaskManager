import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(array: any[], sortKey: string, sortOrder: string): any[] {
    if (!sortKey || !sortOrder) return array;

    if (sortKey === 'todo' || sortKey === 'inProgress' || sortKey === 'done') {
      array.sort((a: any, b: any) => {
        const filteredA =
          a.tasks?.filter((task: Task) => task.status === sortKey) || [];
        const filteredB =
          b.tasks?.filter((task: Task) => task.status === sortKey) || [];

        return filteredA < filteredB ? -1 : 1;
      });
    } else {
      array.sort((a: any, b: any) => {
        return a[sortKey] < b[sortKey] ? -1 : 1;
      });
    }

    return sortOrder === 'asc' ? array : array.reverse();
  }
}
