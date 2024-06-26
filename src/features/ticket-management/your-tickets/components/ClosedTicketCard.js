import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import { Avatar, Box, Card, CardContent, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import CustomChip from 'components/mui/chip';
import PropTypes from 'prop-types';

const ClosedTicketCard = ({ ticket }) => {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardContent>
          <Box sx={{}}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={ticket?.institute?.logo} sx={{ mr: 2.5, height: 38, width: 38 }} />
              <Box>
                <Typography variant="h5">{ticket?.institute?.name}</Typography>
                <Typography variant="body4" sx={{ color: 'text.secondary', fontSize: 12 }}>
                  {ticket?.institute?.email}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.75 }}>
              <Typography sx={{ fontSize: 12, color: 'primary.main' }}>Just now</Typography>
            </Box>
          </Box>
          <Typography
            sx={{
              my: 2,
              color: 'text.secondary',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis'
            }}
          >
            {ticket?.tickets?.solution}
          </Typography>
          <Typography sx={{ my: 2, color: 'text.secondary' }}>{ticket?.solution}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomChip
                icon={<CrisisAlertIcon />}
                rounded
                size="small"
                skin="light"
                color={'error'}
                label={`Priority:${ticket?.priority}`}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

ClosedTicketCard.propTypes = {
  ticket: PropTypes.any
};
export default ClosedTicketCard;
