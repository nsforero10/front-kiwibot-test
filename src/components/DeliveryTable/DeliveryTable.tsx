import * as React from "react";
import { Select, Table, Tag } from "antd";
import { Bot } from "../../types/bot.model";
import { Delivery } from "../../types/delivery.model";
import api from "../../api/api";

const { Option } = Select;

export interface IDeliveryTableProps {
  bots: Bot[];
  deliveries: Delivery[];
  callback: () => void;
}

export function DeliveryTable(props: IDeliveryTableProps) {
  const { bots, deliveries } = props;
  const columns = [
    {
      title: "Creation Date",
      dataIndex: "creation_date",
      key: "creation_date",
      sorter: (a: any, b: any) => a.creation_date - b.creation_date,
      render: (creation_date: Date) => {
        const date = new Date(creation_date).toLocaleString();
        return date;
      },
    },
    {
      title: "Zone",
      dataIndex: "zone_id",
      key: "zone_id",
    },
    {
      title: "Bot",
      dataIndex: "bot",
      key: "bot",
      render: (bot: string, record: Delivery) => {
        return bot ? (
          bots.filter((pBot) => pBot.id === bot)[0]?.number
        ) : (
          <Select onChange={(e) => assignDelivery(record.id, e)}>
            {bots.map((bot) => (
              <Option key={bot.id}>{bot.number}</Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: "Pickup location",
      dataIndex: "pickup",
      key: "pickup",
      render: (pickup: any) => `${pickup.pickup_lat}, ${pickup.pickup_lon}`,
    },
    {
      title: "Dropoff location",
      dataIndex: "dropoff",
      key: "dropoff",
      render: (dropoff: any) =>
        `${dropoff.dropoff_lat}, ${dropoff.dropoff_lon}`,
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      render: (state: string, record: Delivery) => {
        return (
          <Select
            defaultValue={state}
            onChange={(e) => updateStateDelivery(record.id, e)}
          >
            <Option key={"pending"} value={"pending"}>
              <Tag color={"volcano"}> PENDING</Tag>
            </Option>
            <Option key={"assigned"} value={"assigned"}>
              <Tag color={"yellow"}> ASSIGNED</Tag>
            </Option>
            <Option key={"in_transit"} value={"in_transit"}>
              <Tag color={"geekblue"}> IN TRANSIT</Tag>
            </Option>
            <Option key={"delivered"} value={"delivered"}>
              <Tag color={"green"}> DELIVERED</Tag>
            </Option>
          </Select>
        );
      },
      filters: [
        {
          text: "pending",
          value: "pending",
        },
        {
          text: "assigned",
          value: "assigned",
        },
        {
          text: "in_transit",
          value: "in_transit",
        },
        {
          text: "delivered",
          value: "delivered",
        },
      ],
      onFilter: (value: any, record: Delivery) => {
        console.log("value:", value, "delivery:", record);
        return record.state === value;
      },
    },
  ];
  const updateStateDelivery = async (deliveryId: string, state: string) => {
    try {
      await api.updateDelivery(deliveryId, {
        state: state,
      });
      props.callback();
    } catch (err) {
      alert(err);
    }
  };
  const assignDelivery = async (deliveryId: string, botId: string) => {
    try {
      await api.updateDelivery(deliveryId, {
        bot: botId,
        state: "assigned",
      });
      props.callback();
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div>
      <Table dataSource={deliveries} columns={columns}></Table>
    </div>
  );
}
