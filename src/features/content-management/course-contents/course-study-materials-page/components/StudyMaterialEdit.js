import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, TextField, Chip } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { PDFViewer } from 'react-view-pdf';
import * as yup from 'yup';
import { updateCourseStudyMaterial } from '../services/studyMaterialServices';
import { getImageUrl } from 'utils/imageUtils';
import client from 'api/client';

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
  const { open, toggle, StudyMaterials, setRefetch } = props;
  
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

  useEffect(() => {
    if (StudyMaterials) {
      setValue('title', StudyMaterials?.title || '');
      setValue('description', StudyMaterials?.description || '');
      setValue('pdf_file', StudyMaterials?.studymaterialPdf || '');
    }
  }, [StudyMaterials, setValue]);

  const handleClose = () => {
    setValue('contact', Number(''));
    toggle();
    reset();
  };

  const savedPdfUrls = require('assets/pdf.pdf');
  const [selectedFile, setSelectedFile] = useState(null);
  const [savedPdfUrl, setSavedPdfUrl] = useState(savedPdfUrls);
  const [inputValue, setInputValue] = useState('');

  const handleFileUpload = useCallback(async(file) => {
    const reader = new FileReader();
    const { files } = file.target;
  
    
    if (files && files.length !== 0) {
      const uploadedFile = files[0];
      const mimeType = uploadedFile.type;

      // Check if the file is a PDF
      if (mimeType === 'application/pdf') {
        const formData = new FormData()
        formData.append("file",files[0])
        const data = files[0]
        if (data.size > 1048576) {
          return toast.success("pdf upload lesser than 1mb")
        }
        const file = await client.file.upload(formData)
        toast.success(file.message)
        setSelectedFile(file.data.file)
        // reader.onload = () => {
        //   setSavedPdfUrl(reader.result);
        //   setInputValue(uploadedFile);
        // };

        // reader.readAsDataURL(uploadedFile);
      } else {
        toast.error('Only PDF files are allowed');
      }
    }
  }, []);

  const onSubmit = async (data) => {
    const Update_data = {
      title : data.title,
      description : data.description,
      uuid : props.initialValues.uuid,
      file : selectedFile ? selectedFile : props.initialValues.file
    }
     
    const result = await updateCourseStudyMaterial(Update_data);
   
    if (result.success) {
      setRefetch((state) => !state);
      toast.success(result.message);
      toggle();
    } else {
      let errorMessage = '';

      toast.error(errorMessage.trim());
    }
  };

  const ButtonStyled = useMemo(
    () =>
      styled(Button)(({ theme }) => ({
        [theme.breakpoints.down('sm')]: {
          width: '100%',
          textAlign: 'center',
          
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
          <Chip   label="Edit Study Material " sx={{fontSize:'20px',border:2,borderColor:"#0cce7b" ,}}/>
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
                {!selectedFile && <PDFViewer url={StudyMaterials?.file?getImageUrl(StudyMaterials.file):savedPdfUrl} />}
                {selectedFile && <PDFViewer url={getImageUrl(selectedFile)} />}

                <ButtonStyled component="label" variant="contained" htmlFor="account-settings-upload-file" sx={{ mt: 2 ,borderRadius: '50px' }}>
                  <CloudUploadOutlinedIcon sx={{mr:1.5}}/>
                  Upload New File
                  <input
                    accept="application/pdf"
                    style={{ display: 'none',  }}
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

StudyMaterialEdit.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.any,
  StudyMaterials: PropTypes.any,
  setRefetch: PropTypes.any
};

export default StudyMaterialEdit;
