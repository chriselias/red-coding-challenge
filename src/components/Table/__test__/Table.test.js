import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Table from "components/Table";

const queryClient = new QueryClient();
const MockTable = ({ rows, isLoading }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Table rows={rows} isLoading={isLoading} />;
    </QueryClientProvider>
  );
};

const MockData = [
  {
    orderId: 1,
    orderType: "PurchaseOrder",
    customerName: "Luke Skywalker",
    createdDate: "Thursday, 26 May 2022",
    createdByUserName: "Chris",
  },
  {
    orderId: 2,
    orderType: "PurchaseOrder",
    customerName: "Darth Vader",
    createdDate: "Thursday, 26 May 2022",
    createdByUserName: "Chris",
  },
  {
    orderId: 3,
    orderType: "SalesOrder",
    customerName: "Obi-Wan Kenobi",
    createdDate: "Thursday, 26 May 2022",
    createdByUserName: "Chris",
  },
];

describe("<Table />", () => {
  it("should render a table with the correct number of rows", async () => {
    const { getAllByRole } = render(
      <MockTable rows={MockData} isLoading={false} />
    );
    await waitFor(() => expect(getAllByRole("row")).toHaveLength(4));
  });
});
