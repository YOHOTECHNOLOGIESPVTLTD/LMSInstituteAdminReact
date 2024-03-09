import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import CustomAvatar from 'components/mui/avatar';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import Icon from 'components/icon';
import { default as StatusChangeDialog, default as UserDeleteModel } from 'components/modal/DeleteModel';
import OptionsMenu from 'components/option-menu';
import { setUsers } from 'features/user-management/users-page/redux/userSlices';
import { getAllUsers } from 'features/user-management/users-page/redux/userThunks';
import { FilterUsersByRole, FilterUsersByStatus, updateUserStatus } from 'features/user-management/users-page/services/userServices';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { getInitials } from 'utils/get-initials';
// import { deleteCourseCategory } from '../../services/courseCategoryServices';
import { deleteUsers } from 'features/user-management/users-page/services/userServices';

const userStatusObj = {
  1: 'success',
  0: 'error'
};

const renderClient = (row) => {
  if (row?.profile_image) {
    return <CustomAvatar src={row?.profile_image} sx={{ mr: 2.5, width: 38, height: 38 }} />;
  } else {
    return (
      <CustomAvatar
        skin="light"
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: (theme) => theme.typography.body1.fontSize }}
      >
        {getInitials(row?.name ? row?.name : 'Mohammed Thasthakir')}
      </CustomAvatar>
    );
  }
};

const UserBodySection = ({ groups, users,  setUserRefetch }) => {
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });


  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState('');

  const [userDeleteModelOpen, setUserDeleteModelOpen] = useState(false);

  const [selectedUserDeleteId, setSelectedUserDeleteId] = useState(null);

  const dispatch = useDispatch();
 

  // const handleFilter = useCallback(
  //   async (val) => {
  //     try {
  //       setValue(val);
  //       const result = await searchUsers(val);
  //       if (result.success) {
  //         console.log('Search results:', result.data);
  //         dispatch(setUsers(result.data));
  //       } else {
  //         console.log(result.message);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  //   [dispatch]
  // );

  const handleRoleChange = useCallback(
    async (e) => {
      try {
        setRole(e.target.value);
        const result = await FilterUsersByRole(e.target.value);
        if (result.success) {
          console.log('Search results:', result.data);
          dispatch(setUsers(result.data));
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  const handleStatusChange = useCallback(
    async (e) => {
      if (e.target.value != '') {
        try {
          setStatus(e.target.value);
          const result = await FilterUsersByStatus(e.target.value);
          if (result.success) {
            console.log('Search results:', result.data);
            dispatch(setUsers(result.data));
          } else {
            console.log(result.message);
          }
        } catch (error) {
          console.log(error);
        }
      } else if (e.target.value == '') {
        dispatch(getAllUsers());
      }
    },
    [dispatch]
  );

  const handleStatusChangeApi = async () => {
    const data = {
      status: statusValue?.is_active === '1' ? '0' : '1',
      id: statusValue?.id
    };
    const response = await updateUserStatus(data);
    if (response.success) {
      toast.success(response.message);
      setUserRefetch((state) => !state);
    } else {
      toast.error(response.message);
    }
  };

  const handleStatusValue = (event, users) => {
    setStatusChangeDialogOpen(true);
    setStatusValue(users);
  };

  // Memoize the handleDelete function to prevent unnecessary re-renders
  const handleDelete = useCallback((itemId) => {
    setSelectedUserDeleteId(itemId);
    setUserDeleteModelOpen(true);
  }, []);

  // Handle branch deletion
  const handleUserDelete = async () => {
    const data = { id: selectedUserDeleteId };
    const result = await deleteUsers(data);
    if (result.success) {
      toast.success(result.message);
      setUserRefetch((state) => !state);
    } else {
      toast.error(result.message);
    }
  };

  const RowOptions = ({ id }) => {
    return (
      <OptionsMenu
        menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
        iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
        options={[
          {
            text: 'View',
            icon: <Icon icon="tabler:eye" fontSize={20} />,
            menuItemProps: {
              component: Link,
              to: `${id}`,
              state: { id: id }
            }
          },

          {
            text: 'Delete',
            icon: <Icon color="error" icon="mdi:delete-outline" fontSize={20} />,
            menuItemProps: {
              onClick: () => handleDelete(users?.id)
            }
          }
        ]}
      />
    );
  };

  const columns = [
    {
      flex: 0.1,
      minWidth: 120,
      headerName: 'Id',
      field: 'employee_id',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
            {row?.id}
          </Typography>
        );
      }
    },
    {
      flex: 0.25,
      minWidth: 280,
      field: 'fullName',
      headerName: 'User',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {row?.name}
              </Typography>
              <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
                {row?.institution_users?.email}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      flex: 0.15,
      minWidth: 190,
      field: 'mobile',
      headerName: 'Mobile',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row?.institution_users?.mobile}
          </Typography>
        );
      }
    },
    {
      flex: 0.15,
      field: 'role',
      minWidth: 170,
      headerName: 'Role',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row?.role_groups?.role?.name}
            </Typography>
          </Box>
        );
      }
    },
    {
      flex: 1.25,
      minWidth: 180,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <TextField
            size="small"
            select
            value={row?.is_active}
            label="status"
            id="custom-select"
            sx={{
              color: userStatusObj[row?.is_active]
            }}
            onChange={(e) => handleStatusValue(e, row)}
            SelectProps={{
              sx: {
                borderColor: row.is_active === '1' ? 'success' : 'error',
                color: userStatusObj[row?.is_active]
              }
            }}
          >
            <MenuItem value={1}>Active</MenuItem>
            <MenuItem value={0}>Inactive</MenuItem>
          </TextField>
        );
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions id={row?.id} />
    }
  ];
  return (
    <Card>
      <CardHeader title="Search Filters" />
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
                <MenuItem key={index} value={group?.role?.id}>
                  {group?.role?.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField
              select
              fullWidth
              defaultValue="Select Status"
              SelectProps={{
                value: status,
                displayEmpty: true,
                onChange: (e) => handleStatusChange(e)
              }}
            >
              <MenuItem value="">Select Status</MenuItem>
              <MenuItem value="1">Active</MenuItem>
              <MenuItem value="0">Inactive</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </CardContent>
      <Divider sx={{ m: '0 !important' }} />
    
      <DataGrid
        sx={{ p: 2 }}
        autoHeight
        rowHeight={62}
        rows={users}
        columns={columns}
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    
      {/* <GroupDeleteDialog open={deleteDialogOpen} setOpen={setDeleteDialogOpen} handleDeleteGroup={handleChangeStatus} /> */}

      <StatusChangeDialog
        open={statusChangeDialogOpen}
        setOpen={setStatusChangeDialogOpen}
        description="Are you sure you want to Change Status"
        title="Status"
        handleSubmit={handleStatusChangeApi}
      />

      <UserDeleteModel
        open={userDeleteModelOpen}
        setOpen={setUserDeleteModelOpen}
        description="Are you sure you want to delete this item?"
        title="Delete"
        handleSubmit={handleUserDelete}
      />
    </Card>
  );
};

UserBodySection.propTypes = {
  groups: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  setLoading: PropTypes.func.isRequired
};

export default UserBodySection;
