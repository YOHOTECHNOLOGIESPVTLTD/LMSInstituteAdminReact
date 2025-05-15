import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { getImageUrl } from 'utils/imageUtils';
import { profilePlaceholder } from 'utils/placeholders';

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 108,
  height: 108,
  borderRadius: theme.shape.borderRadius,
  border: `4px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}));

const UserViewLeft = ({ staff }) => {
 
  console.log(staff,"staff")
  return (
    <Card>
      <CardMedia
        component="img"
        alt="profile-header"
        image="https://th.bing.com/th/id/R.2609fa18d5091dc020ae92e8ffde827d?rik=EFdtfi8dYkunsA&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f05%2fBeautiful-Gradient-Wallpaper.jpg&ehk=wHC%2bBEdWF6fKy71W%2byG8l40bZoD6JV35mjLfEsDFAdQ%3d&risl=&pid=ImgRaw&r=0"
        sx={{
          height: { xs: 150, md: 250 }
        }}
      />
      <CardContent
        sx={{
          pt: 0,
          mt: -8,
          display: 'flex',
          alignItems: 'flex-end',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: { xs: 'center', md: 'flex-start' }
        }}
      >
        <ProfilePicture sx={{borderRadius:"50%",mb:5}} src={ staff?.image ? getImageUrl(staff?.image) : profilePlaceholder} alt="profile-picture" />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            ml: { xs: 0, md: 6 },
            alignItems: 'flex-end',
            flexWrap: ['wrap', 'nowrap'],
            justifyContent: ['center', 'space-between']
          }}
        >
          <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: ['center', 'flex-start'],
                alignItems: 'center'
              }}
            >
              <Typography variant="h3" sx={{ display: 'flex', alignItems: 'center',justifyContent:"start", textTransform : "capitalize" ,ml:-15,mt:8}}>
                {staff?.full_name}
              </Typography>
            </Box>
          </Box>
          <Button color={staff?.is_active? 'success' : 'error'} variant="contained" sx={{ '& svg': { mr: 2 } }}>
            <Icon icon="tabler:check" fontSize="1.125rem" />
            {staff?.teachingStaff?.is_active ? 'Active' : 'Inactive'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

UserViewLeft.propTypes = {
  staff: PropTypes.any
};

export default UserViewLeft;
