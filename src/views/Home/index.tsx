import { useState } from "react";
import Page from "components/Page";
import Button from "@material-ui/core/Button";
import Table from "components/Table";
import Search from "components/Search";
import DropdownSelect from "components/DropdownSelect";
import Form from "components/Form";
import Grid from "@material-ui/core/Grid";
import { useGetOrders, useGetOrdersByCustomer } from "api/useOrders";

import { makeStyles } from "@material-ui/core/styles";

const customerTypeOptions = [
  { label: "All", value: "All" },
  { label: "Customer", value: "Customer" },
  { label: "Supplier", value: "Supplier" },
];

const orderTypeOptions = [
  { label: "All", value: "All" },
  { label: "SaleOrder", value: "SaleOrder" },
];

export default function Home() {
  const classes = useStyles();

  const [customerType, setCustomerType] = useState(customerTypeOptions[0]);
  const [orderType, setOrderType] = useState(orderTypeOptions[0]);

  const onSelectCustomerType = (value: any) => {
    setCustomerType(value);
    console.log(value);
  };

  const { data, status } = useGetOrders();
  const { data: customerData, status: customerStatus } = useGetOrdersByCustomer(
    "test",
    "Standard"
  );

  console.log("🚀 ~ file: index.tsx ~ line 36 ~ Home ~ data", customerData);

  const onSelectOrderType = (value: any) => {
    setOrderType(value);
    console.log(value);
  };
  return (
    <Page headerTitle={"Home"}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Search />
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary">
            Create Order
          </Button>
        </Grid>
        <Grid item xs={12}>
          <DropdownSelect
            options={customerTypeOptions}
            onSelectOption={onSelectCustomerType}
            value={customerType}
          />
        </Grid>
        <Grid item xs={12}>
          <DropdownSelect
            options={orderTypeOptions}
            onSelectOption={onSelectOrderType}
            value={orderType}
          />
        </Grid>
      </Grid>
      <Table />
      <div className={classes.form}>
        <Form />
      </div>
    </Page>
  );
}

const useStyles = makeStyles({
  filterContainer: {
    // display: "flex",
  },
  form: {
    backgroundColor: "#ff0000",
  },
});
