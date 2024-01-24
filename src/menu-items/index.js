import dashboard from './dashboard';
import userManagement from './user-management';
import branchManagement from './branch-management';
import staffManagement from './staff-management';
import studentManagement from './student-management';
import courseManagement from './course-management';
import contentManagement from './content-management';
import classManagement from './class-management';
import examManagement from './exam-management';
import attendanceManagement from './attendance-management';
import paymentManagement from './payment-management';
import batchManagement from './batch-management';
import refundManagement from './refund-management';
import certificateManagement from './certificate-management';
import IdCardManagement from './id-cards-management';
import resultManagement from './result-management';
import allNotifications from './notification-management';
import helpCenter from './help-center';
import calender from './calender'
// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [
    dashboard,
    calender,
    branchManagement,
    userManagement,
    batchManagement,
    staffManagement,
    studentManagement,
    courseManagement,
    contentManagement,
    classManagement,
    examManagement,
    attendanceManagement,
    resultManagement,
    paymentManagement,
    refundManagement,

    allNotifications,
    certificateManagement,
    IdCardManagement,
    helpCenter
  ]
};

export default menuItems;
