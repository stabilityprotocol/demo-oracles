"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherDataProvider = exports.responseOpenWeatherSchema = void 0;
const Enum_1 = require("../Utils/Enum");
const Config_1 = require("../Config");
const zod_1 = require("zod");
const inversify_1 = require("inversify");
var City;
(function (City) {
    City["MADRID"] = "MADRID";
    City["LOS_ANGELES"] = "LOS_ANGELES";
    City["TORONTO"] = "TORONTO";
    City["NEW_YORK_CITY"] = "NEW_YORK_CITY";
    City["ANDORRA_LA_VELLA"] = "ANDORRA_LA_VELLA";
    City["SINGAPORE"] = "SINGAPORE";
})(City || (City = {}));
exports.responseOpenWeatherSchema = zod_1.z.object({
    main: zod_1.z.object({
        temp: zod_1.z.number()
    })
});
let WeatherDataProvider = class WeatherDataProvider {
    getCoordinates(city) {
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
                return (0, Enum_1.exhaustiveCheck)(city);
        }
    }
    async getCurrentWeather() {
        const cities = Object.values(City);
        const weathers = await Promise.all(cities.map(async (city) => {
            const { lat, lon } = this.getCoordinates(city);
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Config_1.config.OPEN_WEATHER_API_KEY}`);
            const data = await response.json();
            const parsedData = exports.responseOpenWeatherSchema.parse(data);
            return {
                city,
                temperature: parsedData.main.temp
            };
        }));
        return weathers;
    }
};
WeatherDataProvider = __decorate([
    (0, inversify_1.injectable)()
], WeatherDataProvider);
exports.WeatherDataProvider = WeatherDataProvider;
//# sourceMappingURL=Weather.js.map