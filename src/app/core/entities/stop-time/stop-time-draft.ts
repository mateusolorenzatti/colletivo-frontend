import { Stop } from "../stop/stop";

export interface StopTimeDraft {
    arrival_time?: string;
    stop_sequence: number;
    stop?: Stop;
    trip_id?: string;
}