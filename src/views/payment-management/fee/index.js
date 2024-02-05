// material-ui
import { Grid } from '@mui/material';
import { useState,useEffect } from 'react';
// project imports
import FeesTable from 'features/payment-management/fees/components/FeesTable';
import FeesTableSkeleton from 'components/cards/Skeleton/PaymentSkeleton';
// ==============================|| SAMPLE PAGE ||============================== //

const Fee = () => {

  const [loading, setLoading] = useState(true);

  // Simulate loading delay with useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
     <Grid>
      <Grid spacing={1} className="match-height">
        {loading ? (
          // If data is still loading, display skeleton
          <FeesTableSkeleton />
        ) : (
          // Once data is loaded, display actual FeesTable component
          <FeesTable />
        )}
      </Grid>
    </Grid>

    </>
  );
};

export default Fee;
