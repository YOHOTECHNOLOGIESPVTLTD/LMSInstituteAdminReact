// groupService.js
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

const COURSE_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/course-management/institute-courses`;
import { HTTP_END_POINTS } from 'api/client/http_end_points';
import client from 'api/client';

export const getAllCoursesByBranch = async (data) => {
  try {
    const response = await axios.get(`${HTTP_END_POINTS.course.get}${data.id}/courses`, {
      params: data,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
      }
    });
    // Check if the response status is successful
    if (response.data.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch Courses. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllCourseCategories:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const updateCourseStatus = async (data) => {
  try {
    const response = await axios.put(`${HTTP_END_POINTS.course.update}${data.category}/courses/${data.id}`, { is_active: data.is_active }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'Course updated successfully' };
    } else {
      return { success: false, message: 'Failed to update Course' };
    }
  } catch (error) {
    console.error('Error in updateCourse:', error);
    throw error;
  }
};

export const getCourseDetails = async (data) => {
  try {
    const response = await axios.get(`${HTTP_END_POINTS.course.update}${data.category}/courses/${data.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
      },
    });
    // Check if the response status is successful
    if (response.data.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch Courses. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllCourseCategories:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const getAllCourses = async (data) => {
  try {
    const response = await client.course.getWithBranch(data)
    console.log(response, "response")
    return { data: response.data };

  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllActu=iveCourse:', error);
    return { success: false, message: error?.response?.data?.message }
    // Throw the error again to propagate it to the calling function/component
    throw new Error(`Failed to fetch ActiveCourses. Status: ${error}`);
  }
};

export const getAllInstructorsWithCourse = async (data) => {
  try{
  const response = await client.batch.getInstructors(data)
  return { data: response?.data }
  }catch(error){
    return { success: false, message: error?.response?.data?.message }
  }
}

export const addCourse = async (data, file) => {
  try {
    const response = await client.course.create(data)
    // const add_template = await client.course.add_template({ course: response?.data?._id, file: file })

  } catch (error) {
    console.error('Error in addCourse:', error);
    const data = error?.response?.data?.message ? error?.response?.data?.message : error?.message
    throw new Error(data)
  }
};

export const getStudentByCourse = async (data) => {
  try {
    const response = await client.users.getStudentsWithCourse(data)

    if (response.status) {
      return response;
    } else {
      return { success: false, message: 'Failed to Fetch Active student' };
    }
  } catch (error) {
    console.error('Error in Fetch Active student:', error);
    throw error;
  }
};

export const deleteCourse = async (data) => {
  try {
    const response = await client.course.delete(data)
    return { success: true, message: 'Course deleted successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to delete Course' };
  }
};

export const updateCourse = async (data) => {
  try {
    const response = await client.course.update(data)

    return { success: true, message: 'Course updated successfully' };
  } catch (error) {
    console.error('Error in updateCourse:', error);
    return { success: false, message: 'Failed to update Course' };
  }
};