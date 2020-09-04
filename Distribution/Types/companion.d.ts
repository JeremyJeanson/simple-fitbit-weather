declare module "simple-fitbit-weather/companion" {
    // Providers
    enum Providers {
        openweathermap = "owm",
        darksky = "darksky",
        weatherbit = "weatherbit"
    }

    // Configuration
    interface Configuration {
        provider: Providers;
        apiKey: string;
        refreshInterval: number;
        maximumAge: number;
    }

    // Initialize the module
    function initialize(configuration: Configuration): void;

    // Refresh weather data
    function refresh(): void;
}