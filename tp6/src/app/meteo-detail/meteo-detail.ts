import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeteoService } from '../services/meteo';

@Component({
  selector: 'app-meteo-detail',
  templateUrl: './meteo-detail.html',
  styleUrls: ['./meteo-detail.css'],
  standalone: false,
})
export class MeteoDetailComponent implements OnInit {
  meteo: any;
  latlon: string = '';

  constructor(
    private route: ActivatedRoute,
    private meteoService: MeteoService
  ) {}

  ngOnInit(): void {
    this.getMeteo();
  }

  getMeteo(): void {
    const name = this.route.snapshot.paramMap.get('name');

    console.log('getMeteo pour', name);
    if (name) {
      this.meteoService
        .getMeteo(name)
        .then((response: any) => {
          this.meteo = response;
          this.latlon = `${this.meteo.coord.lat},${this.meteo.coord.lon}`;
        })
        .catch((fail: any) => {
          this.meteo = fail;
        });
    }
  }
}



