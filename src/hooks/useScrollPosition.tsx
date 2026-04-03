"use client";
import { useState, useLayoutEffect } from "react";

type Pos = { x: number; y: number };

const getScrollPos = (): Pos => typeof window === "undefined" ? { x: 0, y: 0 }: {
    x: window.pageXOffset ?? window.scrollX ?? 0,
    y: window.pageYOffset ?? window.scrollY ?? 0,
};

const useScrollPosition = () => {
    const [pos, setPos] = useState<Pos>(getScrollPos);

    useLayoutEffect(() => {
        const onScroll = () => setPos(getScrollPos());

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return pos;
};

export default useScrollPosition;