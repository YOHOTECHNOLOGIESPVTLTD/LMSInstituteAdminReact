// coursesThunks.js
import { getAllCoursesByBranch as fetchAllCourses } from '../services/courseServices'; // Replace with your service file
import { setCourses, setLoading } from './courseSlice';

export const getAllCourses = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllCourses(data); 
    dispatch(setCourses(response?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
