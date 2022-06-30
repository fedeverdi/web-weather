export default class WeatherClient {
    private lat;
    private lng;
    private baseUrl;
    private axios;
    private translate;
    private codiciMeteo;
    constructor(lang?: string);
    /**
     * Imposta la location
     * @param lat
     * @param lng
     */
    setLocation(lat: number, lng: number): void;
    /**
     * Ritorna la latitudine
     * @returns latitudine
     */
    getLat(): number;
    /**
     * Ritorna la longitudine
     * @returns longitudine
     */
    getLng(): number;
    /**
     * Ritorna il testo dal codice meteo
     * @param codice
     * @returns
     */
    getCodiceMeteo(codice: number): any;
    getIconaMeteo(codice: number): any;
    getBackgroundMeteo(codice: number): any;
    /**
     * Effettua la chiamata a Open Meteo Api
     */
    getData(): Promise<any>;
}
