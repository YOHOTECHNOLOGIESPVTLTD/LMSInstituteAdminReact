import CloseIcon from '@mui/icons-material/Close';
import { Grid, IconButton, Typography, Chip } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CustomChip from 'components/mui/chip';
import PropTypes from 'prop-types';
import { PDFViewer } from 'react-view-pdf';

const ModuleView = ({ open, handleViewClose, modules }) => {
  const savedPdfUrl = require('assets/pdf.pdf');

  return (
    <div>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={open}
        onClose={handleViewClose}
        aria-labelledby="user-view-View"
        aria-describedby="user-view-View-description"
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2 }}>
          <IconButton onClick={handleViewClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <PDFViewer url={savedPdfUrl} />

        <DialogTitle
          id="user-view-View"
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(5)} !important`],
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 8
          }}
        >
          <Typography variant="h1" sx={{ color: 'primary' }}>
            {' '}
            ⭐{modules?.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CustomChip
              sx={{ ml: 1 }}
              rounded
              size="small"
              skin="light"
              // color="primary"
              color={modules?.is_active ? 'primary' : 'error'}
              label={modules?.is_active ? 'Active' : 'Inactive'}
            />
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(1)} !important`],
            pb: (theme) => `${theme.spacing(5)} !important`,
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
          }}
        >
          <Box fullWidth sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 3, p: 3 }}>
            <Grid container spacing={2}>
              <Grid item md={12} sm={12}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Typography variant="h3">Title :</Typography>
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {modules?.title}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 1 }}>
                  <Typography variant="h3">Course Name :</Typography>
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {modules?.course.course_name}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1 }}>
                  <Typography variant="h3">Description </Typography>
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    : {modules?.description}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

ModuleView.propTypes = {
  open: PropTypes.any,
  handleViewClose: PropTypes.any,
  modules: PropTypes.any
};

export default ModuleView;
