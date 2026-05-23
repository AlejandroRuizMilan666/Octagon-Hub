import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Fighter } from '../../../core/models/fighter.model';

@Component({
  selector: 'app-fighter-grid',
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  template: `
    <div class="table-container">
      <table mat-table [dataSource]="fighters" class="fighters-table">

        <ng-container matColumnDef="thumb">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let fighter">
            <img
              [src]="fighter.strThumb ?? fighter.strCutout ?? 'assets/placeholder-fighter.svg'"
              [alt]="fighter.strPlayer"
              class="row-thumb"
              (error)="onImgError($event)"
            />
          </td>
        </ng-container>

        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Fighter</th>
          <td mat-cell *matCellDef="let fighter">
            <div class="fighter-name">{{ fighter.strPlayer }}</div>
            @if (fighter.strPlayerAlternate) {
              <div class="fighter-nickname">&ldquo;{{ fighter.strPlayerAlternate }}&rdquo;</div>
            }
          </td>
        </ng-container>

        <ng-container matColumnDef="nationality">
          <th mat-header-cell *matHeaderCellDef>Nationality</th>
          <td mat-cell *matCellDef="let fighter">{{ fighter.strNationality ?? '—' }}</td>
        </ng-container>

        <ng-container matColumnDef="weight">
          <th mat-header-cell *matHeaderCellDef>Weight Class</th>
          <td mat-cell *matCellDef="let fighter">{{ fighter.strTeam }}</td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let fighter">
            <span
              class="status-badge"
              [class.active]="fighter.strStatus === 'Active'"
              [class.retired]="fighter.strStatus !== 'Active'"
            >{{ fighter.strStatus ?? '—' }}</span>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr
          mat-row
          *matRowDef="let fighter; columns: displayedColumns"
          class="clickable-row"
          (click)="selectFighter(fighter)"
        ></tr>
      </table>
    </div>
  `,
  styles: [
    `
      .table-container {
        overflow-x: auto;
        border-radius: 8px;
        border: 1px solid #333;
      }
      .fighters-table {
        width: 100%;
        background: #1e1e1e;
      }
      .row-thumb {
        width: 48px;
        height: 48px;
        object-fit: cover;
        border-radius: 50%;
        border: 2px solid #444;
        display: block;
      }
      .fighter-name {
        font-weight: 600;
        color: #fff;
        font-size: 0.9rem;
      }
      .fighter-nickname {
        font-size: 0.75rem;
        color: #aaa;
        font-style: italic;
      }
      .clickable-row {
        cursor: pointer;
        transition: background 0.15s ease;
      }
      .clickable-row:hover {
        background: rgba(183, 28, 28, 0.12) !important;
      }
      th.mat-header-cell {
        color: #e53935;
        font-weight: 600;
        font-size: 0.85rem;
        border-bottom: 2px solid #b71c1c;
        background: #1a1a1a;
      }
      td.mat-cell {
        color: #ddd;
        border-bottom: 1px solid #2a2a2a;
      }
      .status-badge {
        display: inline-block;
        padding: 2px 10px;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 500;
      }
      .status-badge.active {
        background: rgba(76, 175, 80, 0.2);
        color: #81c784;
        border: 1px solid #388e3c;
      }
      .status-badge.retired {
        background: rgba(158, 158, 158, 0.12);
        color: #aaa;
        border: 1px solid #555;
      }
    `,
  ],
})
export class FighterGridComponent {
  @Input({ required: true }) fighters: Fighter[] = [];
  @Output() fighterSelected = new EventEmitter<Fighter>();

  readonly displayedColumns = ['thumb', 'name', 'nationality', 'weight', 'status'];

  selectFighter(fighter: Fighter): void {
    this.fighterSelected.emit(fighter);
  }

  onImgError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/placeholder-fighter.svg';
  }
}
