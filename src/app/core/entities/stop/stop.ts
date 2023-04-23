export interface Stop{
    id: string;
    stop_id?: number;
    stop_code: string;
    platform_code?: string;
    stop_name?: string;
    stop_desc?: string;
    stop_lat: number;
    stop_lon: number;
    zone_id?: number;
    stop_url?: string;
    location_type?: number;
    parent_station?: number;
    stop_timezone?: string;
    position?: number;
    direction_id?: number;
    wheelchair_boarding?: number;
}