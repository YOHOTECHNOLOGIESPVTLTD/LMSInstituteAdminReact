import { TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { getAllUsers } from 'features/user-management/users-page/redux/userThunks';
import UserTableHeader from 'features/user-management/users-page/users-overview-page/components/UserTableHeader';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

const UserFilterCard = ({ selectedBranchId, groups, toggle, setUserRefetch }) => {
  const [role, setRole] = useState('');

  const [filterstatusValue, setFilterStatusValue] = useState('');

  const dispatch = useDispatch();
  const handleRoleChange = useCallback(
    async (e) => {
      try {
        setRole(e.target.value);
        const data = { role_id: e.target.value, branch_id: selectedBranchId };
        dispatch(getAllUsers(data));
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  const handleFilterByStatus = (e) => {
    setFilterStatusValue(e.target.value);
    const data = { status: e.target.value, branch_id: selectedBranchId };
    dispatch(getAllUsers(data));
  };

  return (
    <>
      <Card>
        <CardHeader title="Admin Users" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <TextField
                select
                fullWidth
                defaultValue="Select Role"
                SelectProps={{
                  value: role,
                  displayEmpty: true,
                  onChange: (e) => handleRoleChange(e)
                }}
              >
                <MenuItem value="">Select Role</MenuItem>
                {groups?.map((group, index) => (
                  <MenuItem key={index} value={group?.id}>
                    {group?.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                select
                fullWidth
                label="Status"
                defaultValue={''}
                SelectProps={{ value: filterstatusValue, onChange: (e) => handleFilterByStatus(e) }}
              >
                <MenuItem value="">Select Status</MenuItem>
                <MenuItem value="1">Active</MenuItem>
                <MenuItem value="0">Inactive</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <UserTableHeader setUserRefetch={setUserRefetch} toggle={toggle} selectedBranchId={selectedBranchId} />
        </CardContent>
      </Card>
    </>
  );
};

UserFilterCard.propTypes = {
  selectedBranchId: PropTypes.any,
  groups: PropTypes.any,
  toggle: PropTypes.any,
  setUserRefetch: PropTypes.any
};

export default UserFilterCard;
