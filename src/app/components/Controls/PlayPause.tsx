"use client"
import { Pause, PlayArrow } from "@mui/icons-material"
import { useVideoControlsStore } from "@/stores/videoControlsStore"
import { useVideoStore } from "@/stores/videoStore"
import { useState } from "react"

export const PlayPause = () => {
	const { isPlaying, setIsPlaying } = useVideoControlsStore()
	const [hasStopped, setHasStopped] = useState(false)
	const { updateVideo, randomVideo } = useVideoStore()
	const { vidRef } = useVideoControlsStore()

	const handleClick = async () => {
		setIsPlaying(!isPlaying)
		const currentTime = vidRef?.current?.currentTime

		if (isPlaying) {
			vidRef.current?.pause()
			if (randomVideo !== null) {
				if (currentTime !== undefined) {
					randomVideo.videoStatus.currentPlayTime = currentTime
					updateVideo(randomVideo)
				}
			}
		} else {
			await vidRef.current?.play()
			setIsPlaying(!isPlaying)
		}
	}

	return (
		<button id="play-pause" onClick={handleClick}>
			{!hasStopped && !isPlaying ? <PlayArrow /> : <Pause />}
		</button>
	)
}
