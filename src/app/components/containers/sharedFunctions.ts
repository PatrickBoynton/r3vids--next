import { Video } from "@/types"

export const handleClick = (
	video: Video,
	setSrc: (src: string) => void,
	setTitle: (title: string) => void,
	updateVideo: (video: Video) => void,
	setVideos: () => void
) => {
	setSrc(video.url)
	setTitle(video.title)

	video.videoStatus.playCount++
	video.videoStatus.lastPlayed = new Date().toISOString()
	video.videoStatus.played = true

	updateVideo(video)
	setVideos()
	const currentVideo = JSON.parse(
		localStorage.getItem("currentVideo") as string
	)

	if (currentVideo) {
		localStorage.setItem("currentVideo", JSON.stringify(video))
	} else {
		localStorage.removeItem("currentVideo")
	}
}

export const convertDuration = (duration: number) => {
	const minutes = Math.floor(duration / 60)
	const seconds = duration - minutes * 60
	return `${minutes}:${seconds.toFixed(0)}`
}
