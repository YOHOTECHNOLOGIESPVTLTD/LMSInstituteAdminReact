import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCourses } from '../../redux/courseThunks';

const CourseCardHeader = ({ selectedBranchId }) => {
  // State for search value
  const [searchValue, setSearchValue] = useState('');

  // Dispatch function
  const dispatch = useDispatch();

  // Callback function to handle search
  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllCourses({ search: searchInput, branch_id: selectedBranchId }));
      setSearchValue(searchInput);
    },
    [dispatch]
  );

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
          placeholder="Search Courses"
          onChange={(e) => handleSearch(e)}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: { xs: 3, sm: 0 }, textDecoration: 'none' }}>
          <Button
            sx={{ py: 1.5, borderRadius: '0.5rem' }}
            variant="contained"
            component={Link}
            to="courses/add"
            color="primary"
            startIcon={<Icon icon="tabler:plus" />}
          >
            Add New Course
          </Button>
        </Box>
      </Box>
    </>
  );
};

CourseCardHeader.propTypes = {
  selectedBranchId: PropTypes.any
};

export default CourseCardHeader;
