import React from 'react';
import { observer } from "mobx-react-lite";
import { Button, Tooltip } from "antd";
import store from "store";
import './mainBlock.scss'

interface BtnCamerasInterface {
    btnTitle: buttonItem[]
    coordinatesShow: boolean
}

interface buttonItem {
    key: string
    title: number[]
}

const ButtonCameras: React.FC<BtnCamerasInterface> = ({btnTitle, coordinatesShow}) => {
    const handelCameraChange = ( index: number ) => {
        store.data.setSwitchSetupBlock(false)
        store.data.setCameraNumber(index)
    };

    return(
        <div className="cameraBtn">
            {
                btnTitle.map((item, index) =>
                    <div key={item.key}>
                        <Tooltip title={"X="+ item.title[0] + " Y=" + item.title[1] + " Z=" + item.title[2]}
                                 visible={coordinatesShow}
                        >
                            <Button
                                id={item.key}
                                type={store.data.cameraNumber === index ? "primary" : "default"}
                                shape="circle"
                                value={index}
                                onClick={() =>handelCameraChange(index)}
                            >
                                {index+1}
                            </Button>
                        </Tooltip>
                    </div>
                )
            }
        </div>
    )
}

export default observer(ButtonCameras)
