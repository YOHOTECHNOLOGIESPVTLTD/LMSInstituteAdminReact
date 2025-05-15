import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, TextField, Typography } from '@mui/material';
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
import { updateStudentCertificate } from '../services/studentCertificateServices';

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`;
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`;
  } else {
    return '';
  }
};

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  description: yup.string().required(),
  certificate_name: yup
    .string()
    .min(3, (obj) => showErrors('Title', obj.value.length, obj.min))
    .required()
});

const defaultValues = {
  description: '',
  certificate_name: ''
};

const StudentCertificateEdit = (props) => {
  // ** Props
  const { open, toggle, setStudentCertificateRefetch } = props;
  const savedPdfUrls = require('assets/pdf.pdf');
  const [selectedFile, setSelectedFile] = useState(null);
  const [savedPdfUrl, setSavedPdfUrl] = useState(savedPdfUrls);
  const [inputValue, setInputValue] = useState('');

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: props.initialValues || defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });


  useEffect(() => {
    if (open) {
      reset(props.initialValues || defaultValues);
    }
  }, [open, reset, props.initialValues]);

  const onSubmit = async (data) => {
    var bodyFormData = new FormData();
    bodyFormData.append('certificate_name', data.certificate_name);
    bodyFormData.append('description', data.description);
    bodyFormData.append('id', props.initialValues.id);
    bodyFormData.append('certificate_file', setSelectedFile);

     if (props.certificateid) {
      bodyFormData.append('certificateid', props.certificateid);
    }


   const result = await updateStudentCertificate(props.certificateid, bodyFormData);


    if (result.success) {
      toast.success(result.message);
      toggle();
      setStudentCertificateRefetch((state) => !state);
    } else {
      let errorMessage = '';
      toast.error(errorMessage.trim());
    }
  };

  const handleClose = () => {
    setValue('contact', Number(''));
    toggle();
    reset();
  };

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
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 500 } } }}
    >
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
          {/* <Grid item xs={12} sm={12} sx={{ mb: 4, display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            {!selectedFile && <PDFViewer url={savedPdfUrl} />}
            {selectedFile && <PDFViewer url={URL.createObjectURL(selectedFile)} />}
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
          </Grid> */}

          <Controller
            name="certificate_name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Title"
                onChange={onChange}
                placeholder="John Doe"
                error={Boolean(errors.certificate_name)}
                {...(errors.certificate_name && { helperText: errors.certificate_name.message })}
              />
            )}
          />

          {/* <Controller
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
          /> */}

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

StudentCertificateEdit.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.any,
  setStudentCertificateRefetch: PropTypes.any
};

export default StudentCertificateEdit;
