// ** React Imports
import { useState } from 'react';
// ** MUI Imports
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
// ** React Router Import
// import { Link } from 'react-router-dom';
// ** Custom Components Imports
import toast from 'react-hot-toast';
// import { resendNotification } from '../services/allNotificationServices';

import { resendStudentNotification } from 'features/notification-management/student-notifications/services/studentNotificationServices';

const AllNotificationBodySection = ({ allNotifications }) => {
  console.log(allNotifications);

  // ** State
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  const handleSubmit = async (id) => {
    try {
      const selectedNotification = allNotifications.find((notification) => notification.id === id);

      if (!selectedNotification) {
        throw new Error('Notification not found');
      }

      // const { title, body } = selectedNotification.institute_notifications;

      const data = {
        id: id,
        notification_id: selectedNotification.notification_id // Include the notification_id field
        // body: body,
        // branch_id: selectedBranchId,
        // title: title
      };

      const response = await resendStudentNotification(data);

      if (response.success) {
        // Handle success
        toast.success(response.message);
      } else {
        // Handle failure
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      // Handle error
      toast.error('Failed to resend notification');
    }
  };

  const RowOptions = ({ id }) => {
    return (
      <>
        <Button onClick={() => handleSubmit(id)} size="small" variant="outlined" color="secondary">
          Resend
        </Button>
      </>
    );
  };

  const columns = [
    {
      flex: 0.25,
      minWidth: 120,
      headerName: 'Id',
      field: 'student_id',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
            {row?.notification_id}
          </Typography>
        );
      }
    },

    {
      flex: 0.65,
      minWidth: 190,
      field: 'title',
      headerName: 'Title',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis'
                }}
              >
                {row?.title}
              </Typography>
              <Typography
                noWrap
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                  mt: 1,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis'
                }}
              >
                {row?.body}
              </Typography>
            </Box>
          </Box>
        );
      }
    },

    {
      flex: 0.15,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions id={row?.id} />
    }
  ];

  return (
    <Card>
      <Divider sx={{ m: '0 !important' }} />
      <DataGrid
        sx={{ p: 2 }}
        autoHeight
        rowHeight={62}
        rows={allNotifications}
        columns={columns}
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </Card>
  );
};

export default AllNotificationBodySection;
