import { Alert } from "@mui/material";
import { useState, useEffect } from 'react';
import type { DataFetcherOutput } from "../functions/useFetchData";

export default function AlertUI(datos: DataFetcherOutput) {

    const [day, setDay] = useState("");
    const [rain, setRain] = useState(false);
    const fecha = new Date();
    const mes = fecha.getMonth() + 1;
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    useEffect(() => {
        { datos.loading && console.log("Cargando...") }
        { datos.error && console.log(datos.error) }
        if (datos.data) {
            let listaEtiquetas: Array<string> = [];
            datos.data.daily.time.forEach((e) => {
                const a = e.split('-');
                const b = a[2].split('T');

                if (parseInt(a[1]) == mes) {
                    if (!listaEtiquetas.includes(`${b[0]} de ${meses[parseInt(a[1]) - 1]}`)) {
                        listaEtiquetas.push(`${b[0]} de ${meses[parseInt(a[1]) - 1]}`);
                    }
                }
            });

            console.log(listaEtiquetas);
            let lluviaL = datos.data.daily.rain_sum.slice(0, listaEtiquetas.length);
            console.log(lluviaL);
            let itWillRain = lluviaL.some((n) => {
                return n > 0;
            });
            console.log(itWillRain);

            if (itWillRain) {
                let indice = lluviaL.findIndex(n => n > 0);
                setDay(listaEtiquetas[indice]);
                setRain(true);
            } else {
                setDay("");
                setRain(false);
            }
        }
    }, [datos]);

    if (rain) {
        return (
            <Alert style={{width: "100%"}} severity="warning" variant="outlined">Se preveen lluvias a lo largo del {day}</Alert>
        )
    } else {
        return (
            <Alert style={{width: "100%"}} severity="success" variant="outlined">No se preveen lluvias</Alert>
        )
    }
}