// material-ui
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
// project imports
import ClassSkeleton from 'components/cards/Skeleton/ClassSkeleton';
import OfflineClassCard from 'features/class-management/offline-classes/components/OfflineClassCard';
import OfflineClassCardHeader from 'features/class-management/offline-classes/components/OfflineClassCardHeader';
import OfflineClassFilterCard from 'features/class-management/offline-classes/components/OfflineClassFilterCard';
import { useSelector } from 'react-redux';

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);

    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

const OfflineClass = () => {
  const [loading, setLoading] = useState(true);

  useTimeout(() => {
    setLoading(false);
  }, 1000);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  return (
    <>
      <Grid>
        <OfflineClassFilterCard selectedBranchId={selectedBranchId}/>
        <OfflineClassCardHeader selectedBranchId={selectedBranchId}/>
        {loading ? (
          <ClassSkeleton />
        ) : (
          <Grid container spacing={1} className="match-height" sx={{ marginTop: 3 }}>
            <OfflineClassCard />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default OfflineClass;
