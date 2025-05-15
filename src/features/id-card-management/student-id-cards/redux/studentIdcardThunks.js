// groupThunks.js
import { getAllStudentIdCards as fetchAllStudentIdCards } from '../services/studentIdcardServices'; // Replace with your service file
import { setStudentIdCards, setLoading } from './studentIdcardSlice';

export const getAllStudentIdCards = (selectedBranchId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllStudentIdCards(selectedBranchId);
    console.log(response) // Implement this function in your services
    dispatch(setStudentIdCards(response?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
