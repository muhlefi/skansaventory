import { ErrorMessage, Field } from "formik";
import { FC, memo } from "react";
import { TextInputProps } from "./TextInput.type";

const validateInput = (value: any) => {
    if (value.startsWith('0') && value.length > 1) {
        return 'Input tidak boleh dimulai dengan 0';
    }
    if (parseFloat(value) < 0) {
        return 'Input tidak boleh negatif';
    }
    return '';
};

const TextInputView: FC<TextInputProps> = ({ label, name, type, placeholder, size, className }) => (
    <div className={`flex flex-col gap-1 ${className}`}>
        <label className="text-base">{label}</label>
        <Field
            name={name}
            type={type}
            placeholder={placeholder}
            className={`border border-gray-400 w-full ${size === 'sm' ? 'text-xs p-2 rounded' : size === 'md' ? 'text-sm p-3 rounded-md' : 'text-sm p-4 rounded-lg'}`}
            validate={validateInput}
        />
        <div className="flex items-center justify-between">
            <ErrorMessage component="p" name={name} className="text-red-600 text-sm text-left" />
            {type === 'password' && (
                <a href="#" className="text-right text-indigo-600 text-base">Forgot Password?</a>
            )}
        </div>
    </div>
);

export default memo(TextInputView);

