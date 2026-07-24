import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-block.component.html',
  styleUrl: './loading-block.component.scss'
})
export class LoadingBlockComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private loadingService: LoadingService) {
    this.isLoading$ = this.loadingService.isLoading$;
  }

  ngOnInit(): void {}
}
