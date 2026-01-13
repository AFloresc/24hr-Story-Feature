import { useEffect, useState, useCallback } from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import ProgressBars from "./ProgressBars";
import { useStories } from "../context/StoriesProvider";

export default function StoryViewer({ stories, initialIndex = 0, onClose }) {
    const [index, setIndex] = useState(initialIndex);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const { markAsSeen } = useStories();

    // 🔥 Responsive fix: re-render viewer on viewport resize
    const [viewportKey, setViewportKey] = useState(0);

    useEffect(() => {
        const handleResize = () => setViewportKey((k) => k + 1);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const duration = 3000; // 3 seconds per story

    // 🔥 Mark story as seen — FIX: only depends on index
    useEffect(() => {
        markAsSeen(stories[index].id);
    }, [index]); // ← evita el bucle infinito

    // Autoplay logic
    useEffect(() => {
        if (isPaused) return;

        setProgress(0);
        const start = performance.now();

        const tick = (now) => {
        if (isPaused) return;

        const elapsed = now - start;
        const p = Math.min(elapsed / duration, 1);
        setProgress(p);

        if (p < 1) {
            requestAnimationFrame(tick);
        } else {
            goNext();
        }
        };

        const id = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(id);
    }, [index, isPaused]);

    const goNext = useCallback(() => {
        if (index < stories.length - 1) {
        setIndex((i) => i + 1);
        } else {
        onClose();
        }
    }, [index, stories.length, onClose]);

    const goPrev = useCallback(() => {
        if (index > 0) {
        setIndex((i) => i - 1);
        }
    }, [index]);

    // Swipe gestures
    const handlers = useSwipeable({
        onSwipedLeft: goNext,
        onSwipedRight: goPrev,
        trackMouse: true
    });

    return (
        <motion.div
        key={viewportKey} // 🔥 Responsive re-render
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={{ position: "fixed", inset: 0 }}
        >
        <Box
            key={viewportKey}
            {...handlers}
            sx={{
            width: "100vw",
            height: "100vh",
            position: "fixed",
            inset: 0,
            bgcolor: "black",
            display: "flex",
            flexDirection: "column",
            zIndex: 2000,
            touchAction: "none"
            }}
            onPointerDown={() => setIsPaused(true)}
            onPointerUp={() => setIsPaused(false)}
        >
            {/* Close button */}
            <IconButton
            onClick={onClose}
            sx={{
                position: "absolute",
                top: 12,
                right: 12,
                color: "white",
                zIndex: 10
            }}
            >
            <CloseIcon />
            </IconButton>

            {/* Progress bars */}
            <ProgressBars
            count={stories.length}
            activeIndex={index}
            progress={progress}
            />

            {/* Story content */}
            <Box
            sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden"
            }}
            >
            <AnimatePresence mode="wait">
                <motion.img
                key={stories[index].id}
                src={stories[index].imageData}
                initial={{ opacity: 0, scale: 0.97, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.97, x: -40 }}
                transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1]
                }}
                drag="x"
                dragElastic={0.15}
                onDragEnd={(e, info) => {
                    if (info.offset.x < -80) goNext();
                    if (info.offset.x > 80) goPrev();
                }}
                style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    userSelect: "none"
                }}
                />
            </AnimatePresence>
            </Box>
        </Box>
        </motion.div>
    );
}