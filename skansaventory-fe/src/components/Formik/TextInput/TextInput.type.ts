export interface TextInputProps {
    label: string;
    name: string;
    placeholder: string;
    type: string;
    className?: string;
    inputmode?: string;
    size: 'sm' | 'base' | 'md';
}