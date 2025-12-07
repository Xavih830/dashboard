import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { DataFetcherOutput } from '../functions/useFetchData';
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';

export default function MoreUI(datos: DataFetcherOutput) {
    const [etiqueta, setEtiqueta] = useState([""]);
    const [val1, setVal1] = useState([""]);
    const [val2, setVal2] = useState([""]);
    const fecha = new Date();
    const diaActual = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    { datos.loading && console.log("Cargando...") }
    { datos.error && console.log(datos.error) }

    useEffect(() => {
        if (datos.data) {
            let listaEtiquetas: Array<string> = [];
            datos.data.hourly.time.forEach((e) => {
                const a = e.split('-');
                const b = a[2].split('T');

                if (parseInt(b[0]) != diaActual && parseInt(a[1]) == mes) {
                    if (!listaEtiquetas.includes(`${b[0]} de ${meses[parseInt(a[1]) - 1]}`)) {
                        listaEtiquetas.push(`${b[0]} de ${meses[parseInt(a[1]) - 1]}`);
                    }
                }
            });

            let arr1: Array<string> = [];
            let arr2: Array<string> = [];
            const dias = listaEtiquetas.length * 24;
            const valor1 = datos.data.hourly.temperature_2m.length - 24;
            const valor2 = datos.data.hourly.apparent_temperature.length - 24;
            if (dias == valor1 && dias == valor2) {
                for (let i = 0; i < listaEtiquetas.length; i++) {
                    let a = datos.data.hourly.temperature_2m.slice((24 * (i + 1)), 24 * (i + 2)).reduce((acum, valActual) => {
                        return acum + valActual;
                    }, 0);

                    let b = datos.data.hourly.apparent_temperature.slice(24 * i, 24 * (i + 1)).reduce((acum, valActual) => {
                        return acum + valActual;
                    }, 0);

                    arr1.push((a/24).toFixed(2) + ' ' + datos.data.hourly_units.temperature_2m);
                    arr2.push((b/24).toFixed(2) + ' ' + datos.data.hourly_units.apparent_temperature);
                }
            }

            setEtiqueta(listaEtiquetas);
            setVal1(arr1);
            setVal2(arr2);
        }
    }, [datos])

    return (
        <>
            <Typography variant="body1" component="p" color="white" sx={{ fontSize: "24px" }} marginBottom={2}>
                Predicciones de los próximos días de {meses[mes - 1]}
            </Typography>
            <Grid container size={{ xs: 12, md: 12 }} spacing={1}>
                {etiqueta.map((e, j, arr) => (
                        <Grid size={{ xs: 12, md: 4 }} >
                            <Card >
                                <CardContent sx={{ height: '100%' }}>
                                    <Typography variant="body1" component="div" color="text.primary" sx={{ fontSize: "22px", fontWeight: "bold" }}>
                                        {e}
                                    </Typography>
                                    <Typography variant="h6" component="p" color='text.secondary' textAlign={'left'} sx={{ fontSize: "18px"}}>
                                        <span style={{ fontWeight: "bold" }}>Temperatura:</span> {val1[j]}  
                                    </Typography>
                                    <Typography variant="h6" component="p" color='text.secondary' textAlign={'left'} sx={{ fontSize: "18px"}}>
                                        <span style={{ fontWeight: "bold" }}>Temperatura aparente:</span> {val2[j]}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                ))}
            </Grid>
        </>
    )
}
