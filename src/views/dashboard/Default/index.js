// import { useEffect, useState } from 'react';

// // material-ui
// import { Grid } from '@mui/material';

// // project imports
// import EarningCard from './EarningCard';
// import PopularCard from './PopularCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard';
// import TotalGrowthBarChart from './TotalGrowthBarChart';
// import { gridSpacing } from 'store/constant';

// // ==============================|| DEFAULT DASHBOARD ||============================== //

// const Dashboard = () => {
//   const [isLoading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(false);
//   }, []);

//   return (
//     <Grid container spacing={gridSpacing}>
//       <Grid item xs={12}>
//         <Grid container spacing={gridSpacing}>
//           <Grid item lg={4} md={6} sm={6} xs={12}>
//             <EarningCard isLoading={isLoading} />
//           </Grid>
//           <Grid item lg={4} md={6} sm={6} xs={12}>
//             <TotalOrderLineChartCard isLoading={isLoading} />
//           </Grid>
//           <Grid item lg={4} md={12} sm={12} xs={12}>
//             <Grid container spacing={gridSpacing}>
//               <Grid item sm={6} xs={12} md={6} lg={12}>
//                 <TotalIncomeDarkCard isLoading={isLoading} />
//               </Grid>
//               <Grid item sm={6} xs={12} md={6} lg={12}>
//                 <TotalIncomeLightCard isLoading={isLoading} />
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item xs={12}>
//         <Grid container spacing={gridSpacing}>
//           <Grid item xs={12} md={8}>
//             <TotalGrowthBarChart isLoading={isLoading} />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <PopularCard isLoading={isLoading} />
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default Dashboard;

// material-ui
import { Grid } from '@mui/material';

// project imports
// import { gridSpacing } from 'store/constant';
import AllActivity from './card/Allactivity';
import CardData from './card/CardData';
import CardPopularCourse from './card/CardPopularCourse';
import CardProjectStatus from './card/CardProjectStatus';
import CardStatsVertical from './card/CardStatsVertical';
import RevenueReport from './card/RevenueReport';
import CardSupportTracker from './card/CardSupportTracker';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8.5}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6} lg={3}>
              <CardStatsVertical
                stats="₹56,000"
                chipText="-12.2%"
                chipColor="default"
                avatarColor="error"
                title="Total Earnings"
                subtitle="Last week"
                avatarIcon="healthicons:money-bag"
              />
            </Grid>
            <Grid item xs={6} sm={6} lg={3}>
              <CardStatsVertical
                stats="₹96,419"
                chipText="+25.2%"
                avatarColor="info"
                chipColor="default"
                title="Payouts"
                subtitle="Last week"
                avatarIcon="mingcute:wallet-fill"
              />
            </Grid>
            <Grid item xs={6} sm={6} lg={3}>
              <CardStatsVertical
                stats="1,000"
                chipText="-12.2%"
                chipColor="default"
                avatarColor="success"
                title="Instructor"
                subtitle="Last week"
                avatarIcon="ic:baseline-money"
              />
            </Grid>
            <Grid item xs={6} sm={6} lg={3}>
              <CardStatsVertical
                stats="24,000"
                chipText="+25.2%"
                avatarColor="primary"
                chipColor="default"
                title="Students"
                subtitle="Last week"
                avatarIcon="ph:student"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <RevenueReport />
            </Grid>
            <Grid item xs={12} md={5}>
              <CardPopularCourse />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={6} sm={6} lg={3}>
              <CardData
                stats="8000"
                chipText="-12.2%"
                chipColor="default"
                avatarColor="error"
                title="Learning Path"
                subtitle="Last week"
                avatarIcon="healthicons:money-bag"
              />
            </Grid>
            <Grid item xs={6} sm={6} lg={3}>
              <CardData
                stats="2333"
                chipText="+25.2%"
                avatarColor="info"
                chipColor="default"
                title="Courses"
                subtitle="Last week"
                avatarIcon="mingcute:wallet-fill"
              />
            </Grid>
            <Grid item xs={6} sm={6} lg={3}>
              <CardData
                stats="4400"
                chipText="-12.2%"
                chipColor="default"
                avatarColor="error"
                title="Category"
                subtitle="Last week"
                avatarIcon="ic:baseline-money"
              />
            </Grid>
            <Grid item xs={6} sm={6} lg={3}>
              <CardData
                stats="4321"
                chipText="+25.2%"
                avatarColor="info"
                chipColor="default"
                title="Sub Category"
                subtitle="Last week"
                avatarIcon="ph:student"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CardProjectStatus />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardSupportTracker />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={3.5}>
        <Grid container>
          <Grid item xs={12}>
            <AllActivity />
          </Grid>
          {/* <Grid item sx={{mt:2}} xs={12}>
        <AllActivity/>
        </Grid> */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
