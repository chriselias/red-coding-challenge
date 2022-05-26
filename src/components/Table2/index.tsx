import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useDeleteOrder } from "api/useOrders";
// import SearchBar from "material-ui-search-bar";
import Order from "types/OrderInterface";
import { Button } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";

interface food {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Table2({ data }: { data: Order[] }) {
  const [rows, setRows] = useState<Order[]>(data);
  const [searched, setSearched] = useState<string>("");
  const [ordersToDelete, setOrdersToDelete] = useState<number[]>([]);
  const { mutate: deleteOrder } = useDeleteOrder();
  const [checked, setChecked] = React.useState(false);
  const [selected, setSelected] = React.useState<number[]>([]);

  const classes = useStyles();

  useEffect(() => {
    setRows(data);
  }, [data]);

  const requestSearch = (searchedVal: string) => {
    const filteredRows = data.filter((row) => {
      return row.orderId.toString().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const handleDelete = () => {
    let removeDups = [...new Set(ordersToDelete)];
    console.log(removeDups);
    deleteOrder(removeDups);
  };

  const handleCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    orderId: number
  ) => {
    event.stopPropagation();
    console.log("checkbox select");

    setChecked(event.target.checked);

    console.log(orderId);
    let test = ordersToDelete;
    setOrdersToDelete([...test, orderId]);
    console.log("🚀 ~ file: index.tsx ~ line 42 ~ Home ~ data", ordersToDelete);
  };
  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  return (
    <>
      <Paper>
        {/* <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        /> */}
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  {/* <Checkbox
                    onClick={handleCheck()}
                    className="selectCheckbox"
                    checked={false}
                  /> */}
                </TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Creation Date</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell>Order Type</TableCell>
                <TableCell>Customer</TableCell>
                {/* <TableCell></TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                const isChecked: any = isSelected(row.orderId);
                return (
                  <TableRow key={row.orderId}>
                    <TableCell>
                      <Checkbox
                        onChange={(event) => handleCheck(event, row.orderId)}
                        className="selectCheckbox"
                        checked={isChecked}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.orderId}
                    </TableCell>
                    <TableCell>{row.createdDate}</TableCell>
                    <TableCell>{row.createdByUserName}</TableCell>
                    <TableCell>{row.orderType}</TableCell>
                    <TableCell>{row.customerName}</TableCell>
                    {/* <TableCell>
                    <Button onClick={() => handleDelete(row)}>Delete</Button>
                  </TableCell> */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Button onClick={handleDelete}>Delete</Button>
      </Paper>
    </>
  );
}
