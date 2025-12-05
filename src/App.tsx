import { useState } from 'react'
/*import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'*/
import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useDataFetcher from './functions/useDataFetcher';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';

function App() {
  /*const [count, setCount] = useState(0)*/

  const guayaquil = "latitude=-2.1962&longitude=-79.8862";
  /*const manta = "latitude=-0.9494&longitude=-80.7314";
  const cuenca = "latitude=-2.9005&longitude=-79.0045";
  const quito = "latitude=-0.2298&longitude=-78.525";*/

  const [ciudad, setCiudad] = useState(guayaquil);
  const [url, setUrl] = useState("https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago");

  const handleCityChange = (ciudad: string) => {
    setCiudad(ciudad);
    setUrl(`https://api.open-meteo.com/v1/forecast?${ciudad}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago`);
  }

  const dataFetcherOutput = useDataFetcher(url);

  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">

      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }}><HeaderUI /></Grid>

      {/* Alertas */}
      <Grid size={{ xs: 12, md: 12 }} container justifyContent="right" alignItems="center">
        <AlertUI description='No se preveen lluvias' />
      </Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}><SelectorUI ciudad={ciudad} handleCityChange={handleCityChange}>
      
      </SelectorUI>
      </Grid>

      {/* Indicadores */}
      <Grid size={{ xs: 12, md: 9 }}>
        <Grid container size={{ xs: 12, md: 9 }} spacing={1}>

          {/* Renderizado condicional de los datos obtenidos */}

          {dataFetcherOutput.loading && <p>Cargando datos...</p>}
          {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
          {dataFetcherOutput.data && (
            <>

              {/* Indicadores con datos obtenidos */}

              <Grid size={{ xs: 12, md: 3 }} >
                <IndicatorUI
                  title='Temperatura (2m)'
                  description={dataFetcherOutput.data.current.temperature_2m + " " + dataFetcherOutput.data.current_units.temperature_2m} />
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                  title='Temperatura aparente'
                  description={dataFetcherOutput.data.current.apparent_temperature + " " + dataFetcherOutput.data.current_units.apparent_temperature} />
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                  title='Velocidad del viento'
                  description={dataFetcherOutput.data.current.wind_speed_10m + " " + dataFetcherOutput.data.current_units.wind_speed_10m} />
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                  title='Humedad relativa'
                  description={dataFetcherOutput.data.current.relative_humidity_2m + " " + dataFetcherOutput.data.current_units.relative_humidity_2m} />
              </Grid>

            </>
          )}

        </Grid>
      </Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}><ChartUI {...dataFetcherOutput}/></Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}><TableUI {...dataFetcherOutput}/></Grid>

      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

    </Grid>
  )
}

export default App
