import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import { Avatar, Box, Card, CardContent, Grid, Icon, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import CustomChip from 'components/mui/chip';
import OptionsMenu from 'components/option-menu';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { getImageUrl } from 'utils/imageUtils';
import { imagePlaceholder } from 'utils/placeholders';
import { keyframes } from '@mui/material';
import { formatDate, formatTime } from 'utils/formatDate';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const OpenTicketCard = ({ ticket, onClick, handleSelectedTicket }) => {
  const priorityColors = {
    Low: '#00FF00',
    Medium: '#FFFF00',
    High: '#FFA500',
    Urgent: '#FF0000'
  };

  const navigate = useNavigate()

  const handleResolveClick = () => {
    onClick();
    handleSelectedTicket(ticket);
    navigate(`/ticket-management/staff-ticket-view/${ticket.uuid}`);
  };

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card sx={{
        minHeight: 240,
        boxShadow: "0 .25rem .875rem 0 rgba(38,43,67,.16)",
        transition: 'transform 0.3s ease, background-color 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          cursor: "pointer"
        },
        animation: `${fadeInUp} 0.5s ease`,
      }}>
        <CardContent>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={ticket?.user?.image ? getImageUrl(ticket?.user?.image) : imagePlaceholder} sx={{ mr: 1.75, height: 38, width: 38 }} />
              <Box>
                <Typography variant="h5" sx={{ fontSize: "18px", fontWeight: 600 }}>{ticket?.user?.full_name}</Typography>
                <Typography variant="body4" sx={{ color: 'text.secondary', fontSize: 15, fontWeight: 500 }}>
                  {ticket?.user?.email}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: "space-between", mt: 1, py: 4, alignItems: "center" }}>
              <Typography
                sx={{
                  color: 'text.secondary',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis',
                  fontWeight: 500
                }}
              >
                {ticket?.query}
              </Typography>
              <Typography sx={{ fontSize: 14, color: 'primary.main' ,ml:2 }}>
                {formatDate(ticket?.createdAt)} - {formatTime(ticket?.createdAt)}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomChip
                icon={<CrisisAlertIcon />}
                rounded
                size="small"
                skin="light"
                sx={{
                  color: priorityColors[ticket?.priority],
                  backgroundColor: priorityColors[ticket?.priority] + '33',
                  borderColor: priorityColors[ticket?.priority]
                }}
                label={`Priority: ${ticket?.priority}`}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size="small" sx={{ color: 'text.disabled' }}>
                <Icon fontSize="1.25rem" icon="tabler:star" />
              </IconButton>
              <OptionsMenu
                iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
                options={[
                  {
                    text: 'Resolve',
                    icon: <Icon icon="tabler:edit" />,
                    menuItemProps: {
                      onClick: handleResolveClick,
                    }
                  }
                ]}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

OpenTicketCard.propTypes = {
  ticket: PropTypes.any,
  onClick: PropTypes.any,
  handleSelectedTicket: PropTypes.any
};

export default OpenTicketCard;
