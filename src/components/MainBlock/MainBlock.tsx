import React, { useState } from 'react';
import { observer } from "mobx-react-lite";
import { Button, Modal } from "antd";
import { CameraOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import lvenok from "images/bg_lvenok.png"
import vitaz from "images/bg_vitaz.png"
import LabelBold from "assets/fonts/LableBold";
import LabelMedium from "assets/fonts/LableMedium";
import VehicleType from "./VehicleType";
import './mainBlock.scss'
import store from "store";


const cameraOverviewPartV = ["rightMustache", "leftMustache", "frame", "topCanvas", "bottomCanvas"]
const cameraOverviewPartL = ["rightMustache", "leftMustache", "frame"]

const cameraOverviewV = {
    rightMustache: [[150, 0], [255, 350], [255, 450], [150, 794]],
    leftMustache: [[1290, 0], [1190, 350], [1190, 450], [1290, 794]],
    frame: [[255, 350], [1190, 350], [1190, 450], [255, 450]],
    topCanvas: [[722.5, 350], [722.5, 0]],
    bottomCanvas: [[722.5, 450], [722.5, 794]]
}

const cameraOverviewL = {
    rightMustache: [[150, 0], [365, 350], [365, 450], [150, 794]],
    leftMustache: [[1290, 0], [1080, 350], [1080, 450], [1290, 794]],
    frame: [[365, 350], [1080, 350], [1080, 450], [365, 450]]
}

const MainBlock: React.FC = () => {
    const [coordinates, setCoordinates] = useState<boolean>(false);
    const [showModal, setShowModal] = useState(true);

    const handleShowCoor = () => {
        setCoordinates(!coordinates);
    };

    const loadConfig = () => {

    }

    return(
        <div className="main-block">
            <div className="main-block__btn">
                <Button
                    icon={coordinates ? <EyeOutlined />  :<EyeInvisibleOutlined />}
                    onClick={handleShowCoor}
                >
                    Координаты всех камер
                </Button>
                <Button icon={<CameraOutlined />}> Скриншот</Button>
            </div>

            <>
                {store.data.config.cameras.length === 4 ?
                    <VehicleType
                        cameraOverviewPart={cameraOverviewPartL}
                        cameraOverview={cameraOverviewL}
                        coordinates={coordinates}
                        img={lvenok}
                        type="lvenok"
                    />
                    : store.data.config.cameras.length === 6 ?
                        <VehicleType
                            cameraOverviewPart={cameraOverviewPartV}
                            cameraOverview={cameraOverviewV}
                            coordinates={coordinates}
                            img={vitaz}
                            type="vitaz"
                        />
                        :
                        <Modal
                            visible={showModal}
                            onCancel={() => setShowModal(false)}
                            footer={[
                                <Button
                                    key="submit"
                                    type="primary"
                                    onClick={loadConfig}
                                >
                                    Загрузить конфиг
                                </Button>,
                                <Button
                                    key="back"
                                    onClick={() => setShowModal(false)}
                                >
                                    Закрыть
                                </Button>
                            ]}
                        >
                            <LabelBold
                                size={20}
                                label='Неверный кофигурационный файл'
                            />
                            <div>
                                <LabelMedium
                                    size={15}
                                    label='Загрузите корректный конфиг или выберете другое транспортное средство'
                                />
                            </div>
                        </Modal>
                }
            </>
        </div>
    )
}

export default observer(MainBlock)
