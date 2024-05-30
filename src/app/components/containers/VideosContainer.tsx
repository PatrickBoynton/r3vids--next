"use client"
import { useVideoStore } from "@/stores/videoStore"
import { Video } from "@/types"
import {
	convertDuration,
	handleClick,
} from "@/app/components/containers/sharedFunctions"
import AlarmAddIcon from "@mui/icons-material/AlarmAdd"
import { useEffect } from "react"

type Props = {
	type: string
}

export const VideosContainer = ({ type }: Props) => {
	const {
		videos,
		setVideos,
		setPlayedVideos,
		setSrc,
		setTitle,
		updateVideo,
		playedVideos,
	} = useVideoStore()

	const whatType = type === "played" ? playedVideos : videos

	useEffect(() => {
		setPlayedVideos()
	}, [setPlayedVideos, videos])

	return (
		<div className={`${type}-container`}>
			{whatType
				.sort((a, b) => {
					if (type === "videos") {
						return b.videoStatus.playCount - a.videoStatus.playCount
					} else {
						const timeA = new Date(
							a.videoStatus.lastPlayed
						).getTime()
						const timeB = new Date(
							b.videoStatus.lastPlayed
						).getTime()
						return timeB - timeA
					}
				})
				.map((video: Video) => (
					<div
						className="videos"
						key={video.id}
						onClick={() =>
							handleClick(
								video,
								setSrc,
								setTitle,
								updateVideo,
								setVideos
							)
						}>
						<div className={`${type}-container`}>
							<div className="source">
								<h3>{video.title}</h3>
								<p>{video.videoStatus.playCount}</p>
								<p>{convertDuration(video.duration)}</p>
								<p>{video.url}</p>
							</div>
							<button id="watch-later">
								<AlarmAddIcon />
							</button>
						</div>
					</div>
				))}
		</div>
	)
}
