import { Agency } from "../agency/agency"

export interface Route {
    id?: string
    agency?: Agency
    short_name?: string
    long_name?: string
    desc?: string
    type?: string
    url?: string
    color?: string
    text_color?: string
    sort_order?: number
    min_headway_minutes?: number
    eligibility_restricted?: number
}