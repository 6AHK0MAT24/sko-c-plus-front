import React from 'react';
import LabelMedium from 'assets/fonts/LableMedium';

interface InfProps {
    label: string
    value: string
}

const InfoCommon: React.FC<InfProps> = ({label, value}) => {
    const expression = label +': '+value
    return(
            <LabelMedium
                className="header__info__box"
                label={expression}
            />
    )
}

export default InfoCommon
