import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { getAllBatches } from 'features/batch-management/batches/services/batchServices';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { getAllOfflineClasses } from '../redux/offlineClassThunks';
import { useInstitute } from 'utils/get-institute-details';

const OfflineClassFilterCard = ({ selectedBranchId }) => {
  const [statusValue, setStatusValue] = useState('');
  const dispatch = useDispatch();
  const [selectedBatch, setSelectedBatch] = useState(null);
  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { status: e.target.value, branch_id: selectedBranchId };
    dispatch(getAllOfflineClasses(data));
  };

  const [batches, setBatches] = useState([]);
  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    getBatches(data);
  }, [selectedBranchId]);

  const getBatches = async (data) => {
    const result = await getAllBatches(data);
    if (result?.success) {
      setBatches(result?.data);
    }
  };

  const handleBatchChange = (e, newValue) => {
    if (!newValue) {
      setSelectedBatch(null);
      const data = {
        branch: selectedBranchId,
        batch_id: '',
        institute : useInstitute().getInstituteId()
      };
      dispatch(getAllOfflineClasses(data));
    } else {
      setSelectedBatch(newValue);
      const data = {
        batch: newValue._id,
        branch: selectedBranchId,
        institute : useInstitute().getInstituteId()
      };
      dispatch(getAllOfflineClasses(data));
    }
  };
  console.log(batches,"batches")
  return (
    <DatePickerWrapper>

      <Grid container spacing={2}>

        <Grid item xs={12}>

          <Card sx={{ boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }} >

            <CardHeader title="Filters" />

            <CardContent>

              <Grid container spacing={2}>

                <Grid item xs={12} sm={6}>
                  <TextField select fullWidth label="Status" SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}>
                    <MenuItem value="">Select Options</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    fullWidth
                    options={batches}
                    filterSelectedOptions
                    onChange={handleBatchChange}
                    value={selectedBatch}
                    id="autocomplete-multiple-outlined"
                    getOptionLabel={(option) => option.batch_name || ''}
                    renderInput={(params) => <TextField {...params} label=" Batches" placeholder="Favorites" />}
                  />
                </Grid>

              </Grid>

            </CardContent>

          </Card>

        </Grid>

      </Grid>
      
    </DatePickerWrapper>
  );
};

OfflineClassFilterCard.propTypes = {
  selectedBranchId: PropTypes.any
};

export default OfflineClassFilterCard;
