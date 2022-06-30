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
    bdcolor: string;
    color: string;
    size: string;
    padding: string;
    bdradius: string;
    data: any;
    meteoClient: WeatherClient;
    loading: boolean;
    connectedCallback(): void;
    changeProperties(): void;
    render(): import("lit-html").TemplateResult<1>;
    private renferLoading;
}
declare global {
    interface HTMLElementTagNameMap {
        'web-weather': MyElement;
    }
}
