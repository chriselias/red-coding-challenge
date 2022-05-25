import { useQuery, useMutation, useQueryClient } from "react-query";
import Order from "types/OrderInterface";

const apiURL = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const getOrders = async () => {
  let requestHeaders: any = { ApiKey: apiKey };
  const response = await fetch(`${apiURL}/orders`, {
    headers: requestHeaders,
  });
  return response.json();
};

function useGetOrders() {
  return useQuery("orders", getOrders);
}

const getOrdersByCustomer = async (customerId: string, orderType: string) => {
  let requestHeaders: any = { ApiKey: apiKey };
  const response = await fetch(
    `${apiURL}/orders/${customerId}?orderType=${orderType}`,
    {
      headers: requestHeaders,
    }
  );
  return response.json();
};

// TODO: Add order type to query
function useGetOrdersByCustomer(customerId: string, orderType: string) {
  return useQuery(["customerId", customerId], () =>
    getOrdersByCustomer(customerId, orderType)
  );
}

const newOrder = async (order: any) => {
  let requestHeaders: any = {
    ApiKey: apiKey,
    "Content-Type": "application/json",
  };
  const response = await fetch(`${apiURL}/orders`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(order),
  });
  return response.json();
};

function useNewOrder() {
  const queryClient = useQueryClient();
  return useMutation("newOrder", newOrder, {
    onSettled: () => {
      queryClient.invalidateQueries("orders");
    },
  });
}

const deleteOrder = async (orderId: [number]) => {
  let requestHeaders: any = { ApiKey: apiKey };
  const response = await fetch(`${apiURL}/orders`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(orderId),
  });
  return response.json();
};

function useDeleteOrder(orderId: [number]) {
  return useQuery("newOrder", () => deleteOrder(orderId));
}

export { useGetOrders, useGetOrdersByCustomer, useNewOrder, useDeleteOrder };
