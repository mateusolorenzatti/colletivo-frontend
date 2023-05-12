import { Stop } from "../stop/stop";

export interface StopTimeCreate {
    arrival_time?: string
    departure_time?: string
    stop_sequence?: number
    stop_headsign?: string
    pickup_type?: number
    drop_off_type?: number
    shape_dist_traveled?: number
    timepoint?: number
    start_service_area_id?: string
    end_service_area_id?: string
    start_service_area_radius?: string
    end_service_area_radius?: string
    continuous_pickup?: string
    continuous_drop_off?: string
    pickup_area_id?: string
    drop_off_area_id?: string
    pickup_service_area_radius?: string
    drop_off_service_area_radius?: string
  
    stop?: string
    trip?: string
}