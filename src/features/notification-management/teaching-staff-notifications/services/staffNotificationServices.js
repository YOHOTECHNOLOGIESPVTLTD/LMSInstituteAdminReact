// StaffNotificationservice.js
import axios from 'axios';

const STAFF_NOTIFICATION_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/notification-management/staff-notifications`;

export const getAllStaffNotifications = async (data) => {
  try {
    const response = await axios.get(`${STAFF_NOTIFICATION_API_ENDPOINT}/read-all-staff-notifications?page=${data?.page}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });
    console.log(response);
    // Check if the response status is successful
    if (response.data.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch StaffNotifications. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllStaffNotifications:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const addStaffNotification = async (data) => {
  try {
    const response = await axios.post(`${STAFF_NOTIFICATION_API_ENDPOINT}/staff-notification-send`, data, {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(response);
    if (response.data.status) {
      return { success: true, message: 'StaffNotification created successfully' };
    } else {
      return { success: false, message: 'Failed to create StaffNotification' };
    }
  } catch (error) {
    console.error('Error in addStaffNotification:', error);
    throw error;
  }
};

export const deleteStaffNotification = async (StaffNotificationId) => {
  try {
    const response = await axios.delete(`${STAFF_NOTIFICATION_API_ENDPOINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: StaffNotificationId }
    });

    if (response.data.status) {
      return { success: true, message: 'StaffNotification deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete StaffNotification' };
    }
  } catch (error) {
    console.error('Error in deleteStaffNotification:', error);
    throw error;
  }
};

export const updateStaffNotification = async (data) => {
  try {
    const response = await axios.put(`${STAFF_NOTIFICATION_API_ENDPOINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'StaffNotification updated successfully' };
    } else {
      return { success: false, message: 'Failed to update StaffNotification' };
    }
  } catch (error) {
    console.error('Error in updateStaffNotification:', error);
    throw error;
  }
};

export const resendStaffNotification = async (data) => {
  try {
    const response = await axios.post(`${STAFF_NOTIFICATION_API_ENDPOINT}/staff-notification-resend`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    console.log(response);

    if (response.data.status) {
      return { success: true, message: 'StafftNotification Resend successfully' };
    } else {
      return { success: false, message: 'Failed to resend StaffNotification' };
    }
  } catch (error) {
    console.error('Error in resendStudentNotification:', error);
    throw error;
  }
};
