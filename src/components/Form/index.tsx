import { useState } from "react";
import Input from "components/Input";
import { Button } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useNewOrder } from "api/useOrders";
import Grid from "@material-ui/core/Grid";

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
    mutate(formValues);
    setFormValues(defaultValues);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ width: 300 }}>
        {isSuccess && <h4>Order Added</h4>}
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Input
              id="createdByUserName"
              name="createdByUserName"
              label="Created By"
              value={formValues.createdByUserName}
              onChange={handleInputChange}
              required={true}
            />
          </Grid>
          <Grid item>
            <Input
              id="customerName"
              name="customerName"
              label="Customer Name"
              value={formValues.customerName}
              onChange={handleInputChange}
              required={true}
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
          <Grid item>
            <Button variant="contained" color="secondary" type="submit">
              Create Order
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
