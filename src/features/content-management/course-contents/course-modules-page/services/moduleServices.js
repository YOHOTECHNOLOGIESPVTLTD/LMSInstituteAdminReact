// courseModuleService.js
import axios from 'axios';

const COURSE_MODULE_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/content-management/course-modules`;

export const getAllCourseModules = async (data) => {
  try {
    const response = await axios.get(`${COURSE_MODULE_API_END_POINT}/read?page=${data?.page}`, {
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
      // return { success: false, message: response.data.message };
      throw new Error(`Failed to fetch CourseModules. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllCourseModules:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchCourseModules = async (searchQuery) => {
  try {
    const response = await axios.get('/data_storage/user-management/groups/AllGroups.json', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { search: searchQuery }
    });

    if (response.data) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Failed to fetch search results' };
    }
  } catch (error) {
    console.error('Error in searchCourseModules:', error);
    throw error;
  }
};

export const addCourseModule = async (data) => {
  try {
    const response = await axios.post(`${COURSE_MODULE_API_END_POINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    console.log(response);

    if (response.data.status) {
      return { success: true, message: 'CourseModule created successfully' };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error('Error in addCourseModule:', error);
    throw error;
  }
};

export const deleteCourseModule = async (data) => {
  try {
    const response = await axios.delete(`${COURSE_MODULE_API_END_POINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });

    if (response.data.status) {
      return { success: true, message: 'CourseModule deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete CourseModule' };
    }
  } catch (error) {
    console.error('Error in deleteCourseModule:', error);
    throw error;
  }
};

export const updateCourseModule = async (data) => {
  try {
    const response = await axios.post(`${COURSE_MODULE_API_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log('coursemodules-edit', response);
    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'CourseModule updated successfully' };
    } else {
      return { success: false, message: 'Failed to update CourseModule' };
    }
  } catch (error) {
    console.error('Error in updateCourseModule:', error);
    throw error;
  }
};

export const updateCourseModulesStatus = async (data) => {
  try {
    const response = await axios.post(`${COURSE_MODULE_API_END_POINT}/status`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log('Modulesresponse:', response);
    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'CourseModules status updated successfully' };
    } else {
      return { success: false, message: 'Failed to update CourseModules status' };
    }
  } catch (error) {
    console.error('Error in updateCourseModules:', error);
    throw error;
  }
};
