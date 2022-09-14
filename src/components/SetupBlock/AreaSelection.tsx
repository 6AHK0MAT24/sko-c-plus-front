import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button } from "antd";
import DragMove from "./DragMove";
import { moveOX, moveOY } from "utils/moveCoordinate";
import { drawCanva } from "utils/drawCanva";
import { halfAxleLength, pxInM } from "utils/constants";
import "./setupBlock.scss"
import store from "store";



interface RecInterface {
    pointNumber: number
    change: boolean
}

const AreaSelection: React.FC<RecInterface> = ({pointNumber, change}) => {
    const [translate, setTranslate] = useState(
        {
            x: moveOX(store.data.config.cameras[store.data.cameraNumber].roi[pointNumber][0]),
            y: moveOY(store.data.config.cameras[store.data.cameraNumber].roi[pointNumber][1]),
        });

    useEffect(() => {
        drawCanva()
    });

    const handleDragMove = (e:any) => {
        setTranslate({
            x: translate.x + e.movementX >= halfAxleLength.pixelOX * 2 ?
                halfAxleLength.pixelOX * 2
                : translate.x + e.movementX,
            y: translate.y + e.movementY >= halfAxleLength.pixelOY * 2 ?
                halfAxleLength.pixelOY * 2
                : translate.y + e.movementY,
        });
        store.data.setConfigROI(pointNumber, 0, Number(halfAxleLength.meters - translate.x/pxInM.ox))
        store.data.setConfigROI(pointNumber, 1, Number(halfAxleLength.meters - translate.y/pxInM.oy))
    };

    return (
        <div>
            <DragMove
                onDragMove={handleDragMove}
            >
                <div className='point'
                    style={{
                        transform: `translateX(${translate.x}px) translateY(${translate.y}px)`
                }}
                >
                    <Button
                        type={store.data.point === pointNumber ? "primary" : "default"}
                        shape="circle"
                        size="small"
                        onClick={() => store.data.point = pointNumber}
                        style={{margin: 0}}
                    >
                        {pointNumber + 1}
                    </Button>
                </div>
            </DragMove>
            <canvas
                id="cnvs"
                width="400"
                height="225px"
                className="canvas">
            </canvas>
        </div>
    )
}

export default observer(AreaSelection);
