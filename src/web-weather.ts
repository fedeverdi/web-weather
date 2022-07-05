import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import WeatherClient from './class/client.class';
import {styleMap} from 'lit-html/directives/style-map.js';
import Translate from './lang/translate';
import { style } from './assets/styles/theme1.css';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */

@customElement('web-weather')
export class MyElement extends LitElement {
  @property({ type: String }) title = 'Il meteo';
  // Location
  @property({ type: Number }) lat = 44.86;
  @property({ type: Number }) lng = 10.60;
  // Style
  @property({ type: String }) backcolor = 'transparent';
  @property({ type: String }) lang = "en";
  @property({ type: String }) bdcolor = 'black';
  @property({ type: String }) color = 'black';
  @property({ type: String }) size = '0' + 'px';
  @property({ type: String }) padding = '0' + 'px';
  @property({ type: String }) bdradius = '0' + 'px';
  @property({ type: String }) bdsize = '0';
  @property({ type: Boolean }) shadow = false;
  @property({ type: Boolean }) backgroundmode = false
  @property({ type: Boolean }) iconsmode = false
  @property({ type: Boolean }) nextdays = false

  public data: any = null;
  public meteoClient = new WeatherClient();
  private loading = false;
  private traduzioni = new Translate();

  static styles = style;

  connectedCallback(): void {
    this.propertyValidate();
    super.connectedCallback();
    this.meteoClient = new WeatherClient(this.lang);
    this.loading = true;
    this.meteoClient.setLocation(this.lat, this.lng);
    this.meteoClient.getData().then((res) => {
      this.loading = false;
      this.data = res;
      this.requestUpdate();
    });
  }

  propertyValidate() {
    if(this.lang !== 'en' && this.lang !== 'it') {
      throw new Error("Language not available");
    }

    if(this.backgroundmode && this.iconsmode) {
      throw new Error("You cannot set background and icons at the same time");
      
    }
  }

  render() {
    const styles = {
      backgroundColor: this.backcolor,
      padding: this.padding + 'px',
      color: this.color,
      fontSize: this.size + 'em',
      fontFamily: 'Arial',
      borderRadius: this.bdradius + 'px',
      border: this.bdsize + 'px solid ' + this.bdcolor,
      boxShadow: this.shadow ? '3px 3px 4px -1px rgba(0,0,0,0.26)' : null,
      backgroundImage: '',
      backgroundSize: '',
      backgroundRepeat: 'no-repeat',
      backgroundPositionX: 'right',
    };

    if(this.backgroundmode) {
      styles.backgroundImage = ( this.data && this.meteoClient.getBackgroundMeteo(this.data.current_weather.weathercode) ) ? 'url(\'' + this.meteoClient.getBackgroundMeteo(this.data.current_weather.weathercode) + '\')' : '';
      styles.backgroundSize = 'cover'
    } 
    
    if(this.iconsmode) {
      styles.backgroundImage = ( this.data && this.meteoClient.getIconaMeteo(this.data.current_weather.weathercode) ) ? 'url(\'' + this.meteoClient.getIconaMeteo(this.data.current_weather.weathercode) + '\')' : '';
      styles.backgroundSize = 'contain'
    }

    return html`
    ${this.loading?
      this.renferLoading() :      
      html `<div class="main-card" style=${styleMap(styles)}>
        <div class="titolo">${this.title}</div>
        <div class="temperatura">${this.data ? this.data.current_weather.temperature : null}°</div>
        <div class="testo-base">
          <b>
            ${this.data ? this.meteoClient.getCodiceMeteo(this.data.current_weather.weathercode) : null}
          </b>
        </div>
        <div>
          ${this.traduzioni[this.lang as keyof typeof this.traduzioni].altitude}
          <b>
            ${this.data ? this.data['elevation'] : null} m
          </b>
        </div>
        <div>
          ${this.traduzioni[this.lang as keyof typeof this.traduzioni].wind_speed}
          <b>
            ${this.data ? this.data.current_weather.windspeed : null} km/h
          </b>
        </div>
        ${this.nextdays ? html `
          <div class="griglia-giorni">
            <b>
              ${this.traduzioni[this.lang as keyof typeof this.traduzioni].prossimi_giorni}
            </b>
          </div>
        ` : null}
        ${this.nextdays ? html `
          <div class="giorno-icona">
            ${this.data.daily.weathercode ? this.renderWeek(this.data.daily.weathercode) : null}
          </div>` : null}
        ${this.nextdays ? html `
          <div class="giorno-label">
            ${this.data.daily.weathercode ? this.renderWeekLabel(this.data.daily.weathercode) : null}
          </div>` : null}
      </div>`
    }
      <slot></slot>
    `
    }

    private renferLoading() {
      return html `<div>Caricamento...</div>`;
    }

    private renderWeek(data: any) {
      return html `${data.map((i: number, index: number) => { 
        if(index === 0) { return null; }
        const backimg = 'background-image:url(\'' + this.meteoClient.getIconaMeteo(i) + '\')';
        return html`<div class="giorno-settimana" style="${backimg}"></div>`; })}`
    }

    private renderWeekLabel(data: any) {
      return html `${data.map((_i: number, index: number) => { 
        if(index === 0) { return null; }
        return html`<div class="giorno-settimana-label">${this.data.daily.time[index].substr(this.data.daily.time[index].length - 2)}</div>`;
    })}`
    }
  }


declare global {
  interface HTMLElementTagNameMap {
    'web-meteo': MyElement
  }
}
