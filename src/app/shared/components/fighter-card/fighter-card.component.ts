import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Fighter } from '../../../core/models/fighter.model';

@Component({
  selector: 'app-fighter-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  template: `
    <mat-card class="fighter-card" (click)="select()">
      <div class="card-image-wrapper">
        <img
          [src]="imageUrl"
          [alt]="fighter.strPlayer"
          class="fighter-img"
          (error)="onImgError($event)"
        />
      </div>
      <mat-card-content>
        <h3 class="fighter-name">{{ fighter.strPlayer }}</h3>
        @if (fighter.strPlayerAlternate) {
          <p class="fighter-nickname">&ldquo;{{ fighter.strPlayerAlternate }}&rdquo;</p>
        }
        <div class="fighter-meta">
          <span class="meta-item">
            <mat-icon>flag</mat-icon>{{ fighter.strNationality ?? 'Unknown' }}
          </span>
          <span class="meta-item">
            <mat-icon>monitor_weight</mat-icon>{{ fighter.strWeight ?? '—' }}
          </span>
        </div>
        <span
          class="status-badge"
          [class.active]="fighter.strStatus === 'Active'"
          [class.retired]="fighter.strStatus !== 'Active'"
        >{{ fighter.strStatus ?? 'Unknown' }}</span>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .fighter-card {
        cursor: pointer;
        background: #1e1e1e;
        border: 1px solid #333;
        transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        overflow: hidden;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      .fighter-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(183, 28, 28, 0.4);
        border-color: #b71c1c;
      }
      .card-image-wrapper {
        height: 220px;
        overflow: hidden;
        background: #121212;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .fighter-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      mat-card-content {
        padding: 12px 16px 16px;
      }
      .fighter-name {
        color: #fff;
        margin: 0 0 4px;
        font-size: 1rem;
        font-weight: 600;
        line-height: 1.3;
      }
      .fighter-nickname {
        color: #aaa;
        font-style: italic;
        margin: 0 0 8px;
        font-size: 0.85rem;
      }
      .fighter-meta {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 10px;
      }
      .meta-item {
        display: flex;
        align-items: center;
        gap: 6px;
        color: #ccc;
        font-size: 0.8rem;
      }
      .meta-item mat-icon {
        font-size: 14px;
        width: 14px;
        height: 14px;
        color: #e53935;
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
export class FighterCardComponent {
  @Input({ required: true }) fighter!: Fighter;
  @Output() fighterClick = new EventEmitter<Fighter>();

  get imageUrl(): string {
    return (
      this.fighter.strThumb ??
      this.fighter.strCutout ??
      'assets/placeholder-fighter.svg'
    );
  }

  select(): void {
    this.fighterClick.emit(this.fighter);
  }

  onImgError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/placeholder-fighter.svg';
  }
}
