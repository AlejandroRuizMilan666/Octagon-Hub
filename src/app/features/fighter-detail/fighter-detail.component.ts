import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FighterService } from '../../core/services/fighter.service';
import { Fighter } from '../../core/models/fighter.model';

export const expandAnimation = trigger('expandAnim', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('350ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' })),
  ]),
]);

@Component({
  selector: 'app-fighter-detail',
  standalone: true,
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './fighter-detail.component.html',
  styleUrl: './fighter-detail.component.scss',
  animations: [expandAnimation],
})
export class FighterDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fighterService = inject(FighterService);

  fighter: Fighter | null = null;
  loading = true;
  showDetails = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fighterService.getById(id).subscribe({
        next: (f) => {
          this.fighter = f;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
    } else {
      this.loading = false;
    }
  }

  get portraitImage(): string {
    if (!this.fighter) return '';
    return (
      this.fighter.strCutout ??
      this.fighter.strRender ??
      this.fighter.strThumb ??
      ''
    );
  }

  get bannerImage(): string {
    if (!this.fighter) return '';
    return this.fighter.strBanner ?? this.fighter.strFanart1 ?? '';
  }

  get profileDetails(): { label: string; value: string }[] {
    if (!this.fighter) return [];
    const raw: { label: string; value: string | null }[] = [
      { label: 'Nationality', value: this.fighter.strNationality },
      { label: 'Birthplace', value: this.fighter.strBirthLocation },
      { label: 'Date of Birth', value: this.fighter.dateBorn },
      { label: 'Height', value: this.fighter.strHeight },
      { label: 'Weight', value: this.fighter.strWeight },
      { label: 'Status', value: this.fighter.strStatus },
      { label: 'Division', value: this.fighter.strTeam },
      { label: 'Gender', value: this.fighter.strGender },
    ];
    return raw
      .filter((d) => d.value !== null && d.value !== '')
      .map((d) => ({ label: d.label, value: d.value as string }));
  }

  get mediaImages(): string[] {
    if (!this.fighter) return [];
    return [
      this.fighter.strFanart1,
      this.fighter.strFanart2,
      this.fighter.strFanart3,
      this.fighter.strFanart4,
      this.fighter.strCutout,
      this.fighter.strRender,
    ].filter((url): url is string => !!url);
  }

  goBack(): void {
    this.router.navigate(['/fighters']);
  }

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  onImgError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/placeholder-fighter.svg';
  }
}
