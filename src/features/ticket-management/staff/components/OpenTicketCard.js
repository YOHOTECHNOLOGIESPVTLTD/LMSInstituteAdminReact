import React from 'react';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Card, CardContent, Grid, Icon, IconButton } from '@mui/material';
import OptionsMenu from 'components/option-menu';
import CustomChip from 'components/mui/chip';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import FileOpenIcon from '@mui/icons-material/FileOpen';

const OpenTicketCard = ({ ticket, onClick, handleSelectedTicket }) => {
    return (
        <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ minHeight: 220 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={''} sx={{ mr: 2.5, height: 38, width: 38 }} />
                            <Box>
                                <Typography variant="h5">{ticket?.staff?.staff_name}</Typography>
                                <Typography variant="body4" sx={{ color: 'text.secondary', fontSize: 12 }}>
                                    {ticket?.staff?.email}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ fontSize: 12, color: 'primary.main' }}>{ticket?.ago}</Typography>
                        </Box>
                    </Box>
                    <Typography
                        sx={{
                            my: 4,
                            color: 'text.secondary',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            textOverflow: 'ellipsis'
                        }}
                    >
                        {ticket?.query}
                    </Typography>
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

                            <CustomChip
                                icon={<FileOpenIcon />}
                                rounded
                                size="small"
                                skin="light"
                                color={'warning'}
                                label={`${ticket?.status}`}
                                sx={{ ml: 2 }}
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
                                        // to: `/apps/invoice/edit/${row.id}`,
                                        text: 'Resolve',
                                        icon: <Icon icon="tabler:edit" />,
                                        menuItemProps: {
                                            onClick: () => {
                                                onClick();
                                                handleSelectedTicket(ticket);
                                            }
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

export default OpenTicketCard;
