import { Box, Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';

const TicketsCardsSkeleton = () => {
  return (
    <>
      <Grid container spacing={2}>
        {[...Array(3)].map((_, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card sx={{ minHeight: 220, mt: 4 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Skeleton variant="circular" sx={{ mr: 2.5, height: 42, width: 42 }} />
                    <Box>
                      <Typography variant="h5">
                        <Skeleton variant="text" width={100} />
                      </Typography>
                      <Typography variant="body4">
                        <Skeleton variant="text" width={150} />
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography>
                      <Skeleton variant="text" width={80} />
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography>
                    <Skeleton variant="text" width={260} />
                    <Skeleton variant="text" width={200} />
                  </Typography>
                </Box>
                <Box sx={{ mt: 2.75, display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Skeleton variant="rounded" sx={{ mr: 2.5, height: 30, width: 100 }} />
                    <Skeleton variant="rounded" sx={{ mr: 2.5, height: 30, width: 100 }} />
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

export default TicketsCardsSkeleton;
