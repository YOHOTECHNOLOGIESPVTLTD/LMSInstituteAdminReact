import MuiTimeline from '@mui/lab/Timeline';
import { useState,useEffect } from 'react';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
// ** Icon Imports
import Icon from 'components/icon';
// ** Custom Components Imports
import OptionsMenu from 'components/option-menu';
import { getUserActivityLog } from 'features/user-management/users-page/services/userServices';
// Styled Timeline component
const Timeline = styled(MuiTimeline)({
  '& .MuiTimelineItem-root:before': {
    display: 'none'
  }
});

const UserViewConnection = ({id}) => {
  // console.log('hhh',id);
// const id=id
  const [activityLog, setActivityLog] = useState([]);
  
  useEffect(() => {
    getUserLog(id);
  }, [id]);

  const getUserLog = async ( userId) => {
    try {
      const data = {
        user_id: userId
      };
      const result = await getUserActivityLog(data);
      if (result.success) {
        console.log('ActivityLog:', result.data);
        setActivityLog(result.data);
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(activityLog);
  



  return (
    <Grid container spacing={6}>
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
              <TimelineItem>
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
                      Client Meeting
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                      Today
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 3 }}>
                    Project meeting with john @10:15am
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar alt="Avatar" src="/images/avatars/3.png" sx={{ width: 38, height: 38, mr: 3 }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                        Leona Watkins (Client)
                      </Typography>
                      <Typography variant="caption">CEO of Infibeam</Typography>
                    </Box>
                  </Box>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
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
                      Create a new project for client
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                      2 Days Ago
                    </Typography>
                  </Box>
                  <Typography variant="body2">Add files to new design folder</Typography>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="info" />
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
                      Shared 2 New Project Files
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                      6 Days Ago
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 3 }}>
                    Sent by Mollie Dixon
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                    <Box sx={{ mr: 3, display: 'flex', alignItems: 'center', color: 'warning.main' }}>
                      <Icon fontSize="1.25rem" icon="tabler:file-text" />
                      <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                        App Guidelines
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                      <Icon fontSize="1.25rem" icon="tabler:table" />
                      <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                        Testing Results
                      </Typography>
                    </Box>
                  </Box>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="secondary" />
                </TimelineSeparator>
                <TimelineContent>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography variant="h6" sx={{ mr: 2 }}>
                      Project status updated
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                      10 Days Ago
                    </Typography>
                  </Box>
                  <Typography variant="body2">WooCommerce iOS App Completed</Typography>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserViewConnection;
