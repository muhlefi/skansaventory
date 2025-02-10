import { FC, memo } from "react";
import { TextareaInputProps } from "./TextareaInput.type";
import { ErrorMessage, Field } from "formik";

const TextareaInputView: FC<TextareaInputProps> = ({ label, name, placeholder, isRequired }) => (
    <div className="flex flex-col gap-2">
        <p className="text-sm">
            {label}
            {isRequired && (
                <span className="text-red-600">*</span>
            )}
        </p>
        <Field as="textarea" name={name} className="border border-gray-400 rounded-md text-sm p-2 h-28" placeholder={placeholder} />
        <ErrorMessage name={name} component="p" className="text-sm text-red-600 text-left" />
    </div>
);

export default memo(TextareaInputView);
