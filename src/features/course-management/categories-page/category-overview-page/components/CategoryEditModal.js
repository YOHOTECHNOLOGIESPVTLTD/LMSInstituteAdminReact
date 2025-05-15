import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { updateCourseCategory } from '../../services/courseCategoryServices';
import client from 'api/client';
import { getImageUrl } from 'utils/imageUtils';
import { imagePlaceholder } from 'utils/placeholders';
import { useSpinner } from 'context/spinnerContext';

// CategoryEditModal component
const CategoryEditModal = ({ open, handleEditClose, category, setCategoryRefetch }) => {

  // Function to handle error messages
  const showErrors = useCallback((field, valueLen, min) => {
    if (valueLen === 0) {
      return `${field} field is required`;
    } else if (valueLen > 0 && valueLen < min) {
      return `${field} must be at least ${min} characters`;
    } else {
      return '';
    }
  }, []);

  // Schema for form validation
  const schema = useMemo(
    () =>
      yup.object().shape({
        category_name: yup
          .string()
          .required('Category Name is required')
          .matches(/^[a-zA-Z0-9\s]+$/, 'Category Name should not contain special characters')
      }),
    [showErrors]
  );

  // Form control using react-hook-form
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const [inputValue, setInputValue] = useState('');
  const [imgSrc, setImgSrc] = useState(category?.image);
  const [selectedImage, setSelectedImage] = useState('');
  const { show, hide } = useSpinner()

  // Function to handle closing the dialog
  const handleClose = useCallback(() => {
    setValue('category_name', ''); // Reset input value
    handleEditClose(); // Close the dialog
    reset(); // Reset form
  }, [setValue, handleEditClose, reset]);

  // Function to handle image input change
  const handleInputImageChange = useCallback(async(file) => {
    show()
    const reader = new FileReader();
    const { files } = file.target;
    const image = files[0]
    if (image.size > 1048576) {
      hide()
      return toast.success("image upload lesser than 1mb")
    }
    const data = new FormData()
    data.append("file",files[0])
    const response = await client.file.upload(data)
    setSelectedImage(response?.data?.file)
    setImgSrc(response?.data.file)
    setValue("image",response?.data?.file)
    hide()
  }, []);

  // Styled components
  const ImgStyled = useMemo(
    () =>
      styled('img')(({ theme }) => ({
        width: 100,
        height: 100,
        marginRight: theme.spacing(2),
        borderRadius: theme.shape.borderRadius
      })),
    []
  );

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

  // Effect to set the default value for category_name field
  useEffect(() => {
    setValue('category_name', category?.category_name || '');
    setValue("image",category?.image) 
    // Set the default value for category_name
  }, [category?.category_name, setValue]);

  // Form submission handler
  const onSubmit = useCallback(
    async (data) => {
      
      const data1 ={
            category_name:data.category_name,
            image : category?.image?category.image:data.image,
            id:category.uuid
      }
      try {
        show()
        const result = await updateCourseCategory(data1);
        if (result.success) {
          setCategoryRefetch((state) => !state);
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.log(error);
      }finally{
        hide()
      }
    },
    [category, selectedImage, setCategoryRefetch]
  );

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="user-view-edit"
        aria-describedby="user-view-edit-description"
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 500,borderRadius: 2  } }}
      >
        <DialogTitle
          id="user-view-edit"
          sx={{
            ml:-7,mt:-3,
            fontSize: '1.5rem !important',
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(10)} !important`],
            pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          Edit Category Information
        </DialogTitle>
        <DialogContent
          sx={{
            pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(2)} !important`],
            pb: (theme) => `${theme.spacing(5)} !important`,
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                {!selectedImage && (
                  <ImgStyled
                    src={category?.image ? `${getImageUrl(category.image)}` : imagePlaceholder}
                    alt="Profile Pic"
                  />
                )}

                {selectedImage && <ImgStyled src={getImageUrl(imgSrc)} alt="Profile Pic" />}
              </Box>
                <div>
                  <ButtonStyled component="label" variant="contained" htmlFor="account-settings-upload-image" sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: 'grey.300', 
                  },py:0.8,ml:13,mb:3
                }}>
                    Upload New Image
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
              <Grid item xs={12} sm={12}>
                <Controller
                  name="category_name"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      value={value}
                      sx={{ mb: 4 }}
                      label="Category Name"
                      onChange={onChange}
                      placeholder="John Doe"
                      error={Boolean(errors.category_name)}
                      {...(errors.category_name && { helperText: errors.category_name.message })}
                    />
                  )}
                />
              </Grid>
              <Grid style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="error" onClick={handleClose} sx={{ mr: 3, backgroundColor: 'white',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: 'grey.300', } }}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" sx={{backgroundColor: 'black',
                  color: 'white','&:hover': {
                    backgroundColor: '#353636', }}} >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

CategoryEditModal.propTypes = {
  open: PropTypes.any,
  handleEditClose: PropTypes.any,
  setCategoryRefetch: PropTypes.any,
  category: PropTypes.any
};

export default CategoryEditModal;
