import { FC } from "react";
import { TextInputProps } from "./TextInput.type";
import TextInputView from "./TextInput.view";

const TextInput: FC<TextInputProps> = ({ label, name, type, placeholder, size, className }) => {
    return <TextInputView
        label={label}
        name={name}
        type={type}
        placeholder={placeholder}
        size={size}
        className={className}
    />;
};

export default TextInput;