import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Fighter, FighterDetailResponse, FightersListResponse } from '../models/fighter.model';

@Injectable({ providedIn: 'root' })
export class FighterService {
  private readonly http = inject(HttpClient);
  private readonly BASE = 'https://www.thesportsdb.com/api/v1/json/123';
  private readonly UFC_LIGHTWEIGHT_ID = '149271';

  getAll(): Observable<Fighter[]> {
    return this.http
      .get<FightersListResponse>(
        `${this.BASE}/lookup_all_players.php?id=${this.UFC_LIGHTWEIGHT_ID}`
      )
      .pipe(map((res) => res.player ?? []));
  }

  getById(id: string): Observable<Fighter | null> {
    return this.http
      .get<FighterDetailResponse>(`${this.BASE}/lookupplayer.php?id=${id}`)
      .pipe(map((res) => res.players?.[0] ?? null));
  }
}
