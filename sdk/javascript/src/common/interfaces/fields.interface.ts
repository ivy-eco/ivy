const INPUT_TYPES = [
    "input-text", 
    "input-password",
    "input-number",
    "textarea"
] as const;

export type InputType = (typeof INPUT_TYPES)[number];

export interface InputsField {
    name: string;
    input: InputType;
}

export interface ValuesField {
    name: string;
    value: string;
}