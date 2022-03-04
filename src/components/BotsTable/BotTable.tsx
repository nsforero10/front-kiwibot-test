import * as React from "react";
import { Table, Tag } from "antd";
import { Bot } from "../../types/bot.model";

export interface IBotTableProps {
  bots: Bot[];
}

export function BotTable(props: IBotTableProps) {
  const { bots } = props;
  const columns = [
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Zone",
      dataIndex: "zone_id",
      key: "zone_id",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color =
          status === "available"
            ? "green"
            : status === "reserved"
            ? "yellow"
            : "volcano";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={bots}
      size={"small"}
      pagination={false}
      style={{ marginRight: "1rem" }}
    ></Table>
  );
}
