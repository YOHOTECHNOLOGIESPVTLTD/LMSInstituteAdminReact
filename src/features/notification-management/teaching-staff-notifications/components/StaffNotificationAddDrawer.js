// ** React Imports
import { useEffect, useState } from 'react';
// ** MUI Imports
import { Button, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import axios from 'axios';
// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
// ** Icon Imports
import { TextField } from '@mui/material';
import Icon from 'components/icon';
import CustomAutocomplete from 'components/mui/autocomplete';
import toast from 'react-hot-toast';

import { addStaffNotification } from '../services/staffNotificationServices';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  type: yup.string().required('Type is required'),
  staffs: yup.array().required('Students is required').min(1, 'Select at least one student'),
  title: yup.string().required('Title is required'),
  body: yup.string().required('Body is required')
});

const staffs = [
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 }
];

const defaultValues = {
  type: '',
  staffs: [],
  title: '',
  body: ''
};

const StaffNotificationAddDrawer = (props) => {
  // ** Props
  const { open, toggle } = props;
  // ** State

  const [inputValue, setInputValue] = useState('');
  const image = require('assets/images/avatar/1.png');
  const [imgSrc, setImgSrc] = useState(image);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    getAllGroups();
  }, []);

  const getAllGroups = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/user-management/role/get-all`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };

    await axios
      .request(config)
      .then((response) => {
        console.log('Groups : ', response.data);
        setGroups(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    var bodyFormData = new FormData();
    bodyFormData.append('image', selectedImage);
    bodyFormData.append('type', data.type);
    bodyFormData.append('staffs', data.staffs);
    bodyFormData.append('title', data.title);
    bodyFormData.append('body', data.body);
  
    console.log(bodyFormData);

    const result = await addStaffNotification(bodyFormData);

    if (result.success) {
      toast.success(result.message);
    } else {
      let errorMessage = '';
      Object.values(result.message).forEach((errors) => {
        errors.forEach((error) => {
          errorMessage += `${error}\n`; // Concatenate errors with newline
        });
      });
      toast.error(errorMessage.trim());
      // toast.error(result.message);
    }
  };


  const ImgStyled = styled('img')(({ theme }) => ({
    width: 100,
    height: 100,
    marginRight: theme.spacing(2),
    borderRadius: theme.shape.borderRadius
  }));

  const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center'
    }
  }));

  const handleInputImageChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result);
      setSelectedImage(files[0]);
      reader.readAsDataURL(files[0]);
      if (reader.result !== null) {
        setInputValue(reader.result);
      }
    }
  };

  const handleClose = () => {
    setValue('contact', Number(''));
    toggle();
    reset();
  };

  return (
    <Drawer
      open={open}
      anchor="right"
      variant="temporary"
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 700 } } }}
    >
      <Header>
        <Typography variant="h5">Add Notification</Typography>
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <ImgStyled src={imgSrc} alt="Profile Pic" />
            <div>
              <ButtonStyled component="label" variant="contained" htmlFor="account-settings-upload-image">
                Upload
                <input
                  hidden
                  type="file"
                  value={inputValue}
                  accept="image/png, image/jpeg"
                  onChange={handleInputImageChange}
                  id="account-settings-upload-image"
                />
              </ButtonStyled>
            </div>
          </Box>

          <Grid item xs={12} sm={12}>
            <Controller
              name="type"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  select
                  name="type"
                  fullWidth
                  value={value}
                  sx={{ mb: 4 }}
                  label="Select Type"
                  onChange={onChange}
                  SelectProps={{ value: value, onChange: onChange }}
                  error={Boolean(errors.type)}
                  {...(errors.type && { helperText: errors.type.message })}
                >
                  <MenuItem value={'Web Development'}>Web Development</MenuItem>
                  <MenuItem value={'Android Development'}>Android Development</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <CustomAutocomplete
              sx={{ mb: 2 }}
              multiple
              limitTags={2}
              options={staffs}
              id="autocomplete-limit-tags-students"
              getOptionLabel={(option) => (option && option.title) || ''}
              defaultValue={staffs.slice(0, 3)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="staffs"
                  placeholder="Favorites"
                  error={Boolean(errors.staffs)}
                  helperText={errors.staffs?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
          <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  select
                  name="title"
                  fullWidth
                  value={value}
                  sx={{ mb: 4 }}
                  label="Select Title"
                  onChange={onChange}
                  SelectProps={{ value: value, onChange: onChange }}
                  error={Boolean(errors.title)}
                  {...(errors.title && { helperText: errors.title.message })}
                >
                  <MenuItem value={'Web Development'}>Web Development</MenuItem>
                  <MenuItem value={'Android Development'}>Android Development</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
          <Controller
              name="body"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  select
                  name="body"
                  fullWidth
                  value={value}
                  sx={{ mb: 4 }}
                  label="Select Body"
                  onChange={onChange}
                  SelectProps={{ value: value, onChange: onChange }}
                  error={Boolean(errors.body)}
                  {...(errors.body && { helperText: errors.body.message })}
                >
                  <MenuItem value={'Web Development'}>Web Development</MenuItem>
                  <MenuItem value={'Android Development'}>Android Development</MenuItem>
                </TextField>
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
  );
};

export default StaffNotificationAddDrawer;
