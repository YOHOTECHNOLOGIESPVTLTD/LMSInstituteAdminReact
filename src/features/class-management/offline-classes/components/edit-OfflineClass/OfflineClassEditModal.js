import { yupResolver } from '@hookform/resolvers/yup';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Checkbox, Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import CustomChip from 'components/mui/chip';
import dayjs from 'dayjs';
import { getAllActiveNonTeachingStaffs,getAllNonTeachingStaffs } from 'features/staff-management/non-teaching-staffs/services/nonTeachingStaffServices';
import { getAllActiveTeachingStaffs } from 'features/staff-management/teaching-staffs/services/teachingStaffServices';
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import * as yup from 'yup';
import { updateOfflineClass } from '../../services/offlineClassServices';
import { useSpinner } from 'context/spinnerContext';

const CustomInput = forwardRef(({ ...props }, ref) => {
  const { label, readOnly } = props;

  return <TextField {...props} fullWidth inputRef={ref} label={label || ''} {...(readOnly && { inputProps: { readOnly: true } })} />;
});

const OfflineClassEditModal = ({ open, handleEditClose, offlineClasses, setRefetch }) => {
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const schema = yup.object().shape({
    class_name: yup
      .string()
      .min(3, (obj) => showErrors('Class', obj.value.length, obj.min))
      .matches(/^[a-zA-Z0-9\s]+$/, 'Class Name should not contain special characters')
      .required('Class Name field is required'),
    classDate: yup.date().nullable().required('Class Date field is required'),
    instructors: yup.array().min(1, 'At least one instructor must be selected').required('Instructor field is required'),
    coordinators: yup.array().min(1, 'At least one coordinator must be selected').required('coordinator field is required')
  });

  const defaultValues = {
    class_name: '',
    classDate: new Date(),
    start_time: null,
    end_time: null,
    instructors: [],
    coordinators: []
  };

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
  const {show,hide} = useSpinner()
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState([]);

  const showErrors = (field, valueLen, min) => {
    if (valueLen === 0) {
      return `${field} field is required`;
    } else if (valueLen > 0 && valueLen < min) {
      return `${field} must be at least ${min} characters`;
    } else {
      return '';
    }
  };

  useEffect(() => {
    if (offlineClasses) {
      show()
      setSelectedCoordinates(offlineClasses?.coordinators);
      setSelectedInstructors(offlineClasses?.instructors);
      setValue('class_name', offlineClasses.class_name || '');
      setValue('class_id', offlineClasses.class_id || '');
      setValue('classDate', new Date(offlineClasses.start_date) || new Date());
      setValue('start_time', dayjs(offlineClasses.start_time) || null);
      setValue('end_time', dayjs(offlineClasses.end_time) || null);
      setValue('instructors', offlineClasses.instructors || []);
      setValue('coordinators', offlineClasses?.coordinators || []);
      hide()
    }
  }, [offlineClasses, setValue]);

  useEffect(() => {
    if (offlineClasses && offlineClasses.instructors) {
      setSelectedInstructors(offlineClasses.instructors);
      setValue('instructors', offlineClasses.instructors);
    }
  }, [offlineClasses, setValue]);

  useEffect(() => {
    if (offlineClasses && offlineClasses.coordinators) {
      setSelectedCoordinates(offlineClasses.coordinators);
      setValue('coordinators', offlineClasses.coordinators);
    }
  }, [offlineClasses, setValue]);

  const handleClose = () => {
    handleEditClose();
    // reset(defaultValues);
  };
  const [activeNonTeachingStaff, setActiveNonTeachingStaff] = useState([]);
  const [activeTeachingStaff, setActiveTeachingStaff] = useState([]);

  const getActiveTeachingStaffs = async (selectedBranchId) => {
    const data = { type: 'teaching', branch_id: selectedBranchId };
    const result = await getAllActiveTeachingStaffs(data);
    setActiveTeachingStaff(result.data);
  };
  const getActiveNonTeachingStaffs = async (selectedBranchId) => {
    const data = { type: 'non_teaching', branch_id: selectedBranchId };
    const result = await getAllNonTeachingStaffs(data);
    setActiveNonTeachingStaff(result.data);
  };

  useEffect(() => {
    show()
    getActiveTeachingStaffs(selectedBranchId);
    getActiveNonTeachingStaffs(selectedBranchId);
    hide()
  }, [selectedBranchId]);

  function convertDateFormat(input) {
    var originalDate = new Date(input);
    var year = originalDate.getFullYear();
    var month = ('0' + (originalDate.getMonth() + 1)).slice(-2);
    var day = ('0' + originalDate.getDate()).slice(-2);
    var formattedDateString = year + '-' + month + '-' + day;
    return formattedDateString;
  }

  const onSubmit = async (data) => {
    show()
    const filteredInstructorId = data?.instructors?.map((staff) => staff._id);
    const filteredCoordinatorId = data?.coordinators?.map((staff) => staff._id);

    const offline_class_data = {
      class_name : data.class_name,
      uuid : offlineClasses?.uuid,
      start_date : data?.classDate,
      start_time : data?.start_time,
      end_time : data?.end_time,
      coordinators : filteredCoordinatorId,
      instructors : filteredInstructorId
    }
   
    const result = await updateOfflineClass(offline_class_data);

    if (result.success) {
      setRefetch((state) => !state);
      toast.success(result.message);
      handleClose();
      hide()
    } else {
      let errorMessage = '';
      toast.error(result?.message);
      hide()
    }
  };

  
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="user-view-edit"
      aria-describedby="user-view-edit-description"
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800,
        background: 'linear-gradient(to bottom right, #f0e7ff, #e0f2ff)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          borderRadius: 2,
       },
     }}
    >
      <DialogTitle
        id="user-view-edit"
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem !important',
          px: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(3)} !important`],
          pt: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(4)} !important`],
          background: 'linear-gradient(to right, #6b46c1, #5a67d8)',
          color: 'white',
          fontWeight: 'bold',
          padding: '1rem',
          mb:2
        }}
      >
        Edit Offline Class
      </DialogTitle>

      <DialogContent
        sx={{
          pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(2)} !important`],
          pb: (theme) => `${theme.spacing(2)} !important`,
          px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
        }}
      >
        <DatePickerWrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Controller
                  name="class_name"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      value={value}
                      label="Class Name"
                      onChange={onChange}
                      placeholder="John Doe"
                      error={Boolean(errors.class_name)}
                      {...(errors.class_name && { helperText: errors.class_name.message })}
                      sx={{
                        backgroundColor: 'transparent',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: 'white',
                          '& fieldset': {
                            borderColor: 'rgba(156, 163, 175, 1)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(156, 163, 175, 1)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'rgba(96, 165, 250, 1)',
                            boxShadow: '0 0 0 3px rgba(229, 231, 235, 0.5)',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'black',
                          '&.Mui-focused': {
                            color: 'black',
                          },
                        },
                        '& .MuiFormHelperText-root': {
                          backgroundColor: 'transparent',
                          color: 'red',

                          borderRadius: '4px',
                          marginTop: '4px',
                        },

                      }}
                    />
                  )}
                    />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name="classDate"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      selected={value}
                      id="basic-input"
                      className="full-width-datepicker"
                      onChange={onChange}
                      placeholderText="Click to select a date"
                      customInput={<CustomInput label="ClassDate"
                        sx={{
                          backgroundColor: 'transparent',
                          borderRadius: '8px',
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            backgroundColor: 'white',
                            '& fieldset': {
                              borderColor: 'rgba(156, 163, 175, 1)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(156, 163, 175, 1)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'rgba(96, 165, 250, 1)',
                              boxShadow: '0 0 0 3px rgba(229, 231, 235, 0.5)',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'black',
                            '&.Mui-focused': {
                              color: 'black',
                            },
                          },
                          '& .MuiFormHelperText-root': {
                            backgroundColor: 'transparent',
                            color: 'red',

                            borderRadius: '4px',
                            marginTop: '4px',
                          },

                        }}
                      />}
                    />
                  )}
                />
                {errors.classDate && <p style={{ color: 'red', margin: '5px 0 0', fontSize: '0.875rem' }}>{errors.classDate.message}</p>}
              </Grid>

              <Grid container item xs={6} spacing={2}>
                <Grid item md={6} sm={12}>
                  <Controller
                    name="start_time"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          customInput={
                            <CustomInput
                              label="Start Time"
                              sx={{ border: errors.start_time ? '1px solid red' : 'none', borderRadius: '7px' }}
                            />
                          }
                          value={value}
                          onChange={onChange}
                          label="Start Time"
                          sx={{
                            backgroundColor: 'transparent',
                            borderRadius: '8px',
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                              backgroundColor: 'white',
                              '& fieldset': {
                                borderColor: 'rgba(156, 163, 175, 1)',
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(156, 163, 175, 1)',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'rgba(96, 165, 250, 1)',
                                boxShadow: '0 0 0 3px rgba(229, 231, 235, 0.5)',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'black',
                              '&.Mui-focused': {
                                color: 'black',
                              },
                            },
                            '& .MuiFormHelperText-root': {
                              backgroundColor: 'transparent',
                              color: 'red',

                              borderRadius: '4px',
                              marginTop: '4px',
                            },

                          }}
                        />
                      </LocalizationProvider>
                    )}
                  />
                  {errors.start_time && (
                    <p style={{ color: '#EA5455', marginTop: '5px', marginLeft: '5px', fontSize: '12px' }}>{errors.start_time.message}</p>
                  )}
                </Grid>

                <Grid item md={6} sm={12}>
                  <Controller
                    name="end_time"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          customInput={
                            <CustomInput
                              label="End Time"
                              sx={{ border: errors.end_time ? '1px solid red' : 'none', borderRadius: '7px' }}
                            />
                          }
                          value={value}
                          onChange={onChange}
                          label="End Time"
                          sx={{
                            backgroundColor: 'transparent',
                            borderRadius: '8px',
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                              backgroundColor: 'white',
                              '& fieldset': {
                                borderColor: 'rgba(156, 163, 175, 1)',
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(156, 163, 175, 1)',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'rgba(96, 165, 250, 1)',
                                boxShadow: '0 0 0 3px rgba(229, 231, 235, 0.5)',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'black',
                              '&.Mui-focused': {
                                color: 'black',
                              },
                            },
                            '& .MuiFormHelperText-root': {
                              backgroundColor: 'transparent',
                              color: 'red',

                              borderRadius: '4px',
                              marginTop: '4px',
                            },

                          }}
                        />
                      </LocalizationProvider>
                    )}
                  />
                  {errors.end_time && (
                    <p style={{ color: '#EA5455', marginTop: '5px', marginLeft: '5px', fontSize: '12px' }}>{errors.end_time.message}</p>
                  )}
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  id="select-multiple-chip"
                  options={[{ _id: 'selectAll', full_name: 'Select All' }, ...activeTeachingStaff]}
                  getOptionLabel={(option) => option.full_name}
                  value={selectedInstructors||[]}
                  onChange={(e, newValue) => {
                    if (newValue && newValue.some((option) => option._id === 'selectAll')) {
                      setSelectedInstructors(activeTeachingStaff.filter((option) => option._id !== 'selectAll'));
                      setValue(
                        'instructors',
                        activeTeachingStaff.filter((option) => option._id !== 'selectAll')
                      );
                    } else {
                      setSelectedInstructors(newValue);
                      setValue('instructors', newValue);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Instructors"
                      InputProps={{
                        ...params.InputProps,
                        style: { overflowX: 'auto', maxHeight: 55, overflowY: 'hidden' }
                      }}
                      sx={{
                        backgroundColor: 'transparent',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: 'white',
                          '& fieldset': {
                            borderColor: 'rgba(156, 163, 175, 1)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(156, 163, 175, 1)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'rgba(96, 165, 250, 1)',
                            boxShadow: '0 0 0 3px rgba(229, 231, 235, 0.5)',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'black',
                          '&.Mui-focused': {
                            color: 'black',
                          },
                        },
                        '& .MuiFormHelperText-root': {
                          backgroundColor: 'transparent',
                          color: 'red',

                          borderRadius: '4px',
                          marginTop: '4px',
                        },

                      }}
                    />
                  )}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.full_name}
                    </li>
                  )}
                  renderTags={(value) => (
                    <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                      {value.map((option, index) => (
                        <CustomChip
                          key={option.id}
                          label={option.full_name}
                          onDelete={() => {
                            const updatedValue = [...value];
                            updatedValue.splice(index, 1);
                            setSelectedInstructors(updatedValue);
                            setValue('instructors', updatedValue);
                          }}
                          color="primary"
                          sx={{ m: 0.75 }}
                        />
                      ))}
                    </div>
                  )}
                  isOptionEqualToValue={(option, value) => option._id === value._id}
                  selectalltext="Select All"
                  selectallprops={{ sx: { fontWeight: 'bold' } }}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Autocomplete
                  disableCloseOnSelect
                  multiple
                  id="select-multiple-coordinates"
                  options={[{ _id: 'selectAll', full_name: 'Select All' }, ...activeNonTeachingStaff]}
                  getOptionLabel={(option) => option.full_name}
                  value={selectedCoordinates||[]}
                  onChange={(e, newValue) => {
                    if (newValue && newValue.some((option) => option._id === 'selectAll')) {
                      setSelectedCoordinates(activeNonTeachingStaff.filter((option) => option._id !== 'selectAll'));
                      setValue(
                        'coordinators',
                        activeTeachingStaff.filter((option) => option._id !== 'selectAll')
                      );
                    } else {
                      setSelectedCoordinates(newValue);
                      setValue('coordinators', newValue);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="coordinators"
                      InputProps={{
                        ...params.InputProps,
                        style: { overflowX: 'auto', maxHeight: 55, overflowY: 'hidden' }
                      }}
                      sx={{
                        backgroundColor: 'transparent',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: 'white',
                          '& fieldset': {
                            borderColor: 'rgba(156, 163, 175, 1)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(156, 163, 175, 1)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'rgba(96, 165, 250, 1)',
                            boxShadow: '0 0 0 3px rgba(229, 231, 235, 0.5)',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'black',
                          '&.Mui-focused': {
                            color: 'black',
                          },
                        },
                        '& .MuiFormHelperText-root': {
                          backgroundColor: 'transparent',
                          color: 'red',

                          borderRadius: '4px',
                          marginTop: '4px',
                        },

                      }}
                    />
                  )}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.full_name}
                    </li>
                  )}
                  renderTags={(value) => (
                    <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                      {value.map((option, index) => (
                        <CustomChip
                          key={option.id}
                          label={option.full_name}
                          onDelete={() => {
                            const updatedValue = [...value];
                            updatedValue.splice(index, 1);
                            setSelectedCoordinates(updatedValue);
                            setValue('coordinators', updatedValue);
                          }}
                          color="primary"
                          sx={{ m: 0.75 }}
                        />
                      ))}
                    </div>
                  )}
                  isOptionEqualToValue={(option, value) => option._id === value._id}
                  selectalltext="Select All"
                  selectallprops={{ sx: { fontWeight: 'bold' } }}
                />
              </Grid>

              <Grid item xs={12} >
                <Box display="flex" justifyContent="space-between">

                  <Button onClick={handleClose} variant="tonal" color="error" sx={{
                    border: '2px solid #D8B4FE',
                    color: '#9333EA',
                    backgroundColor: 'transparent',
                    '&:hover': {
                      backgroundColor: '#FAF5FF',
                    },
                  }}>
                    Cancel
                  </Button>

                  <Button type="submit" variant="contained"  sx={{
                      background: 'linear-gradient(to right, #9333EA, #4F46E5)',
                      color: 'white',
                      '&:hover': {
                        background: 'linear-gradient(to right, #7E22CE, #4338CA)',
                      },
                    }}>
                    Submit
                  </Button>
                </Box>
              </Grid>


            </Grid>
          </form>
        </DatePickerWrapper>
      </DialogContent>
    </Dialog>
  );
};

OfflineClassEditModal.propTypes = {
  open: PropTypes.any,
  handleEditClose: PropTypes.any,
  offlineClasses: PropTypes.any,
  setRefetch: PropTypes.any
};

export default OfflineClassEditModal;
