import React from 'react';

type TextBoxProps = {
    placeholder?: string;
    onchange?: () => void;
    value?: string;
}

const TextBox = (props: TextBoxProps) => {
  return <input type="text" placeholder={props.value || "TextBox"} />;
}

export { TextBox };