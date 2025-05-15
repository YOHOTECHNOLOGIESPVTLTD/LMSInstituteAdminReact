import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import { getAllCourses } from 'features/course-management/courses-page/services/courseServices';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { addCourseModule } from '../services/moduleServices';
import { useSpinner } from 'context/spinnerContext';

const CourseModuleAddDrawer = (props) => {
  const { open, toggle, branches,setRefetch } = props;
  const [activeCourse, setActiveCourse] = useState([]);
  const { show, hide } = useSpinner()

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    getActiveCoursesByBranch(data);
  }, [selectedBranchId]);

  const getActiveCoursesByBranch = async (data) => {
    const result = await getAllCourses(data);

    if (result?.data) {
      setActiveCourse(result?.data);
    }
  };

  const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(6),
    justifyContent: 'space-between'
  }));

  const schema = yup.object().shape({
    description: yup
      .string()
      .required('Description is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Description should not contain special characters'),
    title: yup
      .string()
      .required('Title is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Title should not contain special characters'),
    branch: yup.object().required(),
    course: yup.object().required(),
    video_url: yup.string().required('Video URL is required')
  });

  const defaultValues = {
    description: '',
    title: '',
    branch: selectedBranchId,
    course: '',
    video_url: ''
  };

  // ** Hooks
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {

    const inputData = {
      branch: data.branch.uuid,
      course: data.course.uuid,
      title: data.title,
      description: data.description,
      video: data.video_url
    };
    try {
      show()
      const result = await addCourseModule(inputData);
        setRefetch((state) => !state);
        toast.success(result.message);
        reset();
        toggle();
    } catch (error) {
      toast.error(error?.message)
    }finally{
      hide()
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
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 500 } } }}
    >
      <Header>
        <Typography variant="h5">Add Module</Typography>
        {/* <Chip color='success'  label="Add Module " sx={{fontSize:'16px'}}/> */}

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
              name="branch"
              control={control}
              render={() => (
                <Autocomplete
                  fullWidth
                  onChange={(event, newValue) => {
                    setValue('branch', newValue);
                    getActiveCoursesByBranch(newValue);
                  }}
                  options={branches ?? []}
                  getOptionLabel={(option) => option.branch_identity}
                  renderInput={(params) => (
                    <TextField
                      sx={{ mb: 2 }}
                      {...params}
                      label="Branch"
                      error={Boolean(errors.branch)}
                      {...(errors.branch && { helperText: errors.branch.message })}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Controller
              name="course"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  value={value}
                  onChange={(event, newValue) => {
                    onChange(newValue);
                  }}
                  options={activeCourse || []}
                  getOptionLabel={(option) => option.course_name || ''}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Course"
                      sx={{ mb: 2 }}
                      error={Boolean(errors.course)}
                      helperText={errors.course?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Controller
              name="title"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  sx={{ mb: 2 }}
                  label="Title"
                  onChange={onChange}
                  placeholder="Hooks, animation, etc"
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Controller
              name="description"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  multiline
                  value={value}
                  sx={{ mb: 2 }}
                  rows={3}
                  label="Description"
                  onChange={onChange}
                  placeholder="Description about Modules"
                  error={Boolean(errors.description)}
                  {...(errors.description && { helperText: errors.description.message })}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Controller
              name="video_url"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  sx={{ mb: 2 }}
                  label="Video URL"
                  onChange={onChange}
                  placeholder="e.g., https://www.youtube.com/watch?v=example"
                  error={Boolean(errors.video_url)}
                  helperText={errors.video_url ? errors.video_url.message : ''}
                />
              )}
            />
          </Grid>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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

CourseModuleAddDrawer.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.any,
  branches: PropTypes.any
};

export default CourseModuleAddDrawer;
