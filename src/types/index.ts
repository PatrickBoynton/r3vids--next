export type Video = {
	id: string
	title: string
	url: string
	image: string
	uploadDate: string
	duration: number
	videoStatus: VideoStatus
}
export type VideoStatus = {
	id: string
	played: boolean
	currentPlayTime: number
	playCount: number
	selectionCount: number
	isWatchLater: boolean
	lastPlayed: string
	video: Video | null
	videoId: string
}

export type VideoNavigation = {
	id: string
	currentVideo?: Video
	previousVideo?: Video
}

export type CurrentVideo = {
	currentVideo: {
		currentVideo: Video
		videoStatus: VideoStatus
	}
}
