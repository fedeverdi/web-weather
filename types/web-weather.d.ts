import { LitElement } from 'lit';
import WeatherClient from './class/client.class';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class MyElement extends LitElement {
    title: string;
    lat: number;
    lng: number;
    backcolor: string;
    lang: string;
    bdcolor: string;
    color: string;
    size: string;
    padding: string;
    bdradius: string;
    bdsize: string;
    shadow: boolean;
    backgroundmode: boolean;
    iconsmode: boolean;
    nextdays: boolean;
    data: any;
    meteoClient: WeatherClient;
    private loading;
    private traduzioni;
    connectedCallback(): void;
    propertyValidate(): void;
    render(): import("lit-html").TemplateResult<1>;
    private renferLoading;
    private renderWeek;
    private renderWeekLabel;
}
declare global {
    interface HTMLElementTagNameMap {
        'web-meteo': MyElement;
    }
}
