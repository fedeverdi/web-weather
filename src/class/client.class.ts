import axios from 'axios';
import Translate from '../lang/translate';
import ClearSky from '../assets/background/clearsky.webp';
import Cloud from '../assets/background/cloud.webp';
import Fog from '../assets/background/fog.webp';
import Rain from '../assets/background/rain.webp';
import Snow from '../assets/background/snow.webp';
import Storm from '../assets/background/storm.webp';

import DayIcon from '../assets/icons/day.svg';
import CloudDay1Icon from '../assets/icons/cloudy-day-1.svg';
import CloudDay2Icon from '../assets/icons/cloudy-day-2.svg';
import CloudYIcon from '../assets/icons/cloudy.svg';
import Rainy1Icon from '../assets/icons/rainy-1.svg';
import Rainy2Icon from '../assets/icons/rainy-2.svg';
import Rainy5Icon from '../assets/icons/rainy-5.svg';
import Rainy7Icon from '../assets/icons/rainy-7.svg';
import Snowy1Icon from '../assets/icons/snowy-1.svg';
import Snowy3Icon from '../assets/icons/snowy-3.svg';
import Snowy6Icon from '../assets/icons/snowy-6.svg';
import ThunderIcon from '../assets/icons/thunder.svg';

export default class WeatherClient {

    private lat: number = 0;
    private lng: number = 0;
    private baseUrl: string = 'https://api.open-meteo.com/v1/forecast';
    private axios = axios;
    private translate = new Translate();
    private codiciMeteo: any[] = [];

    constructor(lang = "en") {
        this.codiciMeteo = [
            {
                codice: 0,
                testo: this.translate[lang as keyof typeof this.translate].cielo_limpido,
                icona: DayIcon,
                background: ClearSky,
            },
            {
                codice: 1,
                testo: this.translate[lang as keyof typeof this.translate].principalmente_chiaro,
                icona: CloudDay1Icon,
                background: ClearSky
            },
            {
                codice: 2,
                testo: this.translate[lang as keyof typeof this.translate].parzialmente_nuvoloso,
                icona: CloudDay2Icon,
                background: Cloud
            },
            {
                codice: 3,
                testo: this.translate[lang as keyof typeof this.translate].nuvoloso,
                icona: CloudYIcon,
                background: Cloud
            },
            {
                codice: 45,
                testo: this.translate[lang as keyof typeof this.translate].nebbia,
                icona: CloudYIcon,
                background: Fog
            },
            {
                codice: 48,
                testo: this.translate[lang as keyof typeof this.translate].depositi_brina,
                icona: CloudYIcon,
                background: ClearSky
            },
            {
                codice: 51,
                testo: this.translate[lang as keyof typeof this.translate].pioggia_leggera,
                icona: Rainy1Icon,
                background: Rain
            },
            {
                codice: 53,
                testo: this.translate[lang as keyof typeof this.translate].pioggia_moderata,
                icona: Rainy2Icon,
                background: Rain
            },
            {
                codice: 55,
                testo: this.translate[lang as keyof typeof this.translate].pioggia_intensa,
                icona: Rainy7Icon,
                background: Rain
            },
            {
                codice: 56,
                testo: this.translate[lang as keyof typeof this.translate].pioggia_ghiacciata_leggera,
                icona: Snowy1Icon,
                background: Rain
            },
            {
                codice: 57,
                testo: this.translate[lang as keyof typeof this.translate].pioggia_ghiacciata_moderata,
                icona: Snowy3Icon,
                background: Snow
            },
            {
                codice: 61,
                testo: this.translate[lang as keyof typeof this.translate].lievi_temporali,
                icona: Rainy7Icon,
                background: Rain
            },
            {
                codice: 63,
                testo: this.translate[lang as keyof typeof this.translate].moderati_temporali,
                icona: Rainy7Icon,
                background: Storm
            },
            {
                codice: 65,
                testo: this.translate[lang as keyof typeof this.translate].forti_temporali,
                icona: ThunderIcon,
                background: Storm
            },
            {
                codice: 66,
                testo: this.translate[lang as keyof typeof this.translate].leggera_grandine,
                icona: Rainy2Icon,
                background: Rain
            },
            {
                codice: 67,
                testo: this.translate[lang as keyof typeof this.translate].forti_grandinate,
                icona: Rainy5Icon,
                background: ClearSky
            },
            {
                codice: 71,
                testo: this.translate[lang as keyof typeof this.translate].lievi_nevicate,
                icona: Snowy1Icon,
                background: Snow
            },
            {
                codice: 73,
                testo: this.translate[lang as keyof typeof this.translate].moderate_nevicate,
                icona: Snowy3Icon,
                background: Snow
            },
            {
                codice: 75,
                testo: this.translate[lang as keyof typeof this.translate].forti_nevicate,
                icona: Snowy6Icon,
                background: Snow
            },
            {
                codice: 77,
                testo: this.translate[lang as keyof typeof this.translate].neve_ghiacciata,
                icona: Snowy6Icon,
                background: Snow
            },
            {
                codice: 80,
                testo: this.translate[lang as keyof typeof this.translate].acquazzoni_leggeri,
                icona: Rainy7Icon,
                background: Rain
            },
            {
                codice: 81,
                testo: this.translate[lang as keyof typeof this.translate].acquazzoni_moderati,
                icona: Rainy7Icon,
                background: Rain
            },
            {
                codice: 82,
                testo: this.translate[lang as keyof typeof this.translate].acquazzoni_forti,
                icona: ThunderIcon,
                background: Storm
            },
            {
                codice: 85,
                testo: this.translate[lang as keyof typeof this.translate].forti_nevicate,
                icona: Snowy6Icon,
                background: Snow
            },
            {
                codice: 86,
                testo: this.translate[lang as keyof typeof this.translate].forti_nevicate,
                icona: Snowy6Icon,
                background: Snow
            },
            {
                codice: 95,
                testo: this.translate[lang as keyof typeof this.translate].temporali_moderati,
                icona: ThunderIcon,
                background: Storm
            },
            {
                codice: 96,
                testo: this.translate[lang as keyof typeof this.translate].temporali_moderati,
                icona: ThunderIcon,
                background: Storm
            },
            {
                codice: 99,
                testo: this.translate[lang as keyof typeof this.translate].temporali_moderati,
                icona: ThunderIcon,
                background: Storm
            }
        ];
    }

    /**
     * Imposta la location
     * @param lat 
     * @param lng 
     */
    public setLocation(lat: number, lng: number) {
        this.lat = lat;
        this.lng = lng;     
    }

    /**
     * Ritorna la latitudine
     * @returns latitudine
     */
    public getLat() {
       return this.lat; 
    }

    /**
     * Ritorna la longitudine
     * @returns longitudine
     */
    public getLng() {
        return this.lng;
    }

    /**
     * Ritorna il testo dal codice meteo
     * @param codice 
     * @returns 
     */
    public getCodiceMeteo(codice: number) {
        let find = this.codiciMeteo.find( item => {
            return item.codice === codice;
        });

        return find ? find.testo : 'Nessuno';
    }

    public getIconaMeteo(codice: number) {
        let find = this.codiciMeteo.find( item => {
            return item.codice === codice;
        });

        return find ? find.icona : null;
    }

    public getBackgroundMeteo(codice: number) {
        let find = this.codiciMeteo.find( item => {
            return item.codice === codice;
        });

        return find ? find.background : null;
    }

    /**
     * Effettua la chiamata a Open Meteo Api
     */
    public getData(): Promise<any> {
        if(!this.getLat() || !this.getLng()) {
            throw new Error("Deve essere impostata sia la latitudine che la longitudine");
        }
        return new Promise((resolve, reject) => {
            this.axios
              .get(this.baseUrl + '?latitude=' + this.lat + '&longitude=' + this.lng + '&current_weather=true&daily=sunrise|sunset|weathercode&timezone=Europe%2FBerlin')
              .then((resp) => {
                resolve(resp.data);
              })
              .catch(reject);
          });
    }

}