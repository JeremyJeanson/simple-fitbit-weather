declare module "simple-fitbit-weather/app" {
    export interface Weather {
        temperatureC: number;
        temperatureF: number;
        location: string;
        description: string;
        isDay: boolean;
        conditionCode: number;
        realConditionCode: string;
        sunrise: number;
        sunset: number;
        timestamp: number;
    }
    function initialize(callback: (data: Weather) => void): void;
}