// ** React Imports
import { useEffect, useState } from 'react';
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
import Autocomplete from '@mui/material/Autocomplete';
import Icon from 'components/icon';
import { getAllActiveCourses } from 'features/course-management/courses-page/services/courseServices';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import CoursePdfInput from '../../components/PdfInput';
import { addCourseStudyMaterial } from '../services/studyMaterialServices';
import { getAllCourseStudyMaterials } from '../redux/studyMaterialThunks';
import { useDispatch } from 'react-redux';

const StudyMaterialAddDrawer = (props) => {
  // ** Props
  const { open, toggle, branches } = props;

  // ** State
  const [studymaterialPdf, setstudymaterialPdf] = useState('');
  const dispatch = useDispatch();

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  console.log(selectedBranchId);

  const [activeCourse, setActiveCourse] = useState([]);
  useEffect(() => {
    getActiveCoursesByBranch(selectedBranchId);
  }, [selectedBranchId]);

  const getActiveCoursesByBranch = async (selectedBranchId) => {
    const result = await getAllActiveCourses(selectedBranchId);

    console.log('active courses : ', result.data);
    setActiveCourse(result.data.data);
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
    title:yup
    .string()
    .required('Title is required')
    .matches(/^[a-zA-Z0-9\s]+$/, 'Title should not contain special characters'),
    branch: yup.object().required(),
    course: yup.object().required(),
    pdf_file: yup
    .mixed()
    .required('PDF file is required')
    // .test('fileSize', 'File size is too large', (value) => value && value[0].size <= 5000000),

  });

  const defaultValues = {
    description: '',
    title: '',
    branch: selectedBranchId,
    course: ''
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

  console.log(studymaterialPdf);

  const onSubmit = async (data) => {
    
    console.log(data);
    var bodyFormData = new FormData();
    bodyFormData.append('branch_id', data.branch?.branch_id);
    bodyFormData.append('course_id', data.course?.course_id);
    bodyFormData.append('title', data.title);
    bodyFormData.append('description', data.description);
    bodyFormData.append('document', studymaterialPdf);
    console.log(bodyFormData);

    const result = await addCourseStudyMaterial(bodyFormData);

    if (result.success) {
      toast.success(result.message);
      dispatch(getAllCourseStudyMaterials());
      reset();
      toggle();
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

  const handleSetPdf = (data) => {
    setstudymaterialPdf(data);
    setValue("pdf_file",data)
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
        <Typography variant="h5">Add Study Material</Typography>
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
          <Grid item xs={12} sm={12} sx={{ mb: 4 }}>
            <CoursePdfInput setCourseNotePdf={handleSetPdf}  className={`form-control ${errors.pdf_file ? 'is-invalid' : ''}`} />
            {errors.pdf_file && <p style={{ color: 'red', margin: '5px 0 0', fontSize: '0.875rem' }}>{errors.pdf_file.message}</p>}

          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name="branch"
              control={control}
              rules={{ required: true }}
              render={() => (
                <Autocomplete
                  fullWidth
                  // value={value}
                  onChange={(event, newValue) => {
                    setValue('branch', newValue);
                    getActiveCoursesByBranch(newValue);
                  }}
                  options={branches ?? []}
                  getOptionLabel={(option) => option.branch_name}
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
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  value={value}
                  onChange={(event, newValue) => {
                    onChange(newValue); // Update the value of the 'course' field
                  }}
                  options={activeCourse || []} // Ensure options are available
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
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  sx={{ mb: 2 }}
                  label="Title"
                  onChange={onChange}
                  placeholder="John Doe"
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
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  sx={{ mb: 2 }}
                  label="description"
                  onChange={onChange}
                  placeholder="Business Development Executive"
                  error={Boolean(errors.description)}
                  {...(errors.description && { helperText: errors.description.message })}
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

export default StudyMaterialAddDrawer;
