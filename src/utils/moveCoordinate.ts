import { pxInM, halfAxleLength } from "utils/constants"

export const moveOY = (corY: number) => {
    if (corY > 0) {
        return (halfAxleLength.pixelOY - corY * pxInM.oy)
    } else {
        return (halfAxleLength.pixelOY + Math.abs(corY) * pxInM.oy)
    }
}

export const moveOX =  (corX: number) => {
    if (corX > 0) {
        return (halfAxleLength.pixelOX - corX  * pxInM.ox)
    } else {
        return (halfAxleLength.pixelOX + Math.abs(corX) * pxInM.ox)
    }
}

