import { FC, memo } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { ResetPasswordFormSchema, ResetPasswordProps } from "../Auth.data";

const ResetPasswordView: FC<ResetPasswordProps> = ({ setAuthStep }) => (

    <Formik
        initialValues={{
            email: '',
        }}
        validationSchema={ResetPasswordFormSchema}
        onSubmit={
            async (values, { setSubmitting }) => {
                try {
                    const response = await fetch('http://localhost:3000/api/auth/reset-password', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values)
                    });
                    const data = await response.json();
                    if (data.error) {
                        alert(data.message);
                    } else {
                        localStorage.setItem('token', data.token);
                        console.log('reset password successful');
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    setSubmitting(false);
                }
            }}
    >
        <Form className="space-y-2">
            <div role="alert" className="alert rounded-md bg-yellow-100 border border-yellow-400 text-yellow-700">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-sm">Password can only be reset within 1 week</span>
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text text-slate-900">Email</span>
                </label>
                <Field
                    name="email"
                    type="email"
                    placeholder="skansaventory@gmail.com"
                    className="input input-bordered w-full border-slate-950 rounded-3xl"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1 ml-3" />
            </div>
            <div className="flex flex-col items-center justify-center pt-4 pb-2">
                <div className="flex items-center mb-4">
                    <input type="checkbox" className="checkbox checkbox-sm border-slate-950 [--chkbg:theme(colors.slate.950)]" />
                    <label htmlFor="confirm-reset" className="ml-2 text-xs text-slate-600">
                        Are you sure you want to reset your password?
                    </label>
                </div>
                <button type="submit" className="btn bg-slate-950 text-white w-full rounded-3xl mt-2">Reset Password</button>
                <p onClick={() => setAuthStep(1)} className="text-sm text-center mt-4 text-[#535bf2] hover:underline">Back to login</p>
            </div>
        </Form>
    </Formik>
);

export default memo(ResetPasswordView);
