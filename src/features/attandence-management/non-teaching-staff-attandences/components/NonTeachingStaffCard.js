import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from 'components/mui/avatar';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NonTeachingStaffCard = ({ nonTeachingStaffs }) => {
  
  return (
    <>
      <Grid container spacing={2} sx={{ display: 'flex', mt: 2 }}>
        {  nonTeachingStaffs?.map((item, i) => (
          <Grid key={i} item xs={12} sm={6} md={4}>
            <Card sx={{ position: 'relative', p: 1.5, boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }}>
              <CardContent sx={{ pt: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <Avatar src={item.img} sx={{ mb: 3, width: 100, height: 100 }} />
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    {item.fullname}
                  </Typography>
                  <Typography variant="h6">{item.email}</Typography>

                  <Box
                    sx={{
                      mt: 3,
                      mb: 3,
                      gap: 2,
                      width: '100%',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-around'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                      <Typography variant="h4">{item?.presentCount}</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>Present</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                      <Typography variant="h4">{item?.absentCount}</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>Absent</Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', mt: 1 }}
                  >
                    <Grid>
                      <Button
                        component={Link}
                        state={{ staff: item }}
                        to={`non-teaching-staff-attendances/${item.staff}`}
                        variant="tonal"
                        sx={{ px: 4 }}
                      >
                        View Attendance
                      </Button>
                    </Grid>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

NonTeachingStaffCard.propTypes = {
  nonTeachingStaffs: PropTypes.any
};

export default NonTeachingStaffCard;
