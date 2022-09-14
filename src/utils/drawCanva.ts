import { moveOX, moveOY } from "./moveCoordinate";
import { halfButtonLength } from "utils/constants"
import store from "store";

export const drawCanva = () => {
    const canvas = document.getElementById('cnvs') as HTMLCanvasElement | null;
    if (canvas) {
        const ctx = canvas?.getContext('2d');
        if (ctx) {
            ctx.beginPath()
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = 'white'
            ctx.lineWidth = 2;
            store.data.config.cameras[store.data.cameraNumber].roi.map((item,index) => {
                const X = moveOX(item[0])
                const Y = moveOY(item[1])
                if (index === 0) {
                    ctx.moveTo(X+halfButtonLength, Y+halfButtonLength);
                } else {
                    ctx.lineTo(X+halfButtonLength, Y+halfButtonLength);
                }
            })
            ctx.closePath();
            ctx.stroke();
        }
    }
}
