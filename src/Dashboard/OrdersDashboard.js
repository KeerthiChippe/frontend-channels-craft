// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { startGetAllOrders } from "../actions/order-action";
// import { Bar } from "react-chartjs-2";

// const OrdersDashboard = () => {
//   const dispatch = useDispatch();
//   const orders = useSelector((state) => state.order);

//   useEffect(() => {
//     dispatch(startGetAllOrders());
//   }, [dispatch]);

//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     if (orders && orders.paid) {
//       const packagesData = {};
//       const channelsData = {};

//       orders.paid?.forEach((order) => {
//         order.packages?.forEach((pack) => {
//           const packageName = pack.packageId?.packageName;
//           packagesData[packageName] = packagesData[packageName]
//             ? packagesData[packageName] + 1
//             : 1;
//         });

//         order.channels?.forEach((channel) => {
//           const channelName = channel.channelId?.channelName;
//           channelsData[channelName] = channelsData[channelName]
//             ? channelsData[channelName] + 1
//             : 1;
//         });
//       });

//       const packagesChartData = {
//         labels: Object.keys(packagesData),
//         datasets: [
//           {
//             label: "Packages",
//             backgroundColor: "rgba(255, 99, 132, 0.6)",
//             data: Object.values(packagesData),
//           },
//         ],
//       };

//       const channelsChartData = {
//         labels: Object.keys(channelsData),
//         datasets: [
//           {
//             label: "Channels",
//             backgroundColor: "rgba(54, 162, 235, 0.6)",
//             data: Object.values(channelsData),
//           },
//         ],
//       };

//       setChartData({ packagesChartData, channelsChartData });
//     }
//   }, [orders]);

//   return (
//     <div style={{ width: '80%', margin: 'auto' }}>
//       <h2>Orders Count</h2>
//       <div style={{ width: '100%', textAlign: 'center' }}>
//         {chartData && (
//           <>
//             <h3>Packages Bought by Customers</h3>
//             <Bar data={chartData.packagesChartData} />
//             <h3>Channels Bought by Customers</h3>
//             <Bar data={chartData.channelsChartData} />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrdersDashboard;
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startGetAllOrders } from "../actions/order-action";
import { Bar } from "react-chartjs-2";

const OrdersDashboard = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(startGetAllOrders());
  }, [dispatch]);

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (orders && orders.paid) {
      const combinedData = {};

      orders.paid?.forEach((order) => {
        order.packages?.forEach((pack) => {
          const packageName = pack.packageId?.packageName;
          combinedData[packageName] = combinedData[packageName]
            ? { ...combinedData[packageName], packages: combinedData[packageName].packages + 1 }
            : { packages: 1, channels: 0 };
        });

        order.channels?.forEach((channel) => {
          const channelName = channel.channelId?.channelName;
          combinedData[channelName] = combinedData[channelName]
            ? { ...combinedData[channelName], channels: combinedData[channelName].channels + 1 }
            : { packages: 0, channels: 1 };
        });
      });

      const labels = Object.keys(combinedData);
      const datasets = [
        {
          label: "Packages",
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          data: labels.map((label) => combinedData[label].packages),
        },
        {
          label: "Channels",
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          data: labels.map((label) => combinedData[label].channels),
        },
      ];

      const chartData = {
        labels: labels,
        datasets: datasets,
      };

      setChartData(chartData);
    }
  }, [orders]);

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <h2>Packages & Channels bought by customers</h2>
      <div style={{ width: '100%', textAlign: 'center' }}>
        {chartData && (
          <Bar
            data={chartData}
            options={{
              indexAxis: 'y', // Reversed axis
              scales: {
                x: { stacked: true },
                y: { stacked: true }
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default OrdersDashboard;
