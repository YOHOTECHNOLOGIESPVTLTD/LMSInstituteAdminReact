// ** React Imports
// ** MUI Imports
import { Button, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
// ** Icon Imports
import { TextField } from '@mui/material';
import Icon from 'components/icon';
import DatePickerWrapper from 'styles/libs/react-datepicker';
// import { addStudentFee } from '../services/studentFeeServices';
import Autocomplete from '@mui/material/Autocomplete';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  name: yup.string().required('Category Name is required'),
  description:yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),

});

const defaultValues = {
  name: '',
  description: '',
  category: '',

};


const FaqAddDrawer = (props) => {
  // ** Props
  const { open, toggle } = props;
  // ** State

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });



  const onSubmit = async (data) => {
    console.log(data);
    var bodyFormData = new FormData();

    bodyFormData.append('name', data.name);
    bodyFormData.append('description', data.description);
    bodyFormData.append('category', data.category);


  };

  const handleClose = () => {
    setValue('contact', Number(''));
    toggle();
    reset();
  };

  return (
    <DatePickerWrapper>
      <Drawer
        open={open}
        anchor="right"
        variant="temporary"
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 500 } } }}
      >
        <Header>
          <Typography variant="h5">Add Faq</Typography>
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{
              p: '0.438rem',
              borderRadius: 1,
              color: 'text.primary',
              backgroundColor: 'action.selected',
              '&:hover': {
                backgroundColor: (theme) => `rgba(${theme.palette.secondary.main}, 0.16)`
              }
            }}
          >
            <Icon icon="tabler:x" fontSize="1.125rem" />
          </IconButton>
        </Header>
        <Box sx={{ p: (theme) => theme.spacing(0, 6, 6) }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12} sm={12}>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    sx={{ mb: 2 }}
                    label="Title"
                    onChange={onChange}
                    error={Boolean(errors.name)}
                    {...(errors.name && { helperText: errors.name.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    sx={{ mb: 2 }}
                    label="description"
                    onChange={onChange}
                    error={Boolean(errors.description)}
                    {...(errors.description && { helperText: errors.description.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
            <Controller
              name="category"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  fullWidth
                  sx={{ mb: 2 }}
                  value={value}
                  onChange={(e, newValue) => {
                    onChange(newValue);
                  }}
                  options={['Web Development', 'Android Development']}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Category" error={Boolean(errors.category)} helperText={errors.category?.message} />
                  )}
                />
              )}
            />
          </Grid>

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
              <Button type="submit" variant="contained" sx={{ mr: 3 }}>
                Submit
              </Button>
              <Button variant="tonal" color="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Drawer>
    </DatePickerWrapper>
  );
};

export default FaqAddDrawer;