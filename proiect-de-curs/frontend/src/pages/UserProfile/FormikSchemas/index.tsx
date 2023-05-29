import * as Yup from 'yup';

export const UserEditSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(3, '* Firstname is too short!')
        .max(20, '* Firstname is too long!')
        .required('* Name is required'),
    lastName: Yup.string()
        .min(3, '* Lastname is too short!')
        .max(20, '* Lastname is too long!')
        .required('* Name is required'),
    email: Yup.string()
        .email('* Invalid email')
        .required('* Email is required'),
    description: Yup.string()
        .min(10, '* Description is too short!')
        .max(100, '* Description is too long!'),
});
