import { Component, OnInit } from '@angular/core';
import { MeteoItem } from '../meteoItem';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.html',
  styleUrls: ['./meteo.css'],
  standalone: false,
})
export class MeteoComponent implements OnInit {
  city: MeteoItem = {
    name: '',
    id: 0,
    weather: null,
  };

  cityList: MeteoItem[] = [];

  constructor() {}

  ngOnInit() {
    const storedList = localStorage.getItem('cityList');

    if (storedList !== undefined && storedList !== null) {
      this.cityList = JSON.parse(storedList);
    } else {
      this.cityList = [];
    }
  }

  onSubmit() {
    if (
      this.city.name !== undefined &&
      this.isCityExist(this.city.name) === false
    ) {
      const currentCity = new MeteoItem();
      currentCity.name = this.city.name;
      this.cityList.push(currentCity);

      this.saveCityList();

      console.log(this.city.name, 'ajoutée dans la liste');
    } else {
      console.log(this.city.name, 'existe déjà dans la liste');
    }
  }

  remove(_city: MeteoItem) {
    this.cityList = this.cityList.filter(
      (item: MeteoItem) => item.name != _city.name
    );
    this.saveCityList();
  }

  isCityExist(_cityName: string) {
    return (
      this.cityList.filter(
        (item: MeteoItem) =>
          item.name?.toUpperCase() == _cityName.toUpperCase()
      ).length > 0
    );
  }

  saveCityList() {
    localStorage.setItem('cityList', JSON.stringify(this.cityList));
  }
}


