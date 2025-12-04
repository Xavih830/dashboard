import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import useDataFetcher from '../functions/useDataFetcher';

export default function ChartUI() {

    const datos = useDataFetcher();

    return (
        <>
            {datos.loading && <p>Cargando datos...</p>}
            {datos.error && <p>Error: {datos.error}</p>}
            {datos.data && (
                <>
                    <Typography variant="h5" component="div">
                        Tiempo vs Temperatura & Temperatura aparente
                    </Typography>
                    <LineChart
                        height={300}
                        series={[
                            { data: datos.data.hourly.temperature_2m, label: 'Temperatura' },
                            { data: datos.data.hourly.apparent_temperature, label: 'Temperatura aparente' },
                        ]}
                        xAxis={[{ scaleType: 'point', data: datos.data.hourly.time }]}
                    />
                </>
            )}
        </>
    );
}
