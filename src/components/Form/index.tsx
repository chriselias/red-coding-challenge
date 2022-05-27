import { useState } from "react";
import Input from "components/Input";
import { Button } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import { useNewOrder } from "api/useOrders";
import Grid from "@material-ui/core/Grid";

// TODO: export options to their own file
const customerTypeOptions = [
  { label: "All", value: "All" },
  { label: "Customer", value: "Customer" },
  { label: "Supplier", value: "Supplier" },
];

const orderTypeOptions = [
  { label: "SaleOrder", value: "SaleOrder" },
  { label: "Standard", value: "Standard" },
];

const defaultValues = {
  createdByUserName: "",
  customerName: "",
  orderType: orderTypeOptions[0].value,
};

export default function Form() {
  const [formValues, setFormValues] = useState(defaultValues);
  const { mutate, isSuccess } = useNewOrder();
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name as string]: value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(formValues);
    mutate(formValues);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container direction="row" alignItems="flex-start" spacing={4}>
          <Grid item>
            <Input
              id="createdByUserName"
              name="createdByUserName"
              label="Created By"
              value={formValues.createdByUserName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <Input
              id="customerName"
              name="customerName"
              label="Customer Name"
              value={formValues.customerName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <Select
              name="orderType"
              value={formValues.orderType}
              onChange={handleInputChange}
            >
              {orderTypeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          {/* <FormControl variant="outlined">
        <InputLabel id="orderType">OrderType</InputLabel>
        <Select
          labelId="orderType"
          id="orderType"
          value={formValues.orderType}
          onChange={handleInputChange}
          label="Order Type"
        >
          {orderTypeOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}

          {/* <DropdownSelect
        options={orderTypeOptions}
        onSelectOption={handleInputChange}
        value={formValues.orderType}
      /> */}
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar open={isSuccess} autoHideDuration={6000}>
        <p>sucess</p>
      </Snackbar>
    </>
  );
}
