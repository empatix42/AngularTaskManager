import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorAlertComponent implements OnInit {
  @Input() errorMessage!: string | null;
  constructor() {}

  ngOnInit(): void {}
}
