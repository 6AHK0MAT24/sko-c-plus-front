import React from 'react';

interface LabelMediumProps {
    size?: number,
    label: string | number,
    className?: string
}

const LabelMedium : React.FC<LabelMediumProps> = ({size, label, className }) => {
    LabelMedium.defaultProps = {
        size: 14
    }
    return (
        <label
            className={className}
            style={{fontFamily: 'PTRootUIWebMedium', fontSize: size}}
        >
            {label}
        </label>
    )
}

export default LabelMedium;

