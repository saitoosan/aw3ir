import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MeteoService {
  constructor() {}

  getMeteo(name: string): Promise<any> {
    console.log('from service', name);

    const url =
      'https://api.openweathermap.org/data/2.5/weather?q=' +
      encodeURIComponent(name) +
      '&units=metric&lang=fr&appid=ba95b6c074ac5a2288c3a1c4e0f76b2f';

    return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log('API response:', json);

        if (json.cod === 200 || json.cod === '200') {
          return Promise.resolve(json);
        } else {
          console.error(
            'Météo introuvable pour ' + name + ' (' + json.message + ')'
          );
          return Promise.reject(json);
        }
      });
  }
}

