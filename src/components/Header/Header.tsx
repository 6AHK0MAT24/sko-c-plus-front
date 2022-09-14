import React from 'react';
import { observer } from "mobx-react-lite";
import { Radio, RadioChangeEvent, Select } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import { optionsInfo, optionsVehicles } from "MockData/MockData";
import ConfigBtn from "components/ConfigBtn/ConfigBtn";
import LabelBold from 'assets/fonts/LableBold';
import LabelMedium from 'assets/fonts/LableMedium';
import InfoCommon from './InfoCommon';
import './header.scss'
import store from 'store'

const sameIP = 'Rtsp://192.168.001.002:554/camera1'
const samePort = '554'

const Header : React.FC = () => {

    const handelCameraChange = ({ target: { value } } : RadioChangeEvent) => {
        store.data.setSwitchSetupBlock(false)
        store.data.setCameraNumber(value)
        store.data.point = 0
    };

    const getOptionsRadioGroup = () => {
        const optionsRadioGroup = []
        for (let i = 1; i <= store.data.config.cameras.length; i++){
            optionsRadioGroup.push({
                key: i,
                label: `Камера ${i}`,
                value: i-1,
            })
        }
        return (optionsRadioGroup)
    }

    return (
        <>
            <div className="header__title">
                <LabelBold
                    size={32}
                    label="Система кругового обзора"
                />
                <div className="header__info">
                    {
                        optionsInfo.map((item) =>
                            <InfoCommon
                                key={item.key}
                                label={item.label}
                                value={item.value}
                            />
                        )
                    }
                </div>
            </div>
            <div className="header__port">
                <Select
                    showSearch
                    style={{ width: 200 }}
                    options={optionsVehicles}
                    placeholder="Выберите ТС"
                    optionFilterProp="label"
                    filterOption={(input, option) => (option!.label as unknown as string).includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA!.label as unknown as string)
                            .toUpperCase()
                            .localeCompare((optionB!.label as unknown as string).toUpperCase())
                    }
                >
                </Select>
                <div className="header__text">
                    <MinusOutlined />
                    <LabelMedium
                        className="header__text__or"
                        label="или"/>
                    <MinusOutlined />
                </div>
                <div className="header__blue-box">
                    <LabelMedium label="IP:"/>
                    <LabelMedium
                        className="header__text_ip"
                        label={sameIP}
                    />
                    <LabelMedium label="Порт:"/>
                    <LabelMedium
                        className="header__text_ip"
                        label={samePort}
                    />
                </div>
            </div>
            <div className="header__btn">
                {/*85 - ширина 1 кнопки, 2 - две границы*/}
                <div className="header__radio-group" style={{width: 85*store.data.config.cameras.length+2}}>
                    <Radio.Group
                        options={getOptionsRadioGroup()}
                        onChange={handelCameraChange}
                        value={store.data.cameraNumber}
                        optionType="button"
                        buttonStyle="solid"
                    />
                </div>
                <ConfigBtn></ConfigBtn>
            </div>
        </>
    );
};

export default observer(Header);
