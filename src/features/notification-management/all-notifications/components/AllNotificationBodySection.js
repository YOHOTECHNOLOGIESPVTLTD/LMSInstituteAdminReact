// ** React Imports
import { useCallback, useState } from 'react';
// ** MUI Imports
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
// ** React Router Import
import { Link } from 'react-router-dom';
// ** Custom Components Imports
import ImageIcon from '@mui/icons-material/Image';
import { setUsers } from 'features/user-management/users-page/redux/userSlices';
import { searchUsers } from 'features/user-management/users-page/services/userServices';
import { useDispatch, useSelector } from 'react-redux';
import { getInitials } from 'utils/get-initials';
import { useEffect } from 'react';
import AllNotificationAddDrawer from './AllNotificationAddDrawer';
import AllNotificationTableHeader from './AllNotificationTableHeader';

import { selectAllNotifications } from '../redux/allNotificationSelectors';
import { getAllNotifications } from '../redux/allNotificationThunks';

// ** renders client column
const renderClient = (row) => {
  if (row.avatar.length) {
    return <Avatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />;
  } else {
    return (
      <Avatar
        skin="light"
        color={row.avatarColor || 'primary'}
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: (theme) => theme.typography.body1.fontSize }}
      >
        {getInitials(row.name || 'John Doe')}
      </Avatar>
    );
  }
};

const RowOptions = ({ id }) => {
  return (
    <>
      <Link to={`${id}`} state={{ id: id }}>
        <Button size="small" variant="outlined" color="secondary">
          Resend
        </Button>
      </Link>
    </>
  );
};

const AllNotificationBodySection = () => {
  // ** State
  const [value, setValue] = useState('');
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [addUserOpen, setAddUserOpen] = useState(false);
  // ** Hooks
  const dispatch = useDispatch();
  const AllNotifications = useSelector(selectAllNotifications);

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  console.log(AllNotifications);
  useEffect(() => {
    dispatch(getAllNotifications(selectedBranchId));
  }, [dispatch, selectedBranchId]);

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);
  const handleFilter = useCallback(
    async (val) => {
      try {
        setValue(val);
        const result = await searchUsers(val);
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
      flex: 0.1,
      minWidth: 120,
      field: 'image',
      headerName: 'Image',
      renderCell: ({ row }) => {
        return (
          <Avatar sx={{ width: 38, height: 38 }}>
            {row?.profile_image ? (
              <img src={row.profile_image} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <ImageIcon />
            )}
          </Avatar>
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
                // component={Link}
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
                {row?.email}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      flex: 0.15,
      minWidth: 190,
      field: 'designation',
      headerName: 'Title',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row?.balance}
          </Typography>
        );
      }
    },
    {
      flex: 0.15,
      field: 'role',
      minWidth: 170,
      headerName: 'Description',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row?.total}
            </Typography>
          </Box>
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
      <Divider sx={{ m: '0 !important' }} />
      <AllNotificationTableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
      <DataGrid
        sx={{ p: 2 }}
        autoHeight
        rowHeight={62}
        rows={AllNotifications}
        columns={columns}
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
      <AllNotificationAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Card>
  );
};

export default AllNotificationBodySection;
