import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import type { DataFetcherOutput } from '../functions/useFetchData';
import { useState, useEffect } from 'react';

export default function ChartUI(datos: DataFetcherOutput) {

    const [etiqueta, setEtiqueta] = useState([""]);
    const [val1, setVal1] = useState([0]);
    const [val2, setVal2] = useState([0]);
    const fecha = new Date();
    const horaActual = fecha.getHours();
    const diaActual = fecha.getDate();

    { datos.loading && console.log("Cargando...") }
    { datos.error && console.log(datos.error) }

    useEffect(() => {
        if (datos.data) {
            let listaEtiquetas: Array<string> = [];
            datos.data.hourly.time.forEach((e) => {
                const a = e.split('-');
                const b = a[2].split('T');
                const c = b[1].split(':');

                if (parseInt(b[0]) == diaActual && parseInt(c[0]) <= horaActual) {
                    console.log(b[0]);
                    listaEtiquetas.push(b[1]);
                }
            });
            const longitud = listaEtiquetas.length;
            console.log(longitud);
            setEtiqueta(listaEtiquetas);
            setVal1(datos.data.hourly.temperature_2m.slice(0, longitud));
            console.log(datos.data.hourly.temperature_2m.slice(0, longitud));
            setVal2(datos.data.hourly.apparent_temperature.slice(0, longitud));
        }
    }, [datos])

    return (
        <>
            {datos.loading && <p>Cargando datos...</p>}
            {datos.error && <p>Error: {datos.error}</p>}
            {datos.data && (
                <>
                    <Typography variant="h5" component="div" color='text.secondary'>
                        Tiempo vs Temperatura & Temperatura aparente
                    </Typography>
                    <LineChart
                        height={300}
                        series={[
                            { data: val1, label: 'Temperatura (°C)' },
                            { data: val2, label: 'Temperatura aparente (°C)' },
                        ]}
                        xAxis={[{ scaleType: 'point', data: etiqueta }]}
                    />
                </>
            )}
        </>
    );
}
