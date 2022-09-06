import React, { useEffect, useState } from "react";
import { CardContent, Grid, Typography, Card, ListItemButton, 
    TextField, Box, List, ListItem, ListItemText} from '@mui/material'
import {getCovidData, getCountries, setCountry, setIsCountry} from '../reducers/appReducer'
import {useDispatch, useSelector} from "react-redux";
import { AppDispatch} from "../store/store";
import { RootState } from "../reducers/rootReducer";
import CountUp from "react-countup";
import { IMatches } from "../interfaces/interfaces";
import  ChartData from './ChartData';
import AllCountries from "./AllCountries";
import Users from "./Users"

const Home: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();

    let  data = useSelector((state: RootState) =>state.appReducer.data)
    const  countries = useSelector((state: RootState) =>state.appReducer.countries);
    const [text, setText] = useState<string>("");
    const [suggestions, setSuggestions] = useState<IMatches[]>([])



useEffect (() => {
    let countryData: string[] = [];
    dispatch(getCovidData(countryData));
}, [dispatch]);

useEffect (() => {
    dispatch(getCountries())
}, [dispatch])


const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setText((event.target as HTMLInputElement).value);

    let matches: IMatches[]=[];

    if(text.length >0){
        matches = countries[0]?.countries.filter((country: {name: string}) =>{
            const regex = new RegExp(`${text}`, "gi");
            return country.name.match(regex)
        })
        
    }

    setSuggestions(matches)

}

const onSuggestionsHandler = (text: string) =>{

    let countryData: string[] = [];
    setSuggestions([]);
    countryData.push(text);
    data = [];
    dispatch(setCountry(text))
    dispatch(getCovidData(countryData));
    dispatch(setIsCountry(true));
    setText(text);
}
        
  return (
    <React.Fragment>
            <Typography className="home-title" variant='h5' component='h2'>
                      Global
            </Typography>
        <div id="cards">
            <Grid id="card-container" item xs={12} md={3} component={Card}  className="card infected">
                <CardContent>
                    <Typography color="textSecondary">
                        Infected
                    </Typography>
                    <Typography variant='h5' component='h2'>
                    <CountUp start={0} end={data[0]?.confirmed.value} 
                    duration={4.75} separator="," />
                    </Typography>
                    <Typography color="textSecondary">
                    {new Date(data[0]?.lastUpdate).toDateString()}
                    </Typography>
                    <Typography variant='body2' component='p'>
                    Number of active cases of covid 19
                    </Typography>
                </CardContent>
            </Grid>
            <Grid id="card-container" item xs={12} md={3} component={Card}  className="card recovered">
                <CardContent>
                    <Typography color="textSecondary">
                        Recovered
                    </Typography>
                    <Typography variant='h5' component='h2'>
                    <CountUp start={0} end={data[0]?.recovered.value} duration={4.75} separator="," />
                    </Typography>
                    <Typography color="textSecondary">
                    {new Date(data[0]?.lastUpdate).toDateString()}
                    </Typography>
                    <Typography variant='body2' component='p'>
                    Number of active cases of covid 19
                    </Typography>
                </CardContent>
            </Grid>
            <Grid id="card-container" item xs={12} md={3} component={Card}  className="card deaths">
                <CardContent>
                    <Typography color="textSecondary">
                        Deaths
                    </Typography>
                    <Typography variant='h5' component='h2'>
                    <CountUp start={0} end={data[0]?.deaths.value} duration={4.75} separator="," />
                    </Typography>
                    <Typography color="textSecondary">
                        {new Date(data[0]?.lastUpdate).toDateString()}
                    </Typography>
                    <Typography variant='body2' component='p'>
                    Number of active cases of covid 19
                    </Typography>
                </CardContent>
            </Grid>
        </div>
        <Box
            id="countries"
            sx={{
                maxWidth: '100%',
            }}
            >
            <TextField  onChange={onChangeHandler} sx={{width: "50%"}} fullWidth variant="standard"  label="Search a country" id="fullWidth" />
        </Box>
        <Box
            id="countries"
            sx={{
                maxWidth: '100%',
            }}
            >
            <List sx={{width: "50%"}}>
                {suggestions?.map((name, id) =>{
                    return(
                    <ListItem key={id} 
                        disablePadding 
                        onClick={() =>onSuggestionsHandler(name.name)}
                        sx={{border: "1px solid gray", borderColor: 'secondary.main'}}>
                        <ListItemButton>
                        <ListItemText primary={name.name} />
                        </ListItemButton>
                    </ListItem>
                    )
                })

                }

            </List>
        </Box>
        <Box
        className="chart"
        sx={{
            maxWidth: '65%',
        }}
        >
            <ChartData  />
        </Box>
        
        <AllCountries />
        {/* <Users /> */}
    </React.Fragment>
  )
}

export default Home