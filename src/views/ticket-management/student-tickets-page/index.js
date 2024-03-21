// ** React Imports
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// ** Store & Actions Imports
import { fetchUserProfile, removeSelectedChat, selectChat, sendMsg } from 'features/ticket-management/student/components/AppChat';
import { useDispatch, useSelector } from 'react-redux';

// ** Utils Imports
import { formatDateToMonthShort } from 'utils/format';
import { getInitials } from 'utils/get-initials';

// ** Chat App Components Imports

import TicketSkeleton from 'components/cards/Skeleton/TicketSkeleton';
import ChatContent from 'features/ticket-management/student/components/ChatContent';
import SidebarLeft from 'features/ticket-management/student/components/SidebarLeft';
import { getAllStudentTickets } from 'features/ticket-management/student/redux/studentTicketThunks';
import { selectStudentTickets, selectLoading } from 'features/ticket-management/student/redux/studentTicketSelectors';

const StudentTicket = () => {
  // ** States
  const [userStatus, setUserStatus] = useState('online');
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [userProfileLeftOpen, setUserProfileLeftOpen] = useState(false);
  const [userProfileRightOpen, setUserProfileRightOpen] = useState(false);

  // ** Hooks
  const theme = useTheme();
  const dispatch = useDispatch();

  const hidden = useMediaQuery(theme.breakpoints.down('lg'));
  const store = useSelector((state) => state.chat);

  // ** Vars
  const skin = 'default';
  const smAbove = useMediaQuery(theme.breakpoints.up('sm'));
  const sidebarWidth = smAbove ? 400 : 300;
  const mdAbove = useMediaQuery(theme.breakpoints.up('md'));
  const statusObj = {
    busy: 'error',
    away: 'warning',
    online: 'success',
    offline: 'secondary'
  };
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const studentTickets = useSelector(selectStudentTickets);
  const studentLoading = useSelector(selectLoading);
  useEffect(() => {
    const data = {
      branch_id: selectedBranchId,
      type: 'open'
    };

    dispatch(getAllStudentTickets(data));
  }, [dispatch, selectedBranchId]);

  useEffect(() => {
    dispatch(fetchUserProfile());
    // dispatch(fetchChatsContacts())
  }, [dispatch]);
  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen);
  const handleUserProfileLeftSidebarToggle = () => setUserProfileLeftOpen(!userProfileLeftOpen);
  const handleUserProfileRightSidebarToggle = () => setUserProfileRightOpen(!userProfileRightOpen);
  console.log(selectChat);
  console.log(studentTickets);

  return (
    <>
      <Grid>
        <Grid spacing={1} className="match-height">
          {studentLoading ? (
            <TicketSkeleton />
          ) : (
            <Box
              className="app-chat"
              sx={{
                width: '100%',
                display: 'flex',
                height: '82vh',
                flexDirection: 'row',
                borderRadius: 1,
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: 'background.paper',
                boxShadow: skin === 'bordered' ? 0 : 6,
                ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` })
              }}
            >
              <SidebarLeft
                store={store}
                hidden={hidden}
                mdAbove={mdAbove}
                dispatch={dispatch}
                statusObj={statusObj}
                userStatus={userStatus}
                selectChat={selectChat}
                getInitials={getInitials}
                sidebarWidth={sidebarWidth}
                setUserStatus={setUserStatus}
                leftSidebarOpen={leftSidebarOpen}
                removeSelectedChat={removeSelectedChat}
                userProfileLeftOpen={userProfileLeftOpen}
                formatDateToMonthShort={formatDateToMonthShort}
                handleLeftSidebarToggle={handleLeftSidebarToggle}
                handleUserProfileLeftSidebarToggle={handleUserProfileLeftSidebarToggle}
              />
              <ChatContent
                store={store}
                hidden={hidden}
                sendMsg={sendMsg}
                mdAbove={mdAbove}
                dispatch={dispatch}
                statusObj={statusObj}
                getInitials={getInitials}
                sidebarWidth={sidebarWidth}
                userProfileRightOpen={userProfileRightOpen}
                handleLeftSidebarToggle={handleLeftSidebarToggle}
                handleUserProfileRightSidebarToggle={handleUserProfileRightSidebarToggle}
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};
StudentTicket.contentHeightFixed = true;

export default StudentTicket;
