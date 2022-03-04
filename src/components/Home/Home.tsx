import React, { useEffect, useState } from "react";
import { Layout, notification } from "antd";
import api from "../../api/api";
import { Delivery } from "../../types/delivery.model";
import { Bot } from "../../types/bot.model";
import { DeliveryTable } from "../DeliveryTable/DeliveryTable";

export default function Home() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [bots, setBots] = useState<Bot[]>([]);

  useEffect(() => {
    getDeliveries();
    getBots();
  }, []);

  const sendPushNotification = () => {
    const delayedDeliveries = deliveries.filter(
      (delivery) =>
        new Date(delivery.creation_date).getMilliseconds() - Date.now() >
          300000 && delivery.state === "pending"
    );
    console.log(delayedDeliveries);
    if (delayedDeliveries.length > 0)
      notification["warning"]({
        message: "There're some unassigned deliveries",
      });
  };

  const getDeliveries = async () => {
    try {
      const response = (await api.getDeliveries()) as Delivery[];
      const deliveyList: Delivery[] = [];
      response.map((delivery) => {
        const deliveryWitKey = delivery;
        deliveryWitKey.key = delivery.id;
        deliveyList.push(deliveryWitKey);
      });
      setDeliveries(deliveyList);
    } catch (err) {
      alert(err);
    }
  };

  const getBots = async () => {
    try {
      const response = (await api.getBots()) as Bot[];
      setBots(response);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Layout>
      <DeliveryTable
        deliveries={deliveries}
        bots={bots}
        callback={getDeliveries}
      ></DeliveryTable>
    </Layout>
  );
}
