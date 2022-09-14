import React, { useEffect } from 'react';
import './mainBlock.scss'

interface CameraOverviewInterface {
    name: string
    coordinates: Array<number[]> | undefined,
}

const CameraOverview: React.FC<CameraOverviewInterface> = ({name, coordinates}) => {

    const draw = () => {
        const elem = document.getElementById(name) as HTMLCanvasElement | null;
        if (elem) {
            const ctx = elem?.getContext('2d');
            if (ctx) {
                ctx.beginPath()
                ctx.strokeStyle = '#05FF00'
                ctx.lineWidth = 3;
                let cord = 0;
                if (coordinates) {
                    ctx.moveTo(coordinates[cord][0], coordinates[cord][1]);
                    for (cord = 1; coordinates.length > cord; cord++){
                        ctx.lineTo(coordinates[cord][0], coordinates[cord][1]);
                    }
                    ctx.stroke();
                }

            }
        }
    }

    useEffect(() => {
        draw()
    });

    return(
        <canvas
            id={name}
            width="1440px"
            height="794px"
            className="canvas">
        </canvas>
    )
}

export default CameraOverview
