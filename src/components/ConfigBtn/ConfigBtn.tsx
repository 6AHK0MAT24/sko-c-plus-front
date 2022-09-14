import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, notification } from "antd";
import ConfigJson from "mockJsonConfig/config_tram30.json";
import LabelBold from 'assets/fonts/LableBold';
import LabelMedium from "assets/fonts/LableMedium";
import { urlServer } from "utils/constants";
import './configBtn.scss'
import store from "store";

const ConfigBtn: React.FC = () => {
    const [visible, setVisible] = useState(false);

    const deleteChanges = () => {
        store.data.setConfig()
        store.data.setChangeConfig(false)
    };

    const openNotification = () => {
        notification.success({
            message: "",
            description:
                'Изменения успешно сохранены',
        });
    };

    const saveNewConfig = () => {
        store.data.setChangeConfig(false)
        axios.post(urlServer, store.data.config)
            .then(response => {
                console.log('работает');
            });
        openNotification()
    }

    const downloadConfig = () => {
        if(store.data.isChangeConfig) {
            setVisible(true)
        } else {
            const fileData = JSON.stringify(ConfigJson);
            const blob = new Blob([fileData], {type: "text/plain"});
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = 'Config.json';
            link.href = url;
            link.click();
        }

    };

    const handleSaveConfigModale = () => {
        setVisible(false)
        saveNewConfig()
    };

    const handelDeleteChanges =() => {
        setVisible(false)
        deleteChanges()
    }

    const handleCancelModal = () => {
        setVisible(false)
    };


    return(
        <>
            <Modal
                visible={visible}
                onOk={handleSaveConfigModale}
                onCancel={handleCancelModal}
                footer={[
                    <Button key="submit" type="primary" onClick={handleSaveConfigModale}>
                        Соханить
                    </Button>,
                    <Button
                        key="back"
                        onClick={handelDeleteChanges}
                        danger type="primary"
                    >
                        Нет
                    </Button>
                ]}
            >
                <LabelBold
                    size={20}
                    label='У вас есть несохраненные изменения.'
                />
                <div>
                    <LabelMedium
                        size={15}
                        label='Сохранить их?'
                    />
                </div>
            </Modal>
            <div className="row-btn" >
                <div>
                    <Button> Загрузить конфиг</Button>
                    <Button
                        onClick={downloadConfig}
                    > Скачать конфиг</Button>
                    <Button
                        type="primary"
                        onClick={saveNewConfig}
                    >
                        Сохранить изменения
                    </Button>
                    <Button
                        danger type="primary"
                        onClick={deleteChanges}
                    >
                        Закрыть без сохранения
                    </Button>
                </div>
            </div>
        </>

    )
}

export default ConfigBtn
