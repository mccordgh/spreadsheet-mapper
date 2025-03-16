import React from 'react';

type ButtonProps = {
    text?: string;
    icon?: "checkmark" | "x";
    onClick?: () => void;
}

const checkMark = "✅";
const xMark = "❌";

const Button = (props: ButtonProps) => {
    const { text, icon, onClick } = props;
    
    let children: React.JSX.Element = <></>;

    if (icon) {
        children = <button>{icon === "checkmark" ? checkMark : xMark}</button>;
    }
    
    if (text) {
        children = <button>{text}</button>;
    }
    
    console.error("Button must have either text or icon prop");
    return children;
}

export { Button };