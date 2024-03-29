// ** React Imports
import { forwardRef, useState } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
// ** Icon Imports
import Icon from 'components/icon';
// ** Third Party Imports
import format from 'date-fns/format';
import DatePicker from 'react-datepicker';
// ** Utils Import
import { getInitials } from 'utils/get-initials';
// ** Custom Components Imports
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import FeeDeleteModel from 'components/modal/DeleteModel';
import OptionsMenu from 'components/option-menu';
import { Link } from 'react-router-dom';
import FeesAddDrawer from './FeesAddDrawer';
import FeesCardHeader from './FeesCardHeader';
import FeesEditDrawer from './FeesEditDrawer';
// ** Styled Components
import { selectBatches } from 'features/batch-management/batches/redux/batchSelectors';
import { getAllBatches } from 'features/batch-management/batches/redux/batchThunks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { selectStudentFees } from '../redux/studentFeeSelectors';
import { getAllStudentFees } from '../redux/studentFeeThunks';
import FeesTableSkeleton from 'components/cards/Skeleton/PaymentSkeleton';
import CustomChip from 'components/mui/chip';
import { deleteStudentFee } from '../services/studentFeeServices';
import { useCallback } from 'react';

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}));

// ** renders client column
const renderClient = (row) => {
  if (row?.students?.image) {
    return (
      <Avatar src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${row?.students?.image}`} sx={{ mr: 2.5, width: 38, height: 38 }} />
    );
  } else {
    return (
      <Avatar
        skin="light"
        color={row?.avatarColor || 'primary'}
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: (theme) => theme.typography.body1.fontSize }}
      >
        {getInitials(row?.name || 'John Doe')}
      </Avatar>
    );
  }
};

/* eslint-disable */
const CustomInput = forwardRef((props, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : '';
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null;
  const value = `${startDate}${endDate !== null ? endDate : ''}`;
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null;
  const updatedProps = { ...props };
  delete updatedProps.setDates;
  return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />;
});

const userStatusObj = {
  paid: 'success',
  pending: 'warning',
  refund: 'secondary'
};
/* eslint-enable */
const FeesTable = () => {
  // ** State
  const [dates, setDates] = useState([]);
  const [endDateRange, setEndDateRange] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [startDateRange, setStartDateRange] = useState(null);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [addUserOpen, setAddUserOpen] = useState(false);
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);

  function convertDateFormat(input) {
    // Create a new Date object from the original date string
    var originalDate = new Date(input);
    // Extract the year, month, and day components
    var year = originalDate.getFullYear();
    var month = ('0' + (originalDate.getMonth() + 1)).slice(-2); // Months are 0-based
    var day = ('0' + originalDate.getDate()).slice(-2);

    // Form the yyyy-mm-dd date string
    var formattedDateString = year + '-' + month + '-' + day;

    return formattedDateString;
  }

  console.log(convertDateFormat(startDateRange));
  console.log(endDateRange);

  console.log(setRefetch);
  console.log(selectedRows);

  const dispatch = useDispatch();
  const StudentFees = useSelector(selectStudentFees);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  console.log(StudentFees);

  useEffect(() => {
    dispatch(
      getAllStudentFees({
        branch_id: selectedBranchId
      })
    );
  }, [dispatch, selectedBranchId, refetch]);

  const toggleEditUserDrawer = () => {
    setEditUserOpen(!editUserOpen);
    console.log('Toggle drawer');
  };

  const handleRowClick = (rowData) => {
    setSelectedRows(rowData);
  };

  const handleOnChangeRange = (dates) => {
    const [start, end] = dates;
    if (start !== null && end !== null) {
      setDates(dates);
      const data = {
        start_date: convertDateFormat(start),
        end_date: convertDateFormat(end),
        branch_id: selectedBranchId
      };
      dispatch(getAllStudentFees(data));
    }
    setStartDateRange(start);
    setEndDateRange(end);
  };

  useEffect(() => {
    dispatch(
      getAllBatches({
        branch_id: selectedBranchId
      })
    );
  }, [dispatch, selectedBranchId]);

  const [feeDeleteModelOpen, setFeeDeleteModelOpen] = useState(false);

  const [selectedFeeDeleteId, setSelectedFeeDeleteId] = useState(null);
  const batch = useSelector(selectBatches);

  // Memoize the handleDelete function to prevent unnecessary re-renders
  const handleDelete = useCallback((itemId) => {
    setSelectedFeeDeleteId(itemId);
    setFeeDeleteModelOpen(true);
  }, []);

  // Handle branch deletion
  const handleFeeDelete = async () => {
    const result = await deleteStudentFee({ id: selectedFeeDeleteId });
    if (result.success) {
      toast.success(result.message);
      setRefetch((state) => !state);
    } else {
      toast.error(result.message);
    }
  };

  const defaultColumns = [
    {
      flex: 0.1,
      minWidth: 100,
      field: 'id',
      headerName: 'ID',
      renderCell: ({ row }) => (
        <Typography component={LinkStyled} to={`/apps/invoice/preview/${row.id}`}>
          {`#${row.id}`}
        </Typography>
      )
    },
    {
      flex: 1.25,
      minWidth: 140,
      field: 'transactionId',
      headerName: 'Transaction ID',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.transaction_id}</Typography>
    },
    {
      flex: 1.25,
      minWidth: 210,
      field: 'name',
      headerName: 'Students',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {row.students.first_name}
              </Typography>
              <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
                {row.students.email}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      flex: 1.25,
      minWidth: 120,
      field: 'total',
      headerName: 'Amount Paid',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary', ml: 2 }}>{`$${row.paid_amount || 0}`}</Typography>
    },
    {
      flex: 1.25,
      minWidth: 150,
      field: 'issuedDate',
      headerName: 'Issued Date',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.payment_date}</Typography>
    },
    {
      flex: 1.25,
      minWidth: 150,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <CustomChip
            rounded
            skin="light"
            size="small"
            label={row.status}
            color={userStatusObj[row.status]}
            sx={{ textTransform: 'capitalize' }}
          />
        );
      }
    }
  ];

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 120,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* <Tooltip title="View">
            <IconButton size="small" sx={{ color: 'text.secondary' }} to={`/apps/invoice/preview/${row.id}`}>
              <Icon icon="tabler:eye" />
            </IconButton>
          </Tooltip> */}
          <OptionsMenu
            menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
            iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
            options={[
              {
                text: 'View',
                icon: <Icon icon="tabler:eye" fontSize={20} />,
                menuItemProps: {
                  component: Link,
                  to: `/apps/invoice/preview/${row.id}`
                }
              },
              {
                text: 'Edit',
                to: `/apps/invoice/edit/${row.id}`,
                icon: <Icon icon="tabler:edit" fontSize={20} />,
                menuItemProps: {
                  onClick: () => {
                    handleRowClick(row);
                    toggleEditUserDrawer(); // Toggle the edit drawer when either the text or the icon is clicked
                  }
                }
              },
              {
                // to: `/apps/invoice/delete/${row.id}`,
                text: 'Delete',
                icon: <Icon icon="mdi:delete-outline" />,
                menuItemProps: {
                  onClick: () => handleDelete(row.id)
                }
              },
              {
                text: 'Download',
                icon: <Icon icon="tabler:download" fontSize={20} />
              }
            ]}
          />
        </Box>
      )
    }
  ];

  const [loading, setLoading] = useState(true);
  // Simulate loading delay with useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DatePickerWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Fee" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    // multiple
                    fullWidth
                    options={batch}
                    filterSelectedOptions
                    onChange={(e, newValue) => {
                      // const batchId = newValue.map((item) => item.batch.batch_id);
                      console.log(newValue);
                      const data = {
                        batch_id: newValue.batch.batch_id,
                        branch_id: selectedBranchId
                      };
                      dispatch(getAllStudentFees(data));
                    }}
                    // defaultValue={[top100Films[13]]}
                    id="autocomplete-multiple-outlined"
                    getOptionLabel={(option) => option.batch.batch_name || ''}
                    renderInput={(params) => <TextField {...params} label=" Batches" placeholder="Favorites" />}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DatePicker
                    isClearable
                    selectsRange
                    monthsShown={2}
                    endDate={endDateRange}
                    selected={startDateRange}
                    startDate={startDateRange}
                    shouldCloseOnSelect={false}
                    id="date-range-picker-months"
                    onChange={handleOnChangeRange}
                    customInput={
                      <CustomInput
                        dates={dates}
                        setDates={setDates}
                        label="Start date End date"
                        end={endDateRange}
                        start={startDateRange}
                      />
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <FeesCardHeader selectedBranchId={selectedBranchId} selectedRows={selectedRows} toggle={toggleAddUserDrawer} />
        </Grid>
        <Grid item xs={12}>
          <Card>
            {loading ? (
              <FeesTableSkeleton />
            ) : (
              <DataGrid
                sx={{ p: 2 }}
                autoHeight
                pagination
                rowHeight={62}
                // rows={StudentFees}
                rows={StudentFees}
                columns={columns}
                disableRowSelectionOnClick
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                onRowSelectionModelChange={(rows) => setSelectedRows(rows)}
              />
            )}
          </Card>
        </Grid>
      </Grid>

      <FeesAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
      <FeesEditDrawer
        setRefetch={setRefetch}
        open={editUserOpen}
        toggle={toggleEditUserDrawer}
        selectedRows={selectedRows}
        handleRowClick={handleRowClick}
      />
      <FeeDeleteModel
        open={feeDeleteModelOpen}
        setOpen={setFeeDeleteModelOpen}
        description="Are you sure you want to delete this studentFee?"
        title="Delete"
        handleSubmit={handleFeeDelete}
      />
    </DatePickerWrapper>
  );
};

export default FeesTable;
