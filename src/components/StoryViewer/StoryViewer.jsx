import { useEffect, useState, useCallback } from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import ProgressBars from "./ProgressBars";

export default function StoryViewer({ stories, initialIndex = 0, onClose }) {
    const [index, setIndex] = useState(initialIndex);
    const [progress, setProgress] = useState(0); // 0 → 1
    const duration = 3000; // 3 seconds per story

    // Autoplay
    useEffect(() => {
        setProgress(0);
        const start = performance.now();

        const tick = (now) => {
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
    }, [index]);

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
        <Box
        {...handlers}
        sx={{
            position: "fixed",
            inset: 0,
            bgcolor: "black",
            display: "flex",
            flexDirection: "column",
            zIndex: 2000
        }}
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
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.25 }}
                style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain"
                }}
            />
            </AnimatePresence>
        </Box>
        </Box>
    );
}