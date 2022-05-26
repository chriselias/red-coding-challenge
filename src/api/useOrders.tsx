import { useQuery, useMutation, useQueryClient } from "react-query";

const apiURL = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const requestHeaders: any = {
  ApiKey: apiKey,
  "Content-Type": "application/json",
};

const getOrders = async () => {
  const response = await fetch(`${apiURL}/orders`, {
    headers: requestHeaders,
  });
  return response.json();
};

function useGetOrders() {
  return useQuery("orders", getOrders);
}

const getOrdersByCustomer = async (customerId: string, orderType: string) => {
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

const deleteOrder = async (orderIds: number[]) => {
  const response = await fetch(`${apiURL}/orders/delete`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(orderIds),
  });
  return response.json();
};

function useDeleteOrder() {
  const queryClient = useQueryClient();

  return useMutation("newOrder", deleteOrder, {
    onSettled: () => {
      queryClient.invalidateQueries("orders");
    },
  });
}

export { useGetOrders, useGetOrdersByCustomer, useNewOrder, useDeleteOrder };
