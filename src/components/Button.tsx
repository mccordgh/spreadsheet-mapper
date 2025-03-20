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
    
    let children: React.JSX.Element | null = null;

    if (icon) {
        children = <button onClick={onClick}>{icon === "checkmark" ? checkMark : xMark}</button>;
    }
    
    if (text) {
        children = <button onClick={onClick}>{text}</button>;
    }
    
    if (children === null) {
        console.error("Button must have either text or icon prop");
    }

    return children || <></>;
}

export { Button };