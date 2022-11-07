import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(array: any[], filterValue: string): any[] {
    let filteredArray;

    filteredArray = array?.filter((item) => {
      return item.name
        ? item.name?.toLowerCase().includes(filterValue?.toLowerCase())
        : item.todo?.toLowerCase().includes(filterValue?.toLowerCase());
    });

    return filterValue ? filteredArray : array;
  }
}
