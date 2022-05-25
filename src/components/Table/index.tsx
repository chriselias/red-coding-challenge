import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
} from "@material-ui/data-grid";
import Order from "types/OrderInterface";

const columns: GridColDef[] = [
  { field: "orderId", headerName: "Order ID", width: 150 },
  {
    field: "createdDate",
    headerName: "Creation Date",
    width: 200,
    editable: true,
  },
  {
    field: "createdByUserName",
    headerName: "Created By",
    width: 150,
    editable: true,
  },
  {
    field: "orderType",
    headerName: "Order Type",
    width: 150,
    editable: true,
  },
  {
    field: "customerName",
    headerName: "Customer",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
];
interface IProps {
  rows: Order[];
}

export default function Table(props: IProps) {
  const { rows } = props;

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
        />
      </div>
    </>
  );
}
