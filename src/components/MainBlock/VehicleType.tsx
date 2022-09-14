import React from 'react';
import { Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { camerasTitle } from "utils/cameraTitleMain";
import CameraOverview from "./CameraOverview";
import ButtonCameras from "./ButtonCameras";
import './mainBlock.scss'
import store from "store";

interface VehicleTypeInterface {
    cameraOverviewPart: string[]
    cameraOverview: Cord
    coordinates: boolean
    type: string
    img: string
}

interface Cord {
    rightMustache: number[][],
    leftMustache: number[][],
    frame: number[][],
    topCanvas?: number[][],
    bottomCanvas?: number[][]
}

const VehicleType: React.FC<VehicleTypeInterface> = (
    {
        cameraOverviewPart,
        cameraOverview,
        coordinates,
        img,
        type

    }) => {

    return (
        <>
            {
                cameraOverviewPart.map((item, index) =>
                    <>
                        <CameraOverview
                            name={item}
                            coordinates={cameraOverview[item as keyof typeof cameraOverview]}
                        />
                        <PlusOutlined className={`focus${index+1}`+`${type.slice(0,1)}`}/>
                    </>
                )
            }
            <PlusOutlined className={type === 'lvenok' ? "focus4l" : "focus6v"}/>
            <div className="main-block__img">
                <Image src={img}/>
                <ButtonCameras
                    btnTitle={camerasTitle(store.data.config.cameras.length)}
                    coordinatesShow={coordinates}/>
            </div>
        </>
    )
}

export default VehicleType
