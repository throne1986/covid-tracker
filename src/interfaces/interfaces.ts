
export interface ICountries {
    countries:{
    name: string,
    iso2: string,
    iso3: string
    }[]
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
    status: string
}
export interface IMatches {
    name:string
}