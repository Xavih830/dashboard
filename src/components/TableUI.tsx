import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { DataFetcherOutput } from '../functions/useFetchData';
import {useState, useEffect} from 'react';

function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
   return arrLabels.map((label, index) => ({
      id: index,
      label: label,
      value1: arrValues1[index],
      value2: arrValues2[index]
   }));
}

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 90 },
   {
      field: 'label',
      headerName: 'Fecha',
      width: 150,
      headerAlign: 'center'
   },
   {
      field: 'value1',
      headerName: 'Temperatura (°C)',
      width: 150,
      align: 'center',
      headerAlign: 'center'
   },
   {
      field: 'value2',
      headerName: 'Temperatura aparente (°C)',
      width: 150,
      align: 'center',
      headerAlign: 'center'
   }
];

export default function TableUI(datos: DataFetcherOutput) {

   {datos.loading && console.log("Expresion cargando")}
   {datos.error && console.log(datos.error)}
   
   const [rows, setRows] = useState(combineArrays([""], [0], [0]));

   useEffect(() => {
      if (datos.data) {
         setRows(combineArrays(datos.data.hourly.time, datos.data.hourly.temperature_2m, datos.data.hourly.apparent_temperature));
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
