// groupThunks.js
import { getAllStudentFees as fetchAllStudentFees } from '../services/studentFeeServices'; // Replace with your service file
import { setStudentFees, setLoading } from './studentFeeSlice';

export const getAllStudentFees = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllStudentFees(data); // Implement this function in your services
    dispatch(setStudentFees(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
