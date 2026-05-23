import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  transition,
  query,
  stagger,
  animate,
  style,
} from '@angular/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { FighterService } from '../../core/services/fighter.service';
import { Fighter } from '../../core/models/fighter.model';
import { FighterCardComponent } from '../../shared/components/fighter-card/fighter-card.component';
import { FighterGridComponent } from '../../shared/components/fighter-grid/fighter-grid.component';

export const listAnimation = trigger('listAnim', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        stagger(80, [
          animate(
            '400ms cubic-bezier(0.35, 0, 0.25, 1)',
            style({ opacity: 1, transform: 'translateY(0)' })
          ),
        ]),
      ],
      { optional: true }
    ),
  ]),
]);

@Component({
  selector: 'app-fighter-list',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    FighterCardComponent,
    FighterGridComponent,
  ],
  templateUrl: './fighter-list.component.html',
  styleUrl: './fighter-list.component.scss',
  animations: [listAnimation],
})
export class FighterListComponent implements OnInit {
  private readonly fighterService = inject(FighterService);
  private readonly router = inject(Router);

  fighters: Fighter[] = [];
  loading = true;
  error = false;
  viewMode: 'cards' | 'table' = 'cards';

  ngOnInit(): void {
    this.fighterService.getAll().subscribe({
      next: (data) => {
        this.fighters = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }

  navigateToDetail(fighter: Fighter): void {
    this.router.navigate(['/fighters', fighter.idPlayer]);
  }
}
