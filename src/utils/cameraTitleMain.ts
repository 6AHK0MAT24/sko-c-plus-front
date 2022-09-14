import store from "store";

const Vitaz = ["camera1v", "camera2v", "camera3v", "camera4v", "camera5v", "camera6v"]
const Lvenok = ["camera1l", "camera2l", "camera3l", "camera4l"]

export const camerasTitle = (count: number) => {
    const Cameras: { key: string; title: number[]; }[] = []
    if (count === 4) {
        Lvenok.map((item, index) =>
            Cameras.push({
                key: item,
                title: store.data.config.cameras[index].position
            })
        )
    } else if (count === 6) {
        Vitaz.map((item, index) =>
            Cameras.push({
                key: item,
                title: store.data.config.cameras[index].position
            })
        )
    }

    return Cameras
}
