import { exhaustiveCheck } from "../Utils/Enum";
import { config } from "../Config";
import { z } from "zod";
import { injectable } from "inversify";

enum City {
    MADRID = "MADRID",
    LOS_ANGELES = "LOS_ANGELES",
    TORONTO = "TORONTO",
    NEW_YORK_CITY = "NEW_YORK_CITY",
    ANDORRA_LA_VELLA = "ANDORRA_LA_VELLA",
    SINGAPORE = "SINGAPORE"
}

interface Weather {
    city: City;
    temperature: number;
}

export const responseOpenWeatherSchema = z.object({
    main: z.object({
        temp: z.number()
    })
});

@injectable()
export class WeatherDataProvider {
    private getCoordinates(city: City): { lat: number, lon: number } {
        switch (city) {
            case City.MADRID:
                return { lat: 40.53, lon: -3.8150 };
            case City.LOS_ANGELES:
                return { lat: 34.05, lon: -118.25 };
            case City.TORONTO:
                return { lat: 43.72, lon: -79.38 };
            case City.NEW_YORK_CITY:
                return { lat: 40.76, lon: -73.97 };
            case City.ANDORRA_LA_VELLA:
                return { lat: 42.51, lon: 1.52 };
            case City.SINGAPORE:
                return { lat: 1.35, lon: 103.82 };
            default:
                return exhaustiveCheck(city);
        }
    }

    public async getCurrentWeather(): Promise<Weather[]> {
        const cities = Object.values(City);
        const weathers = await Promise.all(cities.map(async city => {
            const { lat, lon } = this.getCoordinates(city);
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${config.OPEN_WEATHER_API_KEY}`);
            const data = await response.json();

            const parsedData = responseOpenWeatherSchema.parse(data);
            
            return {
                city,
                temperature: parsedData.main.temp
            }
        }));
        return weathers;
    }
}