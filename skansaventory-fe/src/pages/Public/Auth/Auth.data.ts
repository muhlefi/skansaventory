import { Dispatch, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";
import * as Yup from 'yup'	

export interface AuthProps {
    authStep: number;
    setAuthStep: Dispatch<SetStateAction<number>>
}

export interface LoginProps {
    setAuthStep: Dispatch<SetStateAction<number>>
    navigate: NavigateFunction
}

export interface ResetPasswordProps {
    setAuthStep: Dispatch<SetStateAction<number>>
}

export const loginFormSchema = Yup.object().shape({
    username: Yup.string().required('Username field is required'),
    password: Yup.string().required('Password field is required')
})

export const ResetPasswordFormSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email field is required')
})