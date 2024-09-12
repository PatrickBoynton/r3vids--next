"use client"
import { LengthSelect } from "@/app/components/LengthSelect"
import { useEffect, useRef } from "react"
import { useVideoStore } from "@/stores/videoStore"
import { useVideoControlsStore } from "@/stores/videoControlsStore"
import { Video } from "@/types"
import agent from "@/agent"
import { ControlButtons } from "@/app/components/ControlButtons"

export const VideoPlayer = () => {
	const {
		setRandomVideo,
		video,
		currentVideo,
		setCurrentVideo,
		setVideos,
		createVideoNavigation,
	} = useVideoStore()
	const { setVidRef, vidRef } = useVideoControlsStore()
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

	// useEffect(() => {
	// 	createVideoNavigation(randomVideo as Video)
	// }, [randomVideo, createVideoNavigation])

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
				className="w-full"
				ref={videoRef}
				key={video?.url || (currentVideo as Video)?.url}
				controls
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
