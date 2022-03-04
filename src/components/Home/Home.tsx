import React, { useEffect, useState } from "react";
import { Layout, notification } from "antd";
import api from "../../api/api";
import { Delivery } from "../../types/delivery.model";
import { Bot } from "../../types/bot.model";
import { DeliveryTable } from "../DeliveryTable/DeliveryTable";
import { BotTable } from "../BotsTable/BotTable";
const { Header, Footer, Sider, Content } = Layout;

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
      setDeliveries([]);
      setDeliveries(deliveyList);
    } catch (err) {
      alert(err);
    }
  };

  const getBots = async () => {
    try {
      const response = (await api.getBots()) as Bot[];
      const botList = [];
      response.map((bot) => {
        const botWithKey = bot;
        botWithKey.key = bot.id;
        botList.push(botWithKey);
      });
      setBots(response);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Layout>
      <Header>
        <h1 style={{ color: "whitesmoke" }}> Kiwibot technical test</h1>
      </Header>
      <section
        style={{ display: "flex", flexDirection: "row", margin: "1rem" }}
      >
        <div>
          <h2
            style={{
              textAlign: "center",
            }}
          >
            {" "}
            Bots list
          </h2>
          <BotTable bots={bots}></BotTable>
        </div>
        <Content>
          <DeliveryTable
            deliveries={deliveries}
            bots={bots}
            callback={() => {
              getDeliveries();
              getBots();
            }}
          ></DeliveryTable>
        </Content>
      </section>
      <Footer style={{ textAlign: "center" }}>
        {" "}
        <a href="https://github.com/nsforero10">@nsforero10</a> @2022 Created by
        Nicolas Forero in Colombia
      </Footer>
    </Layout>
  );
}
