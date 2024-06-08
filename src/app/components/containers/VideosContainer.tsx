"use client"
import { useVideoStore } from "@/stores/videoStore"
import { Video } from "@/types"
import {
	convertDuration,
	handleClick,
} from "@/app/components/containers/sharedFunctions"
import { useEffect } from "react"

type Props = {
	type: string
}

export const VideosContainer = ({ type }: Props) => {
	const { videos, setPlayedVideos, playedVideos, randomVideo, setVideos } =
		useVideoStore()

	const whatType = type === "played" ? playedVideos : videos

	const sortedVideos = () =>
		whatType.sort((a, b) => {
			if (type === "videos") {
				return b.videoStatus.playCount - a.videoStatus.playCount
			} else {
				const timeA = new Date(a.videoStatus.lastPlayed).getTime()
				const timeB = new Date(b.videoStatus.lastPlayed).getTime()
				return timeB - timeA
			}
		})

	useEffect(() => {
		setPlayedVideos()
	}, [setPlayedVideos, randomVideo])

	return (
		<div className={`${type}-container`}>
			{sortedVideos().map((video: Video) => (
				<div
					className="videos"
					key={video.id}
					onClick={() => handleClick(video)}>
					<div className={`${type}-container`}>
						<div className="source">
							<h3>{video.title}</h3>
							<p>{video.videoStatus.playCount}</p>
							<p>{convertDuration(video.duration)}</p>
							<p>{video.url}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
