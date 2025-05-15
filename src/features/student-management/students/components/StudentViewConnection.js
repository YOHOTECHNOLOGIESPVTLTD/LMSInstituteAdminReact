import MuiTimeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import OptionsMenu from 'components/option-menu';
import { getUserActivityLog } from 'features/user-management/users-page/services/userServices';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Timeline = styled(MuiTimeline)({
  '& .MuiTimelineItem-root:before': {
    display: 'none'
  }
});

const UserViewConnection = ({ id ,student}) => {
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    getUserLog(student?.uuid);
  }, [id]);
  
  const getUserLog = async (userId) => {
    try {
      const data = {
        id: userId
      };
      const result = await getUserActivityLog(data);
      if (result.success) {
        setActivityLog(result.data);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="User Activity Timeline"
            action={
              <OptionsMenu
                options={['Share timeline', 'Suggest edits', 'Report bug']}
                iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
              />
            }
          />
          <CardContent>
            <Timeline>
              {activityLog?.map((item, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color="warning" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ mb: (theme) => `${theme.spacing(3)} !important` }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography variant="h6" sx={{ mr: 2 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                        Today
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 3 }}>
                      {item.description}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

UserViewConnection.propTypes = {
  id: PropTypes.any
};

export default UserViewConnection;
