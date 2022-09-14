import { makeAutoObservable } from "mobx";
import { Config } from "type/config";
import ConfigJson from "mockJsonConfig/config_tram30.json";
import { halfAxleLength } from "utils/constants"

interface PointInterface {
    left: boolean,
    right: boolean,
    up: boolean,
    down: boolean
}

export default class Data {
    switchSetupBlock = false
    cameraNumber = 0
    config: Config
    isChangeConfig = false
    point = 0
    isBlockArrow: Array<PointInterface[]> = []


    constructor() {
        makeAutoObservable(this)
        this.config = ConfigJson
        const arrow = {
            left: false,
            right: false,
            up: false,
            down: false
        }
        this.config.cameras.map((item) => {
            const cam: PointInterface[] = []
            item.roi.map(() => cam.push(arrow))
            this.isBlockArrow?.push(cam)
        }
        )
    }

    setConfig() {
        this.config = ConfigJson
    }

    setChangeConfig(data: boolean) {
        this.isChangeConfig = data
    }

    setConfigPosition(index: number, data: number) {
        this.isChangeConfig = true
        this.config.cameras[this.cameraNumber].position[index] = data
    }

    setConfigCenter(index: number, data: number) {
        this.isChangeConfig = true
        this.config.cameras[this.cameraNumber].center[index] = data
    }

    setConfigAngle(data: number) {
        this.isChangeConfig = true
        this.config.cameras[this.cameraNumber].angle = data
    }

    setConfigCalib(index: number, data: number) {
        this.isChangeConfig = true
        this.config.cameras[this.cameraNumber].calib[index] = data
    }

    setConfigROI(indexArr: number, indexItem: number, data: number) {
        this.isChangeConfig = true
        let configData = Number(data.toFixed(2))
        const point = this.isBlockArrow[this.cameraNumber][indexArr]
        if (data >= halfAxleLength.meters) {
            indexItem === 0 ? point.left = true
                : point.up = true
            configData = Number(halfAxleLength.meters)
        } else if (data <= -halfAxleLength.meters) {
            indexItem === 0 ? point.right = true
                : point.down = true
            configData = Number(-halfAxleLength.meters)
        } else {
            data > 0 ?
                (indexItem === 0 ? point.left = false
                    : point.up = false)
                : (indexItem === 0 ? point.right = false
                    : point.down = false)
        }
        this.config.cameras[this.cameraNumber].roi[indexArr][indexItem] = configData
    }

    setSwitchSetupBlock(data: boolean) {
        this.switchSetupBlock = data
    }

    setCameraNumber(data: number) {
        this.cameraNumber = data
    }
}
