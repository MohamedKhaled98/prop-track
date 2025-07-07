import AppTable from "../../../components/common/AppTable";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { produce } from "immer";

const Viewings = () => {
  const [query, setQuery] = useState<any>({ page: 1, limit: 5 });

  return (
    <AppTable
      title="Scheduled Viewings"
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

export default Viewings;

export const propertColumns: ColumnsType = [
  {
    title: "Client",
    dataIndex: "name",
  },
  {
    title: "Property",
  },
  {
    title: "Datetime",
  },
  {
    title: "Status",
  },
];
