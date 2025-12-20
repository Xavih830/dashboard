import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { DataFetcherOutput } from '../functions/useFetchData';
import { useState, useEffect } from 'react';

function combineArrays(arrLabels: Array<string>, arrValues1: Array<string>, arrValues2: Array<number>) {
   return arrLabels.map((label, index) => ({
      id: index,
      label: label,
      value1: arrValues1[index],
      value2: arrValues2[index]
   }));
}

const columns: GridColDef[] = [
   {
      field: 'label',
      headerName: 'Hora',
      width: 175,
      align: 'center',
      headerAlign: 'center'
   },
   {
      field: 'value1',
      headerName: 'Calidad del día',
      width: 175,
      align: 'center',
      headerAlign: 'center'
   },
   {
      field: 'value2',
      headerName: 'Temperatura aparente (°C)',
      width: 250,
      align: 'center',
      headerAlign: 'center'
   }
];

export default function TableUI(datos: DataFetcherOutput) {

   { datos.loading && console.log("Expresion cargando") }
   { datos.error && console.log(datos.error) }

   const [rows, setRows] = useState(combineArrays([""], [''], [0]));
   const fecha = new Date();
   const horaActual = fecha.getHours();
   const diaActual = fecha.getDate();

   useEffect(() => {
      if (datos.data) {

         let listaEtiquetas: Array<string> = [];
         datos.data.hourly.time.forEach((e) => {
            const a = e.split('-');
            const b = a[2].split('T');
            const c = b[1].split(':');

            if (parseInt(b[0]) == diaActual && parseInt(c[0]) <= horaActual) {
               listaEtiquetas.push(b[1]);
            }
         });

         let calidadDia:Array<string> = []; 
         let dataCalidad = datos.data.hourly.cloud_cover.slice(0, listaEtiquetas.length);

         dataCalidad.forEach((e) => {
            if (e > 25 && e <= 50) {
               calidadDia.push("Soleado");
            } else if (e > 50 && e <= 75) {
               calidadDia.push("Nublado");
            } else if (e > 75) {
               calidadDia.push("Muy nublado");
            } else {
               calidadDia.push("Muy soleado");
            }
         });

         setRows(combineArrays(listaEtiquetas, calidadDia, datos.data.hourly.apparent_temperature.slice(0, listaEtiquetas.length)));
      }
   }, [datos]);

   return (
      <>
         {datos.loading && <p>Cargando datos...</p>}
         {datos.error && <p>Error: {datos.error}</p>}
         {datos.data && (
            <>
               <Box sx={{ height: 400, width: '100%' }}>
                  <DataGrid
                     rows={rows}
                     columns={columns}
                     initialState={{
                        pagination: {
                           paginationModel: {
                              pageSize: 4,
                           },
                        },
                     }}
                     pageSizeOptions={[4]}
                     disableRowSelectionOnClick
                  />
               </Box>
            </>
         )}
      </>
   );
}
