"use client"
import { useVideoControlsStore } from "@/stores/videoControlsStore"
import { useVideoStore } from "@/stores/videoStore"
import { CurrentVideo } from "@/types"
import { Pause, PlayArrow } from "@mui/icons-material"
import { useEffect } from "react"

export const PlayPause = () => {
	const { isPlaying, setIsPlaying, setIsMuted } = useVideoControlsStore()
	let { currentVideo, testCall } = useVideoStore() as {
		currentVideo: CurrentVideo
		testCall: (video: any) => void
	}
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
			const updatedVideo = {
				...currentVideo,
				...currentVideo.currentVideo,
				videoStatus: {
					currentPlayTime: currentTime as number,
				},
			}
			vidRef.current?.addEventListener("pause", async () => {
				setIsPlaying(false)
				if (currentVideo === undefined) return
				updatedVideo.videoStatus.currentPlayTime = currentTime as number

				testCall(updatedVideo)
			})

			vidRef.current.addEventListener("webkitendfullscreen", () => {
				setIsPlaying(false)
			})
			vidRef.current?.pause()
			setIsPlaying(false)
		} else {
			await vidRef.current?.play()
			currentVideo.videoStatus.selectionCount++
			testCall(currentVideo)
		}
	}

	return (
		<button id="play-pause" onClick={handleClick} className="mr-3">
			{!isPlaying && isPaused ? <PlayArrow /> : <Pause />}
		</button>
	)
}
