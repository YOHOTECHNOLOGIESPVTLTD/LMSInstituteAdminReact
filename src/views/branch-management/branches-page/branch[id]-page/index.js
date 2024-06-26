import { Grid } from '@mui/material';
// import { useState, useEffect } from 'react';
import { getBranchById } from 'features/branch-management/services/branchServices';
import Earningscard from 'features/branch-management/view-branch/components/Earningscard';
import Coursescard from 'features/branch-management/view-branch/components/headerCards/Coursescard';
// import StaffsCard from 'features/branch-management/view-branch/components/headerCards/staffsCard';
import StudentsCard from 'features/branch-management/view-branch/components/headerCards/studentsCard';
// import UsersCard from 'features/branch-management/view-branch/components/headerCards/usersCard';
import PaymentsCard from 'features/branch-management/view-branch/components/headerCards/payments';
import CardHorizondalClasses from 'features/branch-management/view-branch/components/horizondalCards/CardHorizondalClasses';
import CardHorizondalCourses from 'features/branch-management/view-branch/components/horizondalCards/CardHorizondalCourses';
import CardHorizondalUsers from 'features/branch-management/view-branch/components/horizondalCards/CardHorizondalUsers';
import CardStudentAndTeachers from 'features/branch-management/view-branch/components/horizondalCards/CardStudentandTeacher';
import SupportTicket from 'features/branch-management/view-branch/components/supportTickets';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { gridSpacing } from 'store/constant';
import AllActivity from 'views/dashboard/Default/card/Allactivity';

const BranchViewPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const branchId = location.state.id;
  console.log('branchId', branchId);
  const [branchData, setBranchData] = useState([]);

  useEffect(() => {
    const data = {
      branch_id: branchId
    };

    getBranchData(data);
  }, [dispatch, branchId]);

  const getBranchData = async (data) => {
    try {
      const result = await getBranchById(data);
      if (result.success) {
        console.log(result.data);
        setBranchData(result.data);
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log('branchData:', branchData.StaffCount);
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={8} spacing={gridSpacing}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={6} sm={4}>
            <PaymentsCard branchData={branchData} />
          </Grid>
          {/* <Grid item xs={6} sm={4}>
            <UsersCard branchData={branchData} />
          </Grid> */}
          <Grid item xs={6} sm={4}>
            <Coursescard branchData={branchData} />
          </Grid>
          <Grid item xs={6} sm={4}>
            <StudentsCard branchData={branchData} />
          </Grid>
          {/* <Grid item xs={6} sm={4}>
            <StaffsCard branchData={branchData} />
          </Grid> */}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={4}>
        <CardStudentAndTeachers branchData={branchData} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <Earningscard />
      </Grid>

      <Grid item xs={12} sm={4}>
        <AllActivity />
      </Grid>
      

      <Grid item xs={12} sm={4}>
        <CardHorizondalCourses branchData={branchData} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <CardHorizondalClasses branchData={branchData} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <CardHorizondalUsers branchData={branchData} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <SupportTicket branchData={branchData} />
      </Grid>
    </Grid>
  );
};

export default BranchViewPage;
