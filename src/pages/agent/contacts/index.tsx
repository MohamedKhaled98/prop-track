import AppTable from "../../../components/common/AppTable";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { produce } from "immer";

const Contacts = () => {
  const [query, setQuery] = useState<any>({ page: 1, limit: 5 });

  return (
    <AppTable
      title="Contacts"
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

export default Contacts;

export const propertColumns: ColumnsType = [
  {
    title: "Name",
    dataIndex: "name",
    key: "",
  },
  {
    title: "Email",
  },
  {
    title: "Type",
  },
  {
    title: "Status",
  },
];
