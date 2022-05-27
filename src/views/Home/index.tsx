import { useState, useEffect } from "react";
import Page from "components/Page";
import Button from "@material-ui/core/Button";
import Table from "components/Table";
import Search from "components/Search";
import DropdownSelect from "components/DropdownSelect";
import Form from "components/Form";
import Grid from "@material-ui/core/Grid";
import { useGetOrders } from "api/useOrders";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Backdrop from "@material-ui/core/Backdrop";
import { CloseTwoTone, Add } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import Order from "types/OrderInterface";

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
  const [toggleForm, setToggleForm] = useState(false);
  const [customers, setCustomers] = useState<SelectOption[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<SelectOption>(
    customers[0]
  );
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
    const uniqueCustomers: any[] = [
      ...new Map(formated.map((v: any) => [v.value, v])).values(),
    ];

    setCustomers(uniqueCustomers);
  };

  useEffect(() => {
    setOrders(data);
    formatCustomers(data);
  }, [data]);

  const onSelectCustomerType = (value: any) => {
    setSelectedCustomer(value);
    const orginalData = data;
    if (value === undefined) {
      setOrders(orginalData);
    } else {
      const filteredRows = orginalData.filter(
        (order: Order) => order.customerName === value.value
      );
      setOrders(filteredRows);
    }
  };

  const onSearch = (event: any) => {
    event.preventDefault();
    const { value } = event.target;
    setSeachQuery(value);
    const orginalData = data;
    if (value === "") {
      setOrders(orginalData);
    } else {
      const filteredRows = orginalData.filter(
        (order: Order) => order.orderId === Number(value)
      );
      setOrders(filteredRows);
    }
  };

  const onSelectOrderType = (value: any) => {
    if (!value) return;
    setOrderType(value);
    const orginalData = data;
    if (value.value === "All") {
      setOrders(orginalData);
    } else {
      const filteredRows = orginalData.filter(
        (order: any) => order.orderType === value.value
      );
      setOrders(filteredRows);
    }
  };

  return (
    <Page headerTitle={"Home"}>
      <Grid container spacing={2} style={{ paddingTop: 20, paddingBottom: 20 }}>
        <Grid item xs={6} md={3}>
          <Search
            id="search"
            name="search"
            label="Search by Order ID"
            value={searchQuery}
            onChange={onSearch}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setToggleForm(!toggleForm)}
            startIcon={<Add />}
          >
            Create Order
          </Button>
        </Grid>
        <Grid item xs={12} md={3}>
          <DropdownSelect
            options={customers}
            onSelectOption={onSelectCustomerType}
            value={selectedCustomer}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DropdownSelect
            options={orderTypeOptions}
            onSelectOption={onSelectOrderType}
            value={orderType}
          />
        </Grid>
      </Grid>
      <Backdrop className={classes.backdrop} open={toggleForm}>
        <Paper>
          <div className={classes.form}>
            <div className={classes.close}>
              <IconButton
                aria-label="close"
                onClick={() => setToggleForm(!toggleForm)}
                color="primary"
              >
                <CloseTwoTone />
              </IconButton>
            </div>
            <Form />
          </div>
        </Paper>
      </Backdrop>
      {orders && <Table rows={orders} isLoading={isLoading} />}
    </Page>
  );
}

const useStyles = makeStyles({
  form: {
    margin: "20px 0",
    padding: "10px 20px 20px",
  },
  backdrop: {
    zIndex: 1,
    color: "#fff",
  },
  close: {
    display: "flex",
    justifyContent: "flex-end",
  },
});
