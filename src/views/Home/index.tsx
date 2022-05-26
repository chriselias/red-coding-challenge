import { useState, useEffect } from "react";
import Page from "components/Page";
import Button from "@material-ui/core/Button";
import Table from "components/Table";
import Search from "components/Search";
import DropdownSelect from "components/DropdownSelect";
import Form from "components/Form";
import Grid from "@material-ui/core/Grid";
import { useGetOrders, useGetOrdersByCustomer } from "api/useOrders";
import CircularProgress from "@material-ui/core/CircularProgress";
import Order from "types/OrderInterface";
import { makeStyles } from "@material-ui/core/styles";
import Table2 from "components/Table2";

const customerOptions = [
  { label: "All", value: "All" },
  { label: "Customer", value: "Customer" },
  { label: "Supplier", value: "Supplier" },
];

const orderTypeOptions = [
  { label: "All", value: "All" },
  { label: "Sale", value: "SaleOrder" },
  { label: "Standard", value: "Standard" },
];

export type SelectOption = {
  label: string;
  value: any;
};

export default function Home() {
  const classes = useStyles();
  const { data, isLoading } = useGetOrders();
  const { data: customerData } = useGetOrdersByCustomer("test", "Standard");

  const [customer, setCustomer] = useState<SelectOption[]>();
  const [orderType, setOrderType] = useState(orderTypeOptions[0]);
  const [orders, setOrders] = useState(data);
  const [searchQuery, setSeachQuery] = useState("");

  const formatCustomers = (data: any) => {
    if (!data) return;
    const formated = data.map((order: any) => {
      return {
        label: order.customerName,
        value: order.customerName,
      };
    });
    setCustomer(formated);
    console.log(formated);
  };

  useEffect(() => {
    setOrders(data);
    formatCustomers(data);
  }, [data]);

  const onSelectCustomerType = (value: any) => {
    setCustomer(value);
    console.log(value);
  };

  const onSearch = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    setSeachQuery(value);
    console.log("searchQ", searchQuery);
    console.log("value", value);
    const orginalData = data;
    if (searchQuery === "") {
      console.log("og", orginalData);
      setOrders(orginalData);
    } else {
      const filteredRows = orginalData.filter(
        (order: any) => order.orderId === Number(searchQuery)
      );
      setOrders(filteredRows);
    }
  };

  const onSelectOrderType = (value: any) => {
    if (!value) return;
    setOrderType(value);
    const orginalData = data;
    if (value.value === "All") {
      console.log("og", orginalData);
      setOrders(orginalData);
    } else {
      const filteredRows = orginalData.filter(
        (order: any) => order.orderType === value.value
      );
      setOrders(filteredRows);
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Page headerTitle={"Home"}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Search
            id="search"
            name="search"
            label="Search"
            value={searchQuery}
            onChange={onSearch}
          />
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary">
            Create Order
          </Button>
        </Grid>
        <Grid item xs={12}>
          {/* <DropdownSelect
            options={customer}
            onSelectOption={onSelectCustomerType}
            value={customer[0]}
          /> */}
        </Grid>
        <Grid item xs={12}>
          <DropdownSelect
            options={orderTypeOptions}
            onSelectOption={onSelectOrderType}
            value={orderType}
          />
        </Grid>
      </Grid>
      {/* <Table rows={orders} /> */}
      {orders && <Table2 data={orders} />}
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
  form: {},
});
