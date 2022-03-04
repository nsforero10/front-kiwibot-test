export enum botState {
  availabe = "available",
  busy = "busy",
  reserved = "reserver",
}
export interface Bot {
  id: string;
  number: number;
  status: botState;
  location: {
    dropoff_lat: number;
    dropoff_lon: number;
  };
  zone_id: string;
}
