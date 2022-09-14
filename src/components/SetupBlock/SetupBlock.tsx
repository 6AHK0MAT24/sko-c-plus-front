import React, { useState } from 'react';
import { observer } from "mobx-react-lite";
import { Button, Switch, Image } from "antd";
import {
    CameraOutlined,
    RotateLeftOutlined,
    RotateRightOutlined,
    PlusCircleOutlined,
    MinusCircleOutlined,
    ArrowLeftOutlined,
    ArrowUpOutlined,
    ArrowRightOutlined,
    ArrowDownOutlined
} from '@ant-design/icons';
import {
    cornerLabel,
    roiLabel,
    areaLabel,
    coordinatesLabel
} from 'MockData/MockData';
import SetupDetails from './SetupDetails';
import LabelBold from 'assets/fonts/LableBold';
import LabelMedium from 'assets/fonts/LableMedium';
import AreaSelection from "./AreaSelection";
import { halfAxleLength } from "utils/constants"
import setupCamera from 'images/setupCamera.png'
import './setupBlock.scss'
import store from 'store'

const SetupBlock: React.FC = () => {
    const [changePointCoord, setChangePointCoord] = useState<boolean>(false)

    const handelSwitch = () => {
        store.data.setSwitchSetupBlock(!store.data.switchSetupBlock)
    };
    const ChangePosition = (index: number, position: string) => {
        store.data.setConfigPosition(index, Number(position))
    }
    const ChangeCenter = (index: number, center: string) => {
        store.data.setConfigCenter(index, Number(center))
    }
    const ChangeAngle = (index: number, center: string) => {
        store.data.setConfigAngle(Number(center))
    }
    const ChangeCalib = (index: number, center: string) => {
        store.data.setConfigCalib(index, Number(center))
    }
    const ChangeROI = (indexArr: number, indexItem: number, roi: string) => {
        setChangePointCoord(!changePointCoord)
        if (Number(roi) <= halfAxleLength.meters && Number(roi) >= -halfAxleLength.meters) {
            store.data.setConfigROI(indexArr, indexItem, Number(roi))
        } else {
            if(Number(roi) >= halfAxleLength.meters) {
                store.data.setConfigROI(indexArr, indexItem, halfAxleLength.meters)

            } else {
                store.data.setConfigROI(indexArr, indexItem, -halfAxleLength.meters)
            }
        }
    }

    const handelArrow = (axis: number, value: number) => {
        setChangePointCoord(!changePointCoord)
        store.data.isChangeConfig = true
        if (store.data.config.cameras[store.data.cameraNumber].roi[store.data.point] === undefined) {
            store.data.point = 0
        }
        store.data.setConfigROI(
            store.data.point,
            axis,
            Number(store.data.config.cameras[store.data.cameraNumber].roi[store.data.point][axis] + value)
        )
    }

    return(
        <div className="setup-block">
            <div className="setup-block__camera">
                {
                    store.data.config.cameras[store.data.cameraNumber].roi.map((item,index) =>
                        <div key={Math.random()}>
                            <AreaSelection
                                change={changePointCoord}
                                pointNumber={index}
                            />
                        </div>
                    )
                }
                <Button className="bntCameraOutlined" icon={<CameraOutlined />} />
                <Image
                    src={setupCamera}
                />
            </div>
            <div className="setup-block__btnSwitch">
                <Switch
                    checked={store.data.switchSetupBlock}
                    checkedChildren="Применить"
                    unCheckedChildren="Изменить"
                    onChange={handelSwitch}
                />
            </div>

            <div className="setup-block__info">
                <div className="setup-block__label">
                    <div>
                        <LabelBold
                            className='lblPosition'
                            label="Настройка кадра"
                        />
                    </div>
                    <div>
                        <LabelMedium
                            className='lblPosition'
                            label="Scale: 1.5"
                        /></div>
                </div>
                <div className="action__frame">
                    <div className="setup-coord__frame">
                        <div className="setup-coord__leftBtn">
                            <Button
                                type="primary"
                                icon={<ArrowLeftOutlined />}
                                onClick={() => handelArrow(0, 1)}
                                disabled={store.data.isBlockArrow[store.data.cameraNumber][store.data.point].left}
                            />
                        </div>
                        <div className="setup-coord__upBtn">
                            <Button
                                type="primary"
                                icon={<ArrowUpOutlined />}
                                onClick={() => handelArrow(1, 1)}
                                disabled={store.data.isBlockArrow[store.data.cameraNumber][store.data.point].up}
                            />
                        </div>
                        <div className="setup-coord__rightBtn">
                            <Button
                                type="primary"
                                icon={<ArrowRightOutlined />}
                                onClick={() => handelArrow(0, -1)}
                                disabled={store.data.isBlockArrow[store.data.cameraNumber][store.data.point].right}
                            />
                        </div>
                        <div className="setup-coord__downBtn">
                            <Button
                                type="primary"
                                icon={<ArrowDownOutlined />}
                                onClick={() => handelArrow(1, -1)}
                                disabled={store.data.isBlockArrow[store.data.cameraNumber][store.data.point].down}
                            />
                        </div>

                    </div>
                    <div className="setup-details__frame">
                        <div className="setup-details__rotateBtn">
                            <Button type="primary" icon={<RotateLeftOutlined />}/>
                            <Button type="primary" icon={<RotateRightOutlined />}/>
                        </div>
                        <div className="setup-details__zoomBtn">
                            <Button type="primary" icon={<PlusCircleOutlined />}/>
                            <Button type="primary" icon={<MinusCircleOutlined />}/>
                        </div>

                    </div>
                </div>
            </div>
            <>
                <SetupDetails
                    title="Координаты камеры "
                    data={coordinatesLabel}
                    value={store.data.config?.cameras[store.data.cameraNumber].position}
                    changeStore={ChangePosition}
                />
                <SetupDetails
                    title="Отображаемая область "
                    data={areaLabel}
                    value={store.data.config?.cameras[store.data.cameraNumber].center}
                    changeStore={ChangeCenter}
                />
                <SetupDetails
                    title="ROI "
                    data={roiLabel}
                    valueROI={store.data.config?.cameras[store.data.cameraNumber].roi}
                    changeStoreROI={ChangeROI}
                />
                <SetupDetails
                    title="Угол наклона камеры: "
                    data={cornerLabel}
                    valueAngle={store.data.config?.cameras[store.data.cameraNumber].angle}
                    changeStore={ChangeAngle}
                />
                <SetupDetails
                    title="Калибровочные коэф. "
                    data={coordinatesLabel}
                    value={store.data.config?.cameras[store.data.cameraNumber].calib}
                    changeStore={ChangeCalib}
                />
            </>

        </div>
    )
}

export default observer(SetupBlock)
