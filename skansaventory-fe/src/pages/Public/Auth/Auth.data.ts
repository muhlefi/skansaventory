import * as Yup from 'yup'	

export interface LoginViewProps {
    onSubmit: (values: { username: string; password: string }) => void;
    isLoading: boolean;
}

export const loginFormSchema = Yup.object().shape({
    username: Yup.string().required('Username is required').min(8, 'Username must be at least 8 characters'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters')
})
