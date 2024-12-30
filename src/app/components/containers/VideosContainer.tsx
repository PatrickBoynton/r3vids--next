"use client"
import { useVideoStore } from "@/stores/videoStore"
import { Video } from "@/types"
import {
	convertDuration,
	handleClick,
} from "@/app/components/containers/sharedFunctions"

type Props = {
	type: string
}

export const VideosContainer = ({ type }: Props) => {
	const { videos, playedVideos } = useVideoStore()

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

	return (
		<div
			className={`${type}-container ${type === "played" ? "flex overflow-y-auto  " : " overflow-auto  max-h-[80vh]"}`}>
			{sortedVideos().map((video: Video) => (
				<div
					className="videos"
					key={video.id}
					onClick={() => handleClick(video)}>
					<div className={`${type}-container w-fit cursor-pointer`}>
						<div className="source border-2 m-2 p-2 rounded">
							<h3 className="border-2 p-1 rounded">
								{video.title}
							</h3>
							<p>Play Count - {video.videoStatus.playCount}</p>
							<p>
								Selection Count -{" "}
								{video.videoStatus.selectionCount}
							</p>
							<p>{convertDuration(video.duration)}</p>
							<p>{video.url}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
