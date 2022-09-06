
export interface ICountries {
    countries:{
    name: string,
    iso2: string,
    iso3: string
    }[]
}


export interface IUsers{
        id: number,
        name: string,
}

export interface IUsersState{
    users: IUsers[],
    status: string
}


export interface IState {
    isCountry: boolean,
    country:string,
    data: {
        confirmed:{
        detail: string,
         value: number
        },
        recovered:{
        detail: string,
         value: number
        },
        deaths:{
        detail: string,
         value: number
        },
        lastUpdate: Date
    }[],
    countries: ICountries[],
    status: string,
}
export interface IMatches {
    name:string
}

export interface IConfirmed {
        confirmed: string,
        deaths: number,
        recovered: number,
        countryRegion: string,
        deaths28Days: number
}