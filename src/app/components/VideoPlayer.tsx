"use client"
import { ControlButtons } from "@/app/components/ControlButtons"
import { LengthSelect } from "@/app/components/LengthSelect"
import { useEffect, useRef } from "react"
import { useVideoStore } from "@/stores/videoStore"
import { useVideoControlsStore } from "@/stores/videoControlsStore"

export const VideoPlayer = () => {
	const { setRandomVideo, src, title, currentVideo, setVideos } =
		useVideoStore()
	const { setVidRef } = useVideoControlsStore()
	const videoRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		if (currentVideo === null) {
			setRandomVideo()
		}
		setVidRef(videoRef)
	}, [currentVideo, videoRef, setRandomVideo, setVidRef])
	return (
		<div className="video-container">
			<h1>{title}</h1>
			<video
				// controls
				ref={videoRef}
				key={src}
				src={src}></video>
			<div className="video">
				<ControlButtons />
			</div>
			<div className="filter">
				<label htmlFor="length">Length:</label>
				<LengthSelect />
			</div>
		</div>
	)
}

export default VideoPlayer
