import AppTable from "../../../components/common/AppTable";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { produce } from "immer";
import type { Inquiry } from "../../../types/inquiry";

const Inquiries = () => {
  const [query, setQuery] = useState<any>({ page: 1, limit: 5 });

  return (
    <AppTable
      title="Lead Inquiries"
      subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"
      columns={propertColumns}
      limit={query.limit}
      onChange={p => {
        setQuery(
          produce(query, (draft: any) => {
            draft.page = p.current;
          }),
        );
      }}
    />
  );
};

export default Inquiries;

export const propertColumns: ColumnsType<Inquiry> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "",
  },
  {
    title: "Property of interest",
  },
  {
    title: "Message",
  },
  {
    title: "Created At",
  },
];
