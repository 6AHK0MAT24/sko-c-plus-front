import React from 'react';
import { observer } from "mobx-react-lite";
import { InputNumber } from "antd";
import 'antd/dist/antd.min.css';
import LabelMedium from 'assets/fonts/LableMedium';
import LabelBold from 'assets/fonts/LableBold';
import store from 'store'
import './setupBlock.scss'

interface InfProps {
    title: string
    data: dataProps[]
    value?: number[]
    valueAngle?: number
    valueROI?: Array<number[] | string[]>
    changeStore?: (index: number, center: string) => void
    changeStoreROI?: (indexArr: number, indexItem: number, e: string ) => void
}
interface dataProps {
    key: number,
    label: string,
}

const SetupDetails: React.FC<InfProps> = (
    {
        title,
        data,
        value,
        valueAngle,
        valueROI,
        changeStore,
        changeStoreROI
    }) => {

    const changeSetupInfo = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (changeStore) {
            changeStore(index, e.target.value)
        }
    };

    const changeSetupROI = (indexArr: number, indexItem: number, e: React.ChangeEvent<HTMLInputElement> ) => {
        if (changeStoreROI) {
            changeStoreROI(indexArr, indexItem, e.target.value)
        }
    };


    return(
        <div className="setup-block__info">
            <LabelBold
                label={title}
            />
            {
                valueROI ?
                    <div className="setup-details__roi">
                        {
                            valueROI?.map((itemValue, indexArr) =>
                                <div className="setup-details__block" key={Math.random()}>
                                    <LabelMedium className="setup-details__roi" label={indexArr+1}/>
                                    {
                                        data?.map((item, indexItem) =>
                                            <div key={item.key}>
                                                <LabelMedium className="setup-details__label__roi" label={item.label}/>
                                                {
                                                    store.data.switchSetupBlock ?
                                                        <InputNumber
                                                            size="small"
                                                            defaultValue={itemValue[indexItem]}
                                                            step={0.01}
                                                            max={20}
                                                            min={-20}
                                                            onBlur={value => changeSetupROI(indexArr, indexItem, value)}
                                                        />
                                                        :
                                                        <LabelBold label={ itemValue[indexItem]}/>
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                    :
                    <div className="setup-details">
                        {
                            data?.map((item, index) =>
                                <div className="setup-details__block" key={item.key}>
                                    <LabelMedium className="setup-details__label" label={item.label}/>
                                    {
                                        store.data.switchSetupBlock ?
                                            <InputNumber
                                                size="small"
                                                defaultValue={valueAngle? valueAngle : value? value[index] : 0}
                                                step="0.01"
                                                stringMode
                                                onBlur={ value => changeSetupInfo(index, value)}
                                            />
                                            :
                                            <LabelBold label={ valueAngle? valueAngle : value? value[index] : 0 }/>
                                    }
                                </div>
                            )
                        }
                    </div>
            }
        </div>
    )
}

export default observer(SetupDetails)
