import {css} from "lit-element";

export const style = css`
    .main-card {
        width: 100%;
        background-color: red !important;
    }
    .titolo {
        font-size: 2em;
        margin-bottom: 10px;
    }
    .temperatura {
        font-size: 3em;
    }
    .testo-base {
        margin-bottom:10px;
    }
    .griglia-giorni {
        display: flex;
        padding-top:10px;
        margin-top:10px;
        border-top: 1px solid #F1F1F1;
        font-size: 0.7em;
    }
    .giorno-icona {
        display: flex;
    }
    .giorno-settimana {
        height: 60px; width: 20%; 
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
    }
    .giorno-settimana-label {
        text-align:center;
        height: 10px;
        width: 20%;
        font-size: 0.8em;
        margin-top: -10px;
    }
    .giorno-label {
        display: flex;
        margin-bottom: 8px;
    }
    `
    