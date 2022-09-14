import React from 'react';

interface LabelBoldProps {
    size?: number,
    label: string | number
    className?: string
}

const LabelBold : React.FC<LabelBoldProps> = ({size, label, className }) => {
    LabelBold.defaultProps = {
        size: 14
    }
    return (
        <label
            className={className}
            style={{fontFamily: 'PTRootUIWebBold', fontSize: size}}
        >
            {label}
        </label>
    )
}

export default LabelBold;
