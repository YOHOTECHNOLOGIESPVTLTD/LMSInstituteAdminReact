import * as yup from 'yup';
// Function to show validation errors
export const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`;
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`;
  } else {
    return '';
  }
};

// Schema for form validation
export const addGroupYupSchema = yup.object().shape({
  groupName: yup
    .string()
    .min(3, (obj) => showErrors('Group Name', obj.value.length, obj.min))
    // .matches(/^[a-zA-Z0-9\s]+$/, 'Group Name should not contain special characters')
    .matches(/^[\w\s]+$/, 'Group Name should only contain letters, numbers, and spaces')
    .required()
});

// Schema for form validation
export const editGroupYupSchema = yup.object().shape({
  roleName: yup
    .string()
    .min(3, (obj) => showErrors('Group Name', obj.value.length, obj.min))
    .matches(/^[a-zA-Z0-9\s]+$/, 'Role Name should not contain special characters')
    .required()
});
