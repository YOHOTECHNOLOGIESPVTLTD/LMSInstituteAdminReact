import TabContext from '@mui/lab/TabContext';
import MuiTabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import MuiTab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import TeacherAttendance from './StaffAttendance';
import UserViewBilling from './StaffClass';
import UserViewAccount from './StaffViewAccount';
import UserViewConnection from './StaffViewConnection';
import UserViewSecurity from './StaffViewSecurity';

const Tab = styled(MuiTab)(({ theme }) => ({
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1.5)
  }
}));

const TabList = styled(MuiTabList)(({ theme }) => ({
  borderBottom: '0 !important',
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      color: theme.palette.primary.main
    }
  }
}));

const UserViewRight = ({ tab, staff, staffID, formattedDate, setRefetch }) => {
  const [activeTab, setActiveTab] = useState('account');
  const handleChange = (event, value) => {
    setActiveTab(value);
  };
  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [tab]);
  console.log(staff,"staff")
  return (
    <TabContext value={activeTab}>
      <TabList
        variant="scrollable"
        scrollButtons="auto"
        onChange={handleChange}
        aria-label="forced scroll tabs example"
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Tab value="account" label="Info" icon={<Icon fontSize="1.125rem" icon="tabler:user-check" />} />
        <Tab value="security" label="Security" icon={<Icon fontSize="1.125rem" icon="tabler:lock" />} />
        <Tab value="class" label="Classes" icon={<Icon fontSize="1.125rem" icon="tabler:books" />} />
        <Tab value="attendance" label="Attendance" icon={<Icon fontSize="1.125rem" icon="tabler:calendar-plus" />} />
        <Tab value="activity" label="Activity" icon={<Icon fontSize="1.125rem" icon="tabler:link" />} />
      </TabList>
      <Box sx={{ mt: 4 }}>
        <>
          <TabPanel sx={{ p: 0 }} value="account">
            <UserViewAccount staff={staff?.staff} staffID={staffID} formattedDate={formattedDate} setRefetch={setRefetch} />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="security">
            <UserViewSecurity id={staff?.teachingStaff?.id} />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="class">
            <UserViewBilling staff={staff?.staff?._id} />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="attendance">
            <TeacherAttendance attendance={staff?.attendance} />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="activity">
            <UserViewConnection activity={staff?.staff?._id} />
          </TabPanel>
        </>
      </Box>
    </TabContext>
  );
};

UserViewRight.propTypes = {
  tab: PropTypes.any,
  staff: PropTypes.any,
  staffID: PropTypes.any,
  formattedDate: PropTypes.any,
  setRefetch: PropTypes.any
};

export default UserViewRight;
