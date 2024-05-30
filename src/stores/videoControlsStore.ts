import { create } from "zustand"
import { createRef, RefObject } from "react"

type VideoControlsStore = {
	isPlaying: boolean
	isMuted: boolean
	isFullScreen: boolean
	vidRef: RefObject<HTMLVideoElement>
	setIsPlaying: (isPlaying: boolean) => void
	setIsMuted: (isMuted: boolean) => void
	setIsFullScreen: (isFullScreen: boolean) => void
	setVidRef: (vidRef: RefObject<HTMLVideoElement>) => void
}

export const useVideoControlsStore = create<VideoControlsStore>(set => ({
	isPlaying: false,
	isMuted: false,
	isFullScreen: false,
	query: "",
	vidRef: createRef<HTMLVideoElement>(),
	setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
	setIsMuted: (isMuted: boolean) => set({ isMuted }),
	setIsFullScreen: (isFullScreen: boolean) => set({ isFullScreen }),
	setVidRef: (vidRef: RefObject<HTMLVideoElement>) => set({ vidRef }),
}))
