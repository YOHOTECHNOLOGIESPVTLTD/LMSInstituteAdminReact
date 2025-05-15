// NonTeachingStaffsThunks.js
import { getAllNonTeachingStaffs as fetchAllNonTeachingStaffs } from '../services/nonTeachingStaffServices'; // Replace with your service file
import { setNonTeachingStaffs, setLoading } from './nonTeachingStaffSlice';

export const getAllNonTeachingStaffs = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllNonTeachingStaffs(data); // Implement this function in your services
    dispatch(setNonTeachingStaffs(response.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
