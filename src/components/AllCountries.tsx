import { Paper, TableCell, Table,TableHead, TableRow, TableBody, Typography } from '@mui/material'
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "../reducers/rootReducer";
import { ICountries } from "../interfaces/interfaces";

const AllCountries:React.FC =()=> {
    const  countries = useSelector((state: RootState) =>state.appReducer.countries)

let allcountries:ICountries = countries[0];


  return (
    <React.Fragment>
        <Typography className="home-title" variant='h5' component='h2'>
                      Covid state in all countries
            </Typography>
        <Paper sx={{marginTop: "40px"}}>
            <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Country Name
                        </TableCell>
                        <TableCell>
                            Infected
                        </TableCell>
                        <TableCell>
                            Recovered
                        </TableCell>
                        <TableCell>
                            Deaths
                        </TableCell>
                    </TableRow>
                </TableHead>
            <TableBody>
                {allcountries.countries && allcountries.countries.map((country, id) =>{
                    console.log('monster', country)
                    return (
                    <TableRow key={id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="right">{country.name}</TableCell>
          
                    </TableRow>
                    )
                })}
            
            </TableBody>
            </Table>
        </Paper>
    </React.Fragment>
  )
}

export default AllCountries