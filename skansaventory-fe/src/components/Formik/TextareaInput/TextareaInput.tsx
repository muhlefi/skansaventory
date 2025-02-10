import { FC } from "react";
import TextareaInputView from "./TextareaInput.view";
import { TextareaInputProps } from "./TextareaInput.type";

const TextareaInput: FC<TextareaInputProps> = ({ label, name, placeholder, isRequired }) => {
    return <TextareaInputView
        label={label}
        name={name}
        placeholder={placeholder}
        isRequired={isRequired}
    />;
};

export default TextareaInput;