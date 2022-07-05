## Weather Web Component

Web Component implementation through Lit (Google);

The component displays a panel with the real time weather for a given position (Latitude and Longitude)

The component uses [Open Meteo Api](https://open-meteo.com)

## Installation

```bash
npm install web-weather
```

## Getting started

```js
require('web-weather');
```

## Example

```html
<web-weather 
    lat="44.86"
    lng="10.06" 
    lang="it"
    title="Il meteo a Fidenza"
    backcolor="#f9f9f9" 
    padding="10" 
    color="#292929"
    size="1" 
    bdsize="0"
    bdradius="5" 
    bdcolor="#cdcdcd"
    shadow
    backgroundmode
    nextdays
></web-weather>
```

or you can use 

```js
// Create the element
const weather = document.createElement('web-weather');

// Set the properties
weather.lat             = "44.86"
weather.lng             = "10.06" 
weather.lang            = "it"
weather.title           = "Il meteo a Fidenza"
weather.backcolor       = "#f9f9f9" 
weather.padding         = "10" 
weather.color           = "#292929"
weather.size            = "1" 
weather.bdsize          = "0"
weather.bdradius        = "5" 
weather.bdcolor         = "#cdcdcd"
weather.shadow          = true;
weather.backgroundmode  = true;
weather.nextdays        = true;

// Put element in to the document
document.body.append(weather);
```

## Property
```bash
lat: Latitude
lng: Longitude
lang: Language ( default en - Other languages ​​available: it )
title: Title of card
backcolor: Background color
padding: Padding
color: Text color
size: Text size - em
bdsize: Border size ( 0 = No border )
bdcolor: Border color
bdradius: Corners round
shadow: Box shadow
backgroundmode: Set on background mode
iconsmode: Set on Icons mode
nextdays: Set Next Days Visualization
```

## Next Days
[![Schermata-2022-06-28-alle-14-23-25.png](https://i.postimg.cc/ZRJpMM67/Schermata-2022-06-28-alle-14-23-25.png)](https://postimg.cc/94ND418Z)

## Background Mode
[![Schermata-2022-06-28-alle-13-09-20.png](https://i.postimg.cc/YC3GFVf3/Schermata-2022-06-28-alle-13-09-20.png)](https://postimg.cc/zyyGZxQb)

## Icons Mode
[![Schermata-2022-06-28-alle-13-13-39.png](https://i.postimg.cc/25ydTvwg/Schermata-2022-06-28-alle-13-13-39.png)](https://postimg.cc/qtfCvNWG)