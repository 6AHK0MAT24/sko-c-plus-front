import React, { useEffect, useState, PointerEvent } from "react";

interface DragMoveInterface {
    onDragMove: (value: PointerEvent) => void,
    children: React.ReactNode,
}

const DragMove: React.FC<DragMoveInterface> = ({onDragMove, children,}) => {
    const [isDragging, setIsDragging] = useState(false);

    const handlePointerDown = () => {
        setIsDragging(true);
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
        if (isDragging) onDragMove(e);
    };

    useEffect(() => {
        window.addEventListener("pointerup", handlePointerUp);

        return () => {
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, []);

    return (
        <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
        >
            {children}
        </div>
    );
}

export default DragMove
