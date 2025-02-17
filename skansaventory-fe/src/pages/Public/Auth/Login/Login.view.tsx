import { FC, memo } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { loginFormSchema, LoginViewProps } from "../Auth.data";

const LoginView: FC<LoginViewProps> = ({ setAuthStep, onSubmit, isLoading }) => (
    <Formik
        initialValues={{
            username: '',
            password: '',
        }}
        validationSchema={loginFormSchema}
        onSubmit={onSubmit}
    >
        {({ isSubmitting }) => (
            <Form className="space-y-2">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-slate-900">Username</span>
                    </label>
                    <Field
                        name="username"
                        type="text"
                        placeholder="Username"
                        className="input input-sm p-5 px-4 input-bordered w-full border-slate-950 rounded-3xl"
                    />
                    <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-slate-900">Password</span>
                    </label>
                    <Field
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="input input-sm p-5 px-4 input-bordered w-full border-slate-950 rounded-3xl"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="flex flex-col items-center justify-center space-y-4 pt-4 pb-2">
                    <button 
                        type="submit" 
                        className="btn bg-slate-950 text-white w-full rounded-3xl"
                        disabled={isSubmitting || isLoading}
                    >
                        {isLoading ? "Logging in..." : "Log in"}
                    </button>
                    <p className="text-sm text-center">
                        Forgot Password? 
                        <span onClick={() => setAuthStep(2)} className="text-[#535bf2] cursor-pointer hover:underline">
                            Click Here!
                        </span>
                    </p>
                </div>
            </Form>
        )}
    </Formik>
);

export default memo(LoginView);
