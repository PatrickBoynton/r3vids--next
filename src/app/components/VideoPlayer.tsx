"use client"
import agent from "@/agent"
import { ControlButtons } from "@/app/components/ControlButtons"
import { LengthSelect } from "@/app/components/LengthSelect"
import { useVideoControlsStore } from "@/stores/videoControlsStore"
import { useVideoStore } from "@/stores/videoStore"
import { Video } from "@/types"
import { useEffect, useRef } from "react"

export const VideoPlayer = () => {
	const {
		setRandomVideo,
		video,
		currentVideo,
		setCurrentVideo,
		setVideos,
		createVideoNavigation,
	} = useVideoStore()
	const { setVidRef, vidRef, isFullScreen } = useVideoControlsStore()
	const videoRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		// If there is no current video set it. This is for keeping the video list state up to date. DO NOT CHANGE.
		const setVids = async () => {
			if (!currentVideo) {
				setCurrentVideo()

				// setVideos()
			} else {
				setVideos()
			}
		}
		setVids()
	}, [currentVideo, setRandomVideo, setVideos, setCurrentVideo, video])

	useEffect(() => {
		setVidRef(videoRef)
	}, [vidRef, setVidRef])

	useEffect(() => {
		const getNavigation = async () => {
			const nav = await agent.VideoNavigation.get()
			if (video !== null && nav === null)
				createVideoNavigation(video as Video)
		}
		getNavigation()
	}, [createVideoNavigation, video])


	vidRef.current?.addEventListener("loadedmetadata", () => {
		if (vidRef.current)
			vidRef.current.currentTime =
				(video?.videoStatus.currentPlayTime as number) ||
				(currentVideo as Video)?.videoStatus.currentPlayTime
	})

	return (
		<div>
			<h1 className="text-5xl  border-t-2">
				{video?.title || (currentVideo as Video)?.title}
			</h1>
			<video
				controls={isFullScreen ? true : false}
				className="w-full"
				ref={videoRef}
				key={video?.url || (currentVideo as Video)?.url}
				src={video?.url || (currentVideo as Video)?.url}></video>
			<div className="p-2">
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
