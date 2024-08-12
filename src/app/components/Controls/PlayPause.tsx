"use client"
import { Pause, PlayArrow } from "@mui/icons-material"
import { useVideoControlsStore } from "@/stores/videoControlsStore"
import { useVideoStore } from "@/stores/videoStore"
import { useEffect } from "react"
import { Video } from "@/types"

export const PlayPause = () => {
	const { isPlaying, setIsPlaying, setIsMuted } = useVideoControlsStore()
	const {
		updateVideo,
		randomVideo,
		setCurrentPlayTime,
		currentPlayTime,
		currentVideo,
	} = useVideoStore()
	const { vidRef } = useVideoControlsStore()
	const isPaused = vidRef?.current?.paused

	useEffect(() => {
		setIsMuted(false)
	}, [setIsMuted])

	const handleClick = async () => {
		setIsPlaying(!isPlaying)

		if (!vidRef.current) return

		const currentTime = vidRef?.current?.currentTime

		if (isPlaying && !vidRef.current?.paused) {
			vidRef.current?.addEventListener("pause", () => {
				setIsPlaying(false)

				setCurrentPlayTime(currentTime as number)

				updateVideo(currentVideo as Video)
			})
			vidRef.current.addEventListener("webkitendfullscreen", () => {
				setIsPlaying(false)
			})
			vidRef.current?.pause()

			if (randomVideo !== null) {
				if (currentTime !== undefined) {
					randomVideo.videoStatus.currentPlayTime = currentTime
					updateVideo(randomVideo)
				}
			}
		} else {
			vidRef.current?.addEventListener("play", () => {
				setIsPlaying(true)
			})
			await vidRef.current?.play()
		}
	}

	return (
		<button id="play-pause" onClick={handleClick}>
			{!isPlaying && isPaused ? <PlayArrow /> : <Pause />}
		</button>
	)
}
