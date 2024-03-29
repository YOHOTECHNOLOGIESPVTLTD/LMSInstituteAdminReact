// ** React Imports
import { useEffect } from 'react';
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
import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { PDFViewer } from 'react-view-pdf';
import { updateCourseStudyMaterial } from '../services/studyMaterialServices';

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
  pdf_file: yup.mixed().required('PDF file is required')
});

const defaultValues = {
  description: '',
  title: ''
};

const StudyMaterialEdit = (props) => {
  // ** Props
  const { open, toggle, StudyMaterials } = props;
  console.log('StudyMaterialEdit - open:', props.open);
  console.log('StudyMaterialEdit - toggle:', props.toggle);
  // ** State
  // const [studymaterialPdf, setstudymaterialPdf] = useState('');

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  console.log('StudyMaterials :', StudyMaterials);

  useEffect(() => {
    if (StudyMaterials) {
      setValue('title', StudyMaterials?.title || '');
      setValue('description', StudyMaterials?.description || '');
      setValue('pdf_file', StudyMaterials?.studymaterialPdf || '');
    }
  }, [StudyMaterials, setValue]);

  const onSubmit = async (data) => {
    var bodyFormData = new FormData();
    bodyFormData.append('title', data.title);
    bodyFormData.append('description', data.description);
    bodyFormData.append('id', props.initialValues.id);
    bodyFormData.append('document', studymaterialPdf);
    console.log(bodyFormData);

    const result = await updateCourseStudyMaterial(bodyFormData);

    if (result.success) {
      toast.success(result.message);
    } else {
      let errorMessage = '';
      // Object.values(result.message).forEach((errors) => {
      //   errors.forEach((error) => {
      //     errorMessage += `${error}\n`; // Concatenate errors with newline
      //   });
      // });
      toast.error(errorMessage.trim());
      // toast.error(result.message);
    }
  };

  const handleClose = () => {
    setValue('contact', Number(''));
    toggle();
    reset();
  };

  // const handleSetPdf = (data) => {
  //   setstudymaterialPdf(data);
  //   setValue('pdf_file', data);
  // };

  const savedPdfUrls = require('assets/pdf.pdf');
  const [selectedFile, setSelectedFile] = useState(null);
  const [savedPdfUrl, setSavedPdfUrl] = useState(savedPdfUrls);
  const [inputValue, setInputValue] = useState('');

  const handleFileUpload = useCallback((file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => setSavedPdfUrl(reader.result);
      setSelectedFile(files[0]);
      reader.readAsDataURL(files[0]);
      if (reader.result !== null) {
        setInputValue(reader.result);
      }
    }
  }, []);

  console.log(setSelectedFile);
  // Styled components
  // const ImgStyled = useMemo(
  //   () =>
  //     styled('img')(({ theme }) => ({
  //       width: 100,
  //       height: 100,
  //       marginRight: theme.spacing(2),
  //       borderRadius: theme.shape.borderRadius
  //     })),
  //   []
  // );

  const ButtonStyled = useMemo(
    () =>
      styled(Button)(({ theme }) => ({
        [theme.breakpoints.down('sm')]: {
          width: '100%',
          textAlign: 'center'
        }
      })),
    []
  );
  return (
    <Drawer
      open={open}
      anchor="right"
      variant="temporary"
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: '80%', sm: 500 } } }}
    >
      <Grid container spacing={1}>
        <Grid item md={12} sm={12}>
          <Header>
            <Typography variant="h5">Edit Study Material</Typography>
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
              <Grid item xs={12} sm={12} sx={{ mb: 4, display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                {!selectedFile && <PDFViewer url={savedPdfUrl} />}
                {selectedFile && <PDFViewer url={URL.createObjectURL(selectedFile)} />}
                {/* {selectedFile && <ImgStyled src={URL.createObjectURL(selectedFile)} alt="Pdf" />} */}

                <ButtonStyled component="label" variant="contained" htmlFor="account-settings-upload-file" sx={{ mt: 2 }}>
                  Upload New File
                  <input
                    accept="application/pdf"
                    style={{ display: 'none' }}
                    id="account-settings-upload-file"
                    multiple={false}
                    type="file"
                    value={inputValue}
                    onChange={handleFileUpload}
                  />
                </ButtonStyled>
              </Grid>

              <Controller
                name="title"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    sx={{ mb: 4 }}
                    label="Title"
                    onChange={onChange}
                    placeholder="John Doe"
                    error={Boolean(errors.title)}
                    helperText={errors.title?.message}
                  />
                )}
              />

              <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    sx={{ mb: 4 }}
                    label="description"
                    onChange={onChange}
                    placeholder="Business Development Executive"
                    error={Boolean(errors.description)}
                    {...(errors.description && { helperText: errors.description.message })}
                  />
                )}
              />

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
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default StudyMaterialEdit;
