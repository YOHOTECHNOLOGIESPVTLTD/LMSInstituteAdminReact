import { CardContent, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import Icon from 'components/icon';
import { default as StatusChangeDialog, default as UserDeleteModel } from 'components/modal/DeleteModel';
import CustomAvatar from 'components/mui/avatar';
import OptionsMenu from 'components/option-menu';
import { deleteUsers, updateUserStatus } from 'features/user-management/users-page/services/userServices';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { getInitials } from 'utils/get-initials';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import { getAllUsers } from '../../redux/userThunks';
import { useDispatch } from 'react-redux';

const userStatusObj = {
  1: 'success',
  0: 'error'
};

const renderClient = (row) => {
  if (row?.institution_users?.image) {
    return (
      <CustomAvatar
        src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${row?.institution_users?.image}`}
        sx={{ mr: 2.5, width: 38, height: 38 }}
      />
    );
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

const UserBodySection = ({ users, setUserRefetch, selectedBranchId }) => {
  // const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState('');

  const [userDeleteModelOpen, setUserDeleteModelOpen] = useState(false);

  const [selectedUserDeleteId, setSelectedUserDeleteId] = useState(null);

  const dispatch = useDispatch();

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
    const result = await deleteUsers(selectedUserDeleteId);
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
              to: `admin-users/${id}`,
              state: { id: id }
            }
          },

          {
            text: 'Delete',
            icon: <Icon color="error" icon="mdi:delete-outline" fontSize={20} />,
            menuItemProps: {
              onClick: () => handleDelete(id)
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
      headerName: 'ADMIN USER',
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
      flex: 1.0,
      minWidth: 150,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions id={row?.id} />
    }
  ];
  return (
    <Box>
      <Grid>
        <Card>
          <Divider sx={{ m: '0 !important' }} />

          <DataGrid
            sx={{ p: 2 }}
            autoHeight
            rowHeight={70}
            rows={users?.data ? users?.data : []}
            columns={columns}
            disableRowSelectionOnClick
            hideFooterPagination
            hideFooter
          />

          <StatusChangeDialog
            open={statusChangeDialogOpen}
            setOpen={setStatusChangeDialogOpen}
            description="Are you sure you want to Change Status"
            title="Change Status"
            handleSubmit={handleStatusChangeApi}
          />

          <UserDeleteModel
            open={userDeleteModelOpen}
            setOpen={setUserDeleteModelOpen}
            description="Are you sure you want to delete this user?"
            title="Delete"
            handleSubmit={handleUserDelete}
          />
          {users?.last_page !== 1 && (
            <CardContent>
              <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination
                  count={users?.last_page}
                  color="primary"
                  onChange={(e, page) => {
                    const data = {
                      branch_id: selectedBranchId,
                      page: page
                    };
                    dispatch(getAllUsers(data));
                  }}
                />
              </Grid>
            </CardContent>
          )}
        </Card>
      </Grid>
    </Box>
  );
};

UserBodySection.propTypes = {
  setUserRefetch: PropTypes.func,
  users: PropTypes.array.isRequired,
  selectedBranchId: PropTypes.string
};

export default UserBodySection;
