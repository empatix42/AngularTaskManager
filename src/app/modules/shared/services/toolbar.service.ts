import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  filterValue = new Subject<string>();
  selectedSortOrder = new Subject<string>();
  selectedSortKey = new Subject<string>();

  constructor() {}
}
