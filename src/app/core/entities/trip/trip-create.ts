export interface TripCreate {
    id?: string
    route?: string
    service_id?: string
    trip_short_name?: string
    trip_headsign?: string
    direction_id?: string
    block_id?: number
    bikes_allowed?: boolean
    wheelchair_accessible?: boolean
    trip_type?: number
    drt_max_travel_time?: number
    drt_avg_travel_time?: number
    drt_advance_book_min?: number
    drt_pickup_message?: number
    drt_drop_off_message?: number
    continuous_pickup_message?: number
    continuous_drop_off_message?: number
}
