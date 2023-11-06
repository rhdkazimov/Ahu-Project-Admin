import React from "react";
import { Spinner, Text } from "@chakra-ui/react";
import { BarComp } from "./bar";

const Dashboard = () => {
  const [data, setData] = React.useState([]);
  const [ordersStatistics, setOrderStatistics] = React.useState({});

  // if (isLoading) {
  //   return (
  //     <Spinner
  //       thickness="4px"
  //       speed="0.65s"
  //       emptyColor="gray.200"
  //       color="blue.500"
  //       size="xl"
  //     />
  //   );
  // }

  return (
    <>
      <Text className="dashboardInfo" as="b" fontSize="5xl">
        Statistika
      </Text>
      <div className="dashboard">
        <BarComp data={data} />
      </div>
    </>
  );
};

export default Dashboard;
