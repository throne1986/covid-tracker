import { 
Paper, TableCell, Table,
TableHead, TableRow, TableBody,
Typography, TablePagination, Box,
IconButton, InputBase } from '@mui/material';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';

import React, {useCallback, useEffect, useState} from 'react';
import api from "../api/api";
import { IConfirmed } from "../interfaces/interfaces";
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { ArrowDownward } from '@mui/icons-material';


const AllCountries:React.FC =()=> {

    const [confirmed, setConfirmed] = useState<IConfirmed[]>([]);

    const [page, setPage] = React.useState(0);
    const [pages, setPages] = React.useState(0);
    const [perPage, setPerPage] = React.useState(10);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [items, setItems] = useState<IConfirmed[]>([]);
    const [order, setOrder] = useState<boolean>(false)


    useEffect(()=>{
        setPages(Math.floor(confirmed?.length / perPage))
    }, [pages, confirmed, perPage])

  
    const getConfirmedCases = useCallback(async() =>{

        try {
            const response = await api.get('/api/confirmed')
            setConfirmed(response.data);
            return response.data
                
            } catch (error) {
                
        }
        
    }, [])

    if(true){
        console.log('uncle drew')
    }

    useEffect(() =>{
        getConfirmedCases();
    }, [getConfirmedCases]);


    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
      ) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

      useEffect(()=>{
        setItems(confirmed?.slice(page * perPage, (page + 1) * perPage))
      }, [confirmed, page, perPage, setItems])


      const handleSearch = (value: string) =>{
        console.log('value', value.toLowerCase())

        let matches:IConfirmed[] = []
        
        if(value.length >0){
            matches = items.filter((el) =>{
                const regex = new RegExp(`${value}`, "gi");
                return el.countryRegion.toLowerCase().match(regex)
            })
            
        }
        console.log('matches', matches.length)
        if(matches.length !==0){
            setItems(matches)
        }else{
            setItems(confirmed?.slice(page * perPage, (page + 1) * perPage))
        }
  
      }
      
      const handleSorting = () =>{

        setOrder(!order)

       let data = items.slice().sort((x, y) => {
            let a = x.countryRegion.toUpperCase(),
                b = y.countryRegion.toUpperCase();
            return order? (a=== b )? 0 : (a > b) ? 1 : -1:(a < b) ? 1:-1
        });

        
        if(data.length !==0){
            console.log('any', data)
            setItems(data) //set the sorted data to items
        }

    }

  return (
    <React.Fragment>
        <Typography className="home-title" variant='h5' component='h2'>
                      Covid state in all countries
        </Typography>
        <Box className='search-form'>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                <InputBase
                    onChange={(e) =>handleSearch(e.target.value)}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search a country"
                    inputProps={{ 'aria-label': 'search a country' }}
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
                <IconButton onClick={() =>handleSorting()} color="primary" type="button" sx={{ p: '10px' }} aria-label="search">
                    <SortByAlphaIcon  />
                </IconButton>
                <IconButton size="small">
                <ArrowUpwardIcon className="MuiDataGrid-sortIcon"/>
              </IconButton>
                <IconButton size="small">
                <ArrowDownward className="MuiDataGrid-sortIcon"/>
              </IconButton>
            
        </Box>
        <Paper className="main-data" sx={{marginTop: "10px"}}>
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
            {
            items?.map((el, id) =>{
                return (
                    <TableRow key={id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="right">{el?.countryRegion}</TableCell>
                        <TableCell align="right">{el?.confirmed}</TableCell>
                        <TableCell align="right">{el?.deaths28Days}</TableCell>
                        <TableCell align="right">{el?.deaths}</TableCell>
                  
                        </TableRow>
                        )
                    })}

            </TableBody>
            </Table>
        </Paper>
        <TablePagination 
            className="pagination"
            component="div"
            count={confirmed.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </React.Fragment>
  )
}

export default AllCountries