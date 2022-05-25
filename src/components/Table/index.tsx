import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
} from "@material-ui/data-grid";

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

const rows = [
  {
    orderId: 2,
    orderType: "SaleOrder",
    customerName: "as",
    createdDate: "Thursday, 19 May 2022",
    createdByUserName: "tes",
  },
  {
    orderId: 3,
    orderType: "SaleOrder",
    customerName: "joe",
    createdDate: "Monday, 23 May 2022",
    createdByUserName: "xander",
  },
  {
    orderId: 4,
    orderType: "SaleOrder",
    customerName: "joe",
    createdDate: "Monday, 23 May 2022",
    createdByUserName: "xander",
  },
];

const formatedRows = rows.map((row) => {
  return {
    id: row.orderId,
    ...row,
  };
});

console.log("r", rows);
console.log("fr", formatedRows);

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

export default function Table() {
  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={formatedRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </>
  );
}
