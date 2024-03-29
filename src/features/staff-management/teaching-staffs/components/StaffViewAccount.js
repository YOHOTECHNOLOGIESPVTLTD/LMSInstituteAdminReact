import { useState } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import CustomChip from 'components/mui/chip';
import Icon from 'components/icon';
import CardMedia from '@mui/material/CardMedia';

import { default as UserSubscriptionDialog, default as UserSuspendDialog } from './UserSubscriptionDialog';

const UserViewAccount = ({ staff, formattedDate }) => {
  // ** States
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  console.log('staffID:', staff?.teachingStaff?.id);
  console.log('teachingStaff:', staff?.teachingStaff);

  if (staff) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ pb: 4 }}>
              <Typography variant="body2" sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                Details
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Username:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{staff?.teachingStaff?.users?.username}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Email:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{staff?.teachingStaff?.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Role:</Typography>
                  <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{staff?.teachingStaff?.designation}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Gender:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{staff?.teachingStaff?.gender}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>DOB:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{formattedDate(`${staff?.teachingStaff?.dob}`)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Number:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>+91 {staff?.teachingStaff?.phone_number}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Alt Number:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>+91 {staff?.teachingStaff?.alternate_number}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Qualification:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{staff?.teachingStaff?.education_qualification}</Typography>
                </Box>
                <Box>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Address:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {staff?.teachingStaff?.address_line_1}, {staff?.teachingStaff?.address_line_2}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{staff?.teachingStaff?.city}</Typography>
                </Box>
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                component={Link}
                to={`teaching-staffs/${staff?.teachingStaff?.staff_id}/edit`}
                state={{ staff: staff?.teachingStaff, id: staff?.teachingStaff?.id }}
              >
                <Button variant="contained" sx={{ mr: 2, width: 100 }}>
                  Edit
                </Button>
              </Box>
              <Box>
                <Button color="error" variant="tonal" sx={{ mr: 2, width: 100 }} onClick={() => setSuspendDialogOpen(true)}>
                  Suspend
                </Button>
              </Box>
            </CardActions>

            <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
            <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {staff?.teachingStaff?.staff_course?.map((course, index) => (
              <Grid item spacing={2} key={index} xs={12} md={6}>
                <Card sx={{ mb: 2 }}>
                  <CardContent sx={{ pb: 0 }}>
                    <CardMedia
                      sx={{ position: 'relative', height: '12.5625rem', borderRadius: '5px', objectFit: 'contain' }}
                      image={
                        course?.courses?.logo
                          ? `${process.env.REACT_APP_PUBLIC_API_URL}/storage/${course?.courses?.logo}`
                          : 'https://i.pinimg.com/736x/7a/4b/a3/7a4ba30875e0de9567889866eb66bc4c.jpg'
                      }
                    >
                      <CustomChip
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          zIndex: 1,
                          '&.MuiChip-root.MuiChip-rounded': {
                            borderRadius: '0px 4px 0px 10px',
                            height: '2rem'
                          }
                        }}
                        label={course?.courses?.learning_format}
                        rounded
                        color="primary"
                        size="small"
                        variant="contained"
                      />
                    </CardMedia>
                  </CardContent>
                  <CardContent>
                    <Box>
                      <CustomChip
                        skin="light"
                        label={course?.courses?.course?.course_categories?.category_name}
                        rounded
                        color="secondary"
                        size="small"
                        variant="outlined"
                        sx={{ px: 0.5, py: 2 }}
                      />
                    </Box>
                    <Box sx={{ mr: 2, mt: 2, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h4">{course?.courses?.course_name}</Typography>
                      <Typography variant="body2" sx={{ fontSize: '13px', pt: 0.7, fontWeight: '400', opacity: 0.9 }}>
                        {course.courses?.course_overview}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        mt: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Grid
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          '& svg': { color: 'primary.main', mr: 0.5 }
                        }}
                      >
                        <Icon icon="tabler:augmented-reality" fontSize={20} />
                        <Typography sx={{ color: 'text.secondary' }}>
                          <span style={{fontWeight:'bold',fontSize:18,marginRight:2}}> {course?.courses?.course_module_count}</span>
                           Modules</Typography>
                      </Grid>
                      <Grid>
                        <Typography sx={{ color: 'text.secondary' }}>₹ {course?.courses?.course_price}</Typography>
                      </Grid>
                    </Box>
                  </CardContent>
                  <CardActions
                    className="demo-space-x"
                    sx={{ pt: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Box>
                      <CustomChip
                        skin="light"
                        sx={{ px: 2, py: 2.3 }}
                        label={course?.courses?.course?.is_active === 1 ? 'Active' : 'Inactive'}
                        rounded
                        color={course?.courses?.course?.is_active === 1 ? 'success' : 'error'}
                        size="medium"
                      />
                    </Box>
                    <Button component={Link} to="view " size="medium" variant="contained" color="primary">
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default UserViewAccount;
