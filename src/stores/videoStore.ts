import { Video } from "@/types"
import { create } from "zustand"
import agent from "@/agent"
import qs from "query-string"

type VideoStore = {
	src: string
	title: string
	query: string
	value: string
	videos: Video[]
	playedVideos: Video[]
	randomVideo: Video | null
	currentVideo: Video | null
	randomPlayedVideo: Video | null
	setVideos: () => void
	setRandomVideo: (queryType?: string, queryValue?: string) => void
	setPlayedVideos: () => void
	setRandomPlayedVideo: () => void
	setSrc: (src: string) => void
	setTitle: (title: string) => void
	updateVideo: (video: Video) => void
	resetVideoStatus: () => void
	setQuery: (query: string) => void
}

export const useVideoStore = create<VideoStore>(set => ({
	src: "",
	title: "",
	query: "",
	value: "",
	videos: [],
	playedVideos: [],
	randomVideo: null,
	randomPlayedVideo: null,
	currentVideo: null,
	setVideos: async () => {
		const videos: Video[] = await agent.Videos.list()
		set({ videos })
	},
	setRandomVideo: async (queryType?: string, queryValue?: string) => {
		const query: any = {}

		if (queryType && queryValue) {
			query[queryType] = queryValue
		}

		const url = qs.stringifyUrl(
			{ url: "", query },
			{ skipEmptyString: true }
		)
		const currentVideo: Video | null = JSON.parse(
			localStorage.getItem("currentVideo") as string
		)
		const videos = await agent.Videos.list()
		if (currentVideo === null) {
			const randomVideo: Video = await agent.Videos.random(url)
			localStorage.setItem("currentVideo", JSON.stringify(randomVideo))

			set(state => ({
				...state,
				videos,
				src: randomVideo.url,
				title: randomVideo.title,
				currentVideo: randomVideo,
			}))
		} else {
			set(state => ({
				...state,
				videos,
				src: currentVideo?.url,
				title: currentVideo.title,
				currentVideo,
			}))
		}
	},
	setPlayedVideos: async () => {
		const videos: Video[] = await agent.Videos.list()
		const playedVideos = videos.filter(
			(video: Video) => video.videoStatus.played
		)

		set(state => ({ ...state, playedVideos }))
	},
	setRandomPlayedVideo: async () => {
		const randomPlayedVideo: Video = await agent.Videos.randomPlayed()
		set({
			randomPlayedVideo,
			src: randomPlayedVideo.url,
			title: randomPlayedVideo.title,
		})
	},
	setSrc: (src: string) => set({ src }),
	setTitle: (title: string) => set({ title }),
	updateVideo: async (video: Video) => {
		await agent.Videos.update(video)
	},
	resetVideoStatus: async () => {
		await agent.Videos.delete()
		const videos: Video[] = await agent.Videos.list()
		const playedVideos = videos.filter(video => video.videoStatus.played)

		set({ videos, playedVideos })
		localStorage.removeItem("currentVideo")
	},
	setQuery: (query: string) => set({ query }),
}))
