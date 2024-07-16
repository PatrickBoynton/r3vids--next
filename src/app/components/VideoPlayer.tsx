"use client"
import { ControlButtons } from "@/app/components/ControlButtons"
import { LengthSelect } from "@/app/components/LengthSelect"
import { useEffect, useRef } from "react"
import { useVideoStore } from "@/stores/videoStore"
import { useVideoControlsStore } from "@/stores/videoControlsStore"
import agent from "@/agent"
import { Video } from "@/types"

export const VideoPlayer = () => {
	const {
		setRandomVideo,
		url,
		title,
		currentVideo,
		setCurrentVideo,
		randomVideo,
		setVideos,
	} = useVideoStore()
	const { setVidRef, vidRef, setIsPlaying } = useVideoControlsStore()
	const videoRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		const fetch = async () => {
			return await agent.VideoNavigation.get()
		}

		if (!currentVideo) {
			fetch().finally(() => setCurrentVideo())
		} else {
			setVideos()
		}
	}, [currentVideo, setRandomVideo, setVideos, setCurrentVideo, randomVideo])

	useEffect(() => {
		setVidRef(videoRef)
	}, [vidRef, setVidRef])

	useEffect(() => {
		const getNavigation = async () => {
			const nav = await agent.VideoNavigation.get()
			if (randomVideo !== null && nav === null)
				await agent.VideoNavigation.create(randomVideo as Video)
		}
		getNavigation()
	}, [randomVideo])

	return (
		<div>
			<h1 className="text-5xl  border-t-2">{title}</h1>
			<video
				className="w-full"
				ref={videoRef}
				key={url}
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
	3
}

export default VideoPlayer
