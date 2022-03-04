import axios from "axios";
import { Delivery } from "../types/delivery.model";
import { Bot } from "../types/bot.model";

const apiurl = "http://localhost:3000";

export default {
  // Deliveries related api calls
  getDeliveries() {
    return new Promise((resolve) => {
      axios.get<Delivery>(`${apiurl}/deliveries`).then((res) => {
        resolve(res.data);
      });
    });
  },
  updateDelivery(deliveryId: string, updateObject: unknown) {
    return new Promise((resolve) => {
      axios
        .put<Delivery>(`${apiurl}/deliveries/${deliveryId}`, updateObject)
        .then((res) => {
          resolve(res.data);
        });
    });
  },
  // Bots related api calls
  getBots() {
    return new Promise((resolve) => {
      axios.get<Bot>(`${apiurl}/bots`).then((res) => {
        resolve(res.data);
      });
    });
  },
  updateBot(botId: string, updateObject: unknown) {
    return new Promise((resolve) => {
      axios
        .put<Delivery>(`${apiurl}/bots/${botId}`, updateObject)
        .then((res) => {
          resolve(res.data);
        });
    });
  },
};
