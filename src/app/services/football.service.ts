import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FootballService {
  private apiKey = '73effe53b514fe164eb475247efecbe2';
  private API = 'https://v3.football.api-sports.io';
  private readonly currentYear: number = new Date().getFullYear(); // Get the current year

  private readonly leagueId = {
    england: 39,
    spain: 107,
    germany: 78,
    itlay: 71,
    france: 61,
  };

  selectedLeague: string;

  constructor(private http: HttpClient) {}

  getStandings(league: string, season: string = this.currentYear.toString()) {
    this.selectedLeague = league;
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io/fixtures',
      'x-rapidapi-key': this.apiKey,
    });

    return this.http
      .get(
        `${this.API}/standings?league=${this.leagueId[league]}&season=${season}`,
        { headers }
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  /*********Get team data************ */

  getTeamScoresTop10(
    teamId: number,
    season: string = this.currentYear.toString()
  ) {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io/fixtures',
      'x-rapidapi-key': this.apiKey,
    });

    return this.http
      .get(`${this.API}/fixtures?team=${teamId}&season=${season}&last=10`, {
        headers,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
