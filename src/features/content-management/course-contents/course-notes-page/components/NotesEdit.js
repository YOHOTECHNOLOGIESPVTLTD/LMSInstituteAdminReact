import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, TextField, Typography,Chip } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { PDFViewer } from 'react-view-pdf';
import * as yup from 'yup';
import { updateCourseNote } from '../services/noteServices';
import { getImageUrl } from 'utils/imageUtils';

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

const NotesEdit = (props) => {
  // ** Props
  const { open, toggle, notes, setRefetch } = props;
  
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
    if (notes) {
      setValue('title', notes?.title || '');
      setValue('description', notes?.description || '');
      setValue('pdf_file', notes?.notesPdf || '');
    }
  }, [notes, setValue]);

  const onSubmit = async (data) => {
    const note_data = {
       title : data.title,
       description : data.description,
       uuid : notes.uuid,
       file : selectedFile ? data.pdf_file : notes.file
    }
  
    const result = await updateCourseNote(note_data);

    if (result.success) {
      toast.success(result.message);
      setRefetch((state) => !state);
      toggle();
    } else {
      toast.error(result?.message);
    }
  };

  const handleClose = () => {
    setValue('contact', Number(''));
    toggle();
    reset();
  };

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
          <Chip   label="Edit Notes " sx={{fontSize:'1.4rem', fontWeight:"bold" ,border:2,borderColor:"#0cce7b" ,}}/>
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
                {!selectedFile && <PDFViewer url={getImageUrl(notes?.file)} setValue={setValue} />}
                {selectedFile && <PDFViewer url={URL.createObjectURL(selectedFile)} setValue={setValue} />}

                <ButtonStyled component="label" variant="contained" htmlFor="account-settings-upload-file" sx={{ mt: 2 ,borderRadius: '50px'}}>
                <CloudUploadOutlinedIcon sx={{mr:1.5}}/>
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

NotesEdit.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.any,
  notes: PropTypes.any,
  setRefetch: PropTypes.any
};

export default NotesEdit;
