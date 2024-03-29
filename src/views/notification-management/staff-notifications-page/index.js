// ** React Imports
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import NotificationSkeleton from 'components/cards/Skeleton/NotificationSkeleton';

// ** Components Imports
import StaffNotificationBodySection from 'features/notification-management/teaching-staff-notifications/components/StaffNotificationBodySection';
import StaffNotificationHeaderSection from 'features/notification-management/teaching-staff-notifications/components/StaffNotificationHeaderSection';
import { useDispatch, useSelector } from 'react-redux';

import { getAllStaffNotifications } from 'features/notification-management/teaching-staff-notifications/redux/staffNotificationThunks';

import StaffNotificationAddDrawer from 'features/notification-management/teaching-staff-notifications/components/StaffNotificationAddDrawer';
import StaffNotificationTableHeader from 'features/notification-management/teaching-staff-notifications/components/StaffNotificationTableHeader';

import {
  selectLoading,
  selectStaffNotifications
} from 'features/notification-management/teaching-staff-notifications/redux/staffNotificationSelectors';

const StaffNotification = () => {
  const dispatch = useDispatch();
  const staffNotifications = useSelector(selectStaffNotifications);

  const staffLoading = useSelector(selectLoading);

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const [staffNotificationRefetch, setStaffNotificationRefetch] = useState(false);

  // Fetch course categories on component mount or when dependencies change
  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    dispatch(getAllStaffNotifications(data));
  }, [dispatch, selectedBranchId, staffNotificationRefetch]);

  console.log(staffNotifications);
  console.log(setStaffNotificationRefetch);

  const [addUserOpen, setAddUserOpen] = useState(false);

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StaffNotificationHeaderSection staffNotifications={staffNotifications} />
        </Grid>
        <Grid item xs={12}>
          <StaffNotificationTableHeader toggle={toggleAddUserDrawer} />
        </Grid>
        {staffLoading ? (
          <NotificationSkeleton />
        ) : (
          <Grid item xs={12}>
            <StaffNotificationBodySection
              staffNotifications={staffNotifications?.data}
              setStaffNotificationRefetch={setStaffNotificationRefetch}
              selectedBranchId={selectedBranchId}
            />
          </Grid>
        )}
        <StaffNotificationAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
      </Grid>
    </>
  );
};

export default StaffNotification;
