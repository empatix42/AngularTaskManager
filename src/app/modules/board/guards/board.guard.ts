import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../../core/services/data-storage.service';

@Injectable({ providedIn: 'root' })
export class BoardGuard implements CanActivate {
  constructor(
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const boards =
      this.dataStorageService.boards ||
      JSON.parse(localStorage.getItem('boards')!);

    const board = boards.find((board) => {
      return board['id'] === route.params['id'];
    })!;

    return board ? true : this.router.createUrlTree(['/dashboard']);
  }
}
