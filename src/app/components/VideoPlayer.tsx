"use client"
import { ControlButtons } from "@/app/components/ControlButtons"
import { LengthSelect } from "@/app/components/LengthSelect"
import { useEffect, useRef } from "react"
import { useVideoStore } from "@/stores/videoStore"
import { useVideoControlsStore } from "@/stores/videoControlsStore"
import { Video } from "@/types"
import agent from "@/agent"

export const VideoPlayer = () => {
	const {
		setRandomVideo,
		url,
		title,
		currentVideo,
		setCurrentVideo,
		randomVideo,
		setVideos,
		currentPlayTime,
		createVideoNavigation,
	} = useVideoStore()
	const { setVidRef, vidRef } = useVideoControlsStore()
	const videoRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		// If there is no current video set it. This is for keeping the video list state up to date. DO NOT CHANGE.
		const setVids = async () => {
			if (!currentVideo) {
				setCurrentVideo()

				setVideos()
			} else {
				setVideos()
			}
		}
		setVids()
	}, [currentVideo, setRandomVideo, setVideos, setCurrentVideo, randomVideo])

	useEffect(() => {
		setVidRef(videoRef)
	}, [vidRef, setVidRef])

	useEffect(() => {
		const getNavigation = async () => {
			const nav = await agent.VideoNavigation.get()
			if (randomVideo !== null && nav === null)
				createVideoNavigation(randomVideo as Video)
		}
		getNavigation()
	}, [randomVideo])

	// useEffect(() => {
	// 	createVideoNavigation(randomVideo as Video)
	// }, [randomVideo, createVideoNavigation])

	vidRef.current?.addEventListener("loadedmetadata", () => {
		if (vidRef.current) vidRef.current.currentTime = currentPlayTime
	})
	return (
		<div>
			<h1 className="text-5xl  border-t-2">{title}</h1>
			<video
				className="w-full"
				ref={videoRef}
				key={url}
				controls
				src={url}></video>
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
