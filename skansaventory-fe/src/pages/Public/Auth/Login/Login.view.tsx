import { FC, memo } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { loginFormSchema, LoginViewProps } from "../Auth.data";

const LoginView: FC<LoginViewProps> = ({ onSubmit, isLoading }) => (
    <Formik
        initialValues={{
            username: '',
            password: '',
        }}
        validationSchema={loginFormSchema}
        onSubmit={onSubmit}
    >
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
            <div className="pt-5">
                <button
                    type="submit"
                    className="btn bg-slate-900 text-white w-full rounded-3xl"
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Log in"}
                </button>
            </div>
        </Form>
    </Formik>
);

export default memo(LoginView);
