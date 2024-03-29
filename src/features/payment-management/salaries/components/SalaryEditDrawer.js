// ** React Imports
import { useEffect, useState } from 'react';
// ** MUI Imports
import { Button, Grid, Typography , Avatar} from '@mui/material';
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
import toast from 'react-hot-toast';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { updateTeachingStaffSalary } from '../teaching-staffs/services/teachingStaffSalariesServices';
import { useCallback } from 'react';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  transaction_id: yup.number().typeError('Transaction id must be a number').required('Transaction id is required'),
  salary_amount: yup.number().typeError('Paid Amount must be a number').required('Paid Amount is required')
});

const SalaryEditDrawer = (props) => {
  const { open, toggle, selectedRows, setRefetch } = props;
  const image =
  'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg';
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [imgSrc, setImgSrc] = useState(image);
  console.log(selectedRows);

  const defaultValues = {
    transaction_id: '',
    salary_amount: '',
    selectedImage: ''
  };

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

  // Set form values when selectedBranch changes
  useEffect(() => {
    if (selectedRows) {
      setValue('image',selectedRows?.selectedImage || '');
      setValue('transaction_id', selectedRows?.transaction_id || '');
      setValue('salary_amount', selectedRows?.salary_amount || '');
    }
  }, [selectedRows, setValue]);

  const onSubmit = useCallback(async (data) => {
    const inputData = new FormData();
    inputData.append('image', selectedImage);
    inputData.append('transaction_id', data.transaction_id);
    inputData.append('salary_amount', data.salary_amount);
    inputData.append('id', selectedRows.id);

    const result = await updateTeachingStaffSalary(inputData);
    console.log(data);
    if (result.success) {
      toast.success(result.message);
      setRefetch((state) => !state);
      handleEditClose();
    } else {
      toast.error(result.message);
    }
  });

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
    console.log(setImgSrc);
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
    <DatePickerWrapper>
      <Drawer
        open={open}
        anchor="right"
        variant="temporary"
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 700 } } }}
      >
        <Header>
          <Typography variant="h5">Add Fees</Typography>
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${selectedRows?.staff?.image}`}
                  sx={{ mr: 2.5, height: 42, width: 42 }}
                />
                <Box>
                  <Typography variant="h5" sx={{ fontSize: '18px' }}>
                    {selectedRows?.staff?.staff_name}
                  </Typography>
                  <Typography variant="body4" sx={{ color: 'text.secondary', fontSize: '14px' }}>
                    {selectedRows?.staff?.email}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontSize: 12, color: 'primary.main' }}>{selectedRows?.ago}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
              {!selectedImage && (
                <ImgStyled
                  src={
                    selectedRows?.payment_proof ? `${process.env.REACT_APP_PUBLIC_API_URL}/storage/${selectedRows?.payment_proof}` : imgSrc
                  }
                  alt="Profile Pic"
                />
              )}

              {selectedImage && <ImgStyled src={imgSrc} alt="Profile Pic" />}
              <div>
                <ButtonStyled component="label" variant="contained" htmlFor="account-settings-upload-payment">
                  Upload New Image
                  <input
                    hidden
                    type="file"
                    value={inputValue}
                    accept="image/png, image/jpeg"
                    onChange={handleInputImageChange}
                    id="account-settings-upload-payment"
                  />
                </ButtonStyled>
              </div>
            </Box>

            <Grid item xs={12} sm={12}>
              <Controller
                name="transaction_id"
                rules={{ required: true }}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    // defaultValue={selectedRows? selectedRows?.total :5556}
                    value={value}
                    sx={{ mb: 2 }}
                    fullWidth
                    // value={value}
                    onChange={onChange}
                    // label={selectedRows?.total}
                    label="transaction Id"
                    type="number"
                    error={Boolean(errors.transaction_id)}
                    helperText={errors.transaction_id?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="salary_amount"
                rules={{ required: true }}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    sx={{ mb: 2 }}
                    fullWidth
                    value={value}
                    onChange={onChange}
                    label="Salary Amount"
                    type="number"
                    error={Boolean(errors.salary_amount)}
                    helperText={errors.salary_amount?.message}
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

export default SalaryEditDrawer;
