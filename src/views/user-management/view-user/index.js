// ** React Imports
import { useState, useEffect } from 'react';

// ** React Router Imports
import { useLocation } from 'react-router-dom';

// ** MUI Imports
import Grid from '@mui/material/Grid';

// ** Demo Components Imports
import UserViewLeft from 'features/user-management/user-view/components/UserViewLeft';
import UserViewRight from 'features/user-management/user-view/components/UserViewRight';

const UserView = () => {
  const location = useLocation();

  useEffect(() => {
    setUserId(location.state.id);
  }, [location]);

  const [userId, setUserId] = useState(location?.state?.id);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={5} lg={4}>
        <UserViewLeft id={userId} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <UserViewRight id={userId} />
      </Grid>
    </Grid>
  );
};

export default UserView;