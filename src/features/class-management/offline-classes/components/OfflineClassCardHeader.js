import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllOfflineClasses } from '../redux/offlineClassThunks';
import OfflineClassAddModal from './add-OfflineClass/OfflineClassAddModal';

const OfflineClassCardHeader = (props) => {
  const { selectedBranchId, setRefetch } = props;
  const [searchValue, setSearchValue] = useState('');

  const dispatch = useDispatch();
  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllOfflineClasses({ search: searchInput, branch_id: selectedBranchId }));
      setSearchValue(searchInput);
    },
    [dispatch]
  );

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const handleAddClose = () => {
    setAddModalOpen(false);
  };
  const handleAdd = () => {
    setAddModalOpen(true);
  };
  return (
    <>
      <Box
        sx={{
          pb: 1,
          pt: 3,
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <TextField
          value={searchValue}
          sx={{
            width: 400
          }}
          placeholder="Search Class"
          onChange={(e) => handleSearch(e)}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: { xs: 3, sm: 0 } }}>
          <Button onClick={() => handleAdd()} variant="contained" color="primary" startIcon={<Icon icon="tabler:plus" />}>
            Add Offline Class
          </Button>
        </Box>
      </Box>
      <OfflineClassAddModal setRefetch={setRefetch} open={isAddModalOpen} handleAddClose={handleAddClose} />
    </>
  );
};

OfflineClassCardHeader.propTypes = {
  selectedBranchId: PropTypes.any,
  setRefetch: PropTypes.any
};

export default OfflineClassCardHeader;
