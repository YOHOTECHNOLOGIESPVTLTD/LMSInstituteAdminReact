import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BatchViewSkeleton from 'components/cards/Skeleton/BatchViewSkeleton';
import { getBatchDetails } from 'features/batch-management/batches/services/batchServices';
import HeaderCard from 'features/batch-management/view-batch/components/ViewBatchHeaderCard';
import ViewBatchTable from 'features/batch-management/view-batch/components/ViewBatchTable';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch ,useSelector} from 'react-redux';
import { useLocation } from 'react-router';
import { useInstitute } from 'utils/get-institute-details';




const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);

    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

const ViewBatch = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const batchId = location.state.id;
  const [batchData, setBatchData] = useState([]);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  useTimeout(() => {
    setLoading(false);
  }, 1000);

  useEffect(() => {
    const data = {
      batch_id: batchId,
      branchId: selectedBranchId,
      instituteId: useInstitute().getInstituteId()    
    };
    getBatchData(data);
  }, [dispatch, batchId]);

  const getBatchData = async (data) => {
    try {
      setLoading(true);
      const result = await getBatchDetails(data);
      if (result.success) {
        setBatchData(result.data);
        setLoading(false);
      } else {
        toast.error(result.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      {loading ? (
        <BatchViewSkeleton />
      ) : (
        <Grid container spacing={3} sx={{ p: 1,background: 'linear-gradient(to bottom right, #EBF4FF, #FFFFFF, #FAF5FF)', minHeight: '100vh' }}>
          <Grid item xs={12} sm={12}>
            <HeaderCard batchData={batchData} theme={theme} />
          </Grid>

          <Grid item xs={12}>
            <ViewBatchTable students={batchData?.student} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ViewBatch;
