export enum deliveryState {
  pending = "pending",
  assigned = "assigned",
  in_transit = "in_transit",
  delivered = "delivered",
}
export interface Delivery {
  key: string;
  id: string;
  creation_date: Date;
  state: deliveryState;
  pickup: {
    pickup_lat: number;
    pickup_lon: number;
  };
  dropoff: {
    dropoff_lat: number;
    dropoff_lon: number;
  };
  zone_id: string;
  bot: string;
}
