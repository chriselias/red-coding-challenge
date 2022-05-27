// @ts-nocheck
import {
  DataGrid,
  GridColDef,
  GridSelectionModel,
} from "@material-ui/data-grid";
import Order from "types/OrderInterface";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { useDeleteOrder } from "api/useOrders";

const columns: GridColDef[] = [
  { field: "orderId", headerName: "Order ID", width: 150 },
  {
    field: "createdDate",
    headerName: "Creation Date",
    width: 200,
    editable: false,
    sortable: false,
  },
  {
    field: "createdByUserName",
    headerName: "Created By",
    width: 150,
    editable: false,
    sortable: false,
  },
  {
    field: "orderType",
    headerName: "Order Type",
    width: 150,
    editable: false,
    sortable: false,
  },
  {
    field: "customerName",
    headerName: "Customer",
    description: "This column has a value getter and is not sortable.",
    editable: false,
    sortable: false,
    width: 160,
  },
];
interface IProps {
  rows: Order[];
  isLoading: boolean;
}

export default function Table(props: IProps) {
  const { rows, isLoading } = props;
  const { mutate: deleteOrder } = useDeleteOrder();
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  const onDeleteRow = () => {
    deleteOrder(selectionModel);
  };

  const formatedRows = rows.map((row) => {
    return {
      id: row.orderId,
      ...row,
    };
  });
  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={formatedRows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={setSelectionModel}
          selectionModel={selectionModel}
          disableColumnMenu
          autoHeight={true}
          loading={isLoading}
        />
        <div style={{ padding: 20 }}>
          {selectionModel.length > 0 && (
            <Button variant="contained" color="primary" onClick={onDeleteRow}>
              Delete selected row(s)
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
