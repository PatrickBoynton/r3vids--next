"use client"
import { Pause, PlayArrow } from "@mui/icons-material"
import { useVideoControlsStore } from "@/stores/videoControlsStore"
import { useVideoStore } from "@/stores/videoStore"
import { useEffect } from "react"
import { CurrentVideo, Video } from "@/types"

export const PlayPause = () => {
	const { isPlaying, setIsPlaying, setIsMuted } = useVideoControlsStore()
	const { currentVideo, testCall } = useVideoStore() as {
		randomVideo: Video
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

			// if (randomVideo !== null) {
			// 	if (currentTime !== undefined) {
			// 		randomVideo.videoStatus.currentPlayTime = currentTime
			// 		if (currentVideo === null) return
			//
			// 		currentVideo.videoStatus.currentPlayTime = currentTime
			// 		test(updatedVideo as Video)
			// 	}
			// }
		} else {
			vidRef.current?.addEventListener("play", () => {
				setIsPlaying(true)
			})
			await vidRef.current?.play()
		}
	}

	return (
		<button id="play-pause" onClick={handleClick} className="mr-3">
			{!isPlaying && isPaused ? <PlayArrow /> : <Pause />}
		</button>
	)
}
