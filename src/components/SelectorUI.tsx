import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useState, useEffect } from 'react';

interface SelectorProps {
    ciudad: string,
    handleCityChange: (ciudad: string) => void
}

export default function SelectorUI(props: SelectorProps) {

    const [cityInput, setCityInput] = useState(props.ciudad);
    const [cityName, setCityName] = useState("");

    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth();

    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    useEffect(() => {
        setCityInput(props.ciudad);
        if (cityInput == "latitude=-2.1962&longitude=-79.8862") {
            setCityName("Guayaquil");
        } else if (cityInput == "latitude=-0.2298&longitude=-78.525"){
            setCityName("Quito");
        } else if (cityInput == "latitude=-0.9494&longitude=-80.7314") {
            setCityName("Manta");
        } else {
            setCityName("Cuenca");
        }
    }, [props.ciudad]);

    const handleChange = (event:SelectChangeEvent<string>) => {
        setCityInput(event.target.value);
        props.handleCityChange(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="city-select-label" style={{color:'white'}}>Ciudad</InputLabel>
            <Select onChange={handleChange} value={cityInput} style={{color:'white'}} sx={{'& .MuiOutlinedInput-notchedOutline': {borderColor: 'white'}, '&:hover .MuiOutlinedInput-notchedOutline': {borderWidth: '4px', borderColor: 'white'}}}
                labelId="city-select-label"
                id="city-simple-select"
                label="Ciudad">
                <MenuItem disabled><em>Seleccione una ciudad</em></MenuItem>
                <MenuItem value={"latitude=-2.1962&longitude=-79.8862"}>Guayaquil</MenuItem>
                <MenuItem value={"latitude=-0.2298&longitude=-78.525"}>Quito</MenuItem>
                <MenuItem value={"latitude=-0.9494&longitude=-80.7314"}>Manta</MenuItem>
                <MenuItem value={"latitude=-2.9005&longitude=-79.0045"}>Cuenca</MenuItem>
            </Select>
            {
                cityName && (
                    <p>
                        Información del clima en <span style={{textTransform: "capitalize", fontWeight:"bold"}}>{cityName}</span> del día {dia} de {meses[mes]}
                    </p>
                )
            }

        </FormControl>
    )
}
