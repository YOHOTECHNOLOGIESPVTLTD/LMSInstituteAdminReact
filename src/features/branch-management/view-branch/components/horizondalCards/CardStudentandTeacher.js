import { Typography, Grid, Box, Card } from '@mui/material';
import styled from '@emotion/styled';
import CardContent from '@mui/material/CardContent';
import InstituteIcon from 'assets/images/icons/Lovepik_com-402395765-3d-stereo-technology-style-texture-earth-icon-free-model.png';

const CardStudentandTeacher = (props) => {
  const {branchData} = props
  const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.mode == 'light' ? theme.palette.secondary.light : theme.palette.secondary.light
  }));
  const CardWrapper = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.mode == 'light' ? theme.palette.dark.main : theme.palette.dark.main,
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      width: 184,
      height: 194,
      background: theme.palette.secondary[200],
      borderRadius: '50%',
      top: -107,
      right: -101,
      [theme.breakpoints.down('sm')]: {
        top: -105,
        right: -140
      }
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      width: 195,
      height: 223,
      background: theme.palette.primary.light,
      borderRadius: '50%',
      top: -154,
      right: -72,
      opacity: 0.2,
      [theme.breakpoints.down('sm')]: {
        top: -155,
        right: -70
      }
    }
  }));

  return (
    <CardWrapper sx={{ p: 0 }}>
      <CardContent sx={{ p: 2, py: 5 }}>
        <Grid container xs={12}>
          <Grid item xs={4}>
            <img src={InstituteIcon} height={100} alt="branch-img" />
          </Grid>
          <Grid item xs={8} sx={{ mt: 3.5 }}>
            <Box>
              <StyledTypography variant="h5" sx={{ mb: 1 }}>
                Welcome to
              </StyledTypography>
              <StyledTypography variant="h2">{branchData?.data?.branch_identity}</StyledTypography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </CardWrapper>
  );
};

export default CardStudentandTeacher;
