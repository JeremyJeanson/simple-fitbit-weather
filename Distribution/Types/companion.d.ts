declare module "simple-fitbit-weather/companion" {
    // Providers
    enum Providers {
        openweathermap = "owm",
        darksky = "darksky",
        weatherbit = "weatherbit"
    }

    // Configuration
    export interface Configuration {
        _provider: Providers;
        _key: string;
        _refreshInterval: number;
        _maximumAge: number;
    }

    // Initialize the module
    function initialize(configuration: Configuration): void;

    // Refresh weather data
    function refresh(): void;
}