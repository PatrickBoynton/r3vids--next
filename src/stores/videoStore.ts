import { CurrentVideo, Video } from "@/types"
import { create } from "zustand"
import qs from "query-string"
import agent from "@/agent"

type VideoStore = {
	video: Video | null
	query: string
	searchTerm: string
	value: string
	videos: Video[]
	playedVideos: Video[]
	randomVideo: Video | null
	currentVideo: CurrentVideo | Video | null
	randomPlayedVideo: Video | null
	randomAllVideo: Video | null
	setVideos: () => void
	setRandomVideo: (queryType?: string, queryValue?: string) => void
	setRandomAllVideo: (query?: string) => void
	setPlayedVideos: () => void
	setRandomPlayedVideo: () => void
	updateVideo: (video: Video) => void
	testCall: (video: Video) => void
	resetVideoStatus: () => void
	setQuery: (query: string) => void
	setCurrentVideo: (video?: Video) => void
	createVideoNavigation: (video: Video) => void
	setSearchTerm: (searchTerm: string) => void
}

export const useVideoStore = create<VideoStore>(set => ({
	video: null,
	query: "",
	searchTerm: "",
	value: "",
	videos: [],
	playedVideos: [],
	randomVideo: null,
	randomPlayedVideo: null,
	randomAllVideo: null,
	currentVideo: null,

	setVideos: async () => {
		const videos: Video[] = await agent.Videos.list()
		const playedVideos = await agent.Videos.played()
		set({ videos, playedVideos })
	},

	setRandomVideo: async (queryType?: string, queryValue?: string) => {
		const query: any = {}
		if (queryType && queryValue) {
			query[queryType] =
				queryValue.trim() + useVideoStore.getState().query
		}

		const url = qs.stringifyUrl(
			{ url: "", query },
			{ skipEmptyString: true }
		)
		const randomVideo: any = await agent.Videos.random(url)

		set(state => ({
			...state,
			video: randomVideo,
			randomVideo,
			currentVideo: randomVideo,
		}))

		await agent.Videos.update(randomVideo)
		await agent.VideoNavigation.update(randomVideo)
	},

	setPlayedVideos: async () => {
		const videos: Video[] = await agent.Videos.played()

		const playedVideos = videos.filter(
			(video: Video) => video.videoStatus.played
		)
		set(state => ({ ...state, playedVideos }))
	},

	setRandomPlayedVideo: async () => {
		const randomPlayedVideo: Video =
			await agent.Videos.randomPlayed("?IsPlayed=true")

		set(state => ({
			...state,
			video: randomPlayedVideo,
			randomPlayedVideo,
		}))

		await agent.Videos.update(randomPlayedVideo)
		await agent.VideoNavigation.update(randomPlayedVideo)
	},

	updateVideo: async (video: Video) => {
		await agent.Videos.update(video)
	},

	resetVideoStatus: async () => {
		await agent.Videos.delete()
		const playedVideos = await agent.Videos.played()
		set(state => ({ ...state, playedVideos, currentVideo: null }))
	},

	setQuery: (query: string) => set({ query }),

	setCurrentVideo: async (video?: Video) => {
		const currentVideo = await agent.VideoNavigation.get()

		if (currentVideo !== null)
			set(state => ({
				...state,
				video,
				currentVideo: currentVideo.currentVideo,
			}))
	},

	createVideoNavigation: async (video: Video) => {
		await agent.VideoNavigation.create(video)
	},
	setRandomAllVideo: async (query?: string) => {
		const randomAllVideo: Video = await agent.Videos.randomAll(query)

		set(state => ({
			...state,
			video: randomAllVideo,
			currentVideo: randomAllVideo,
		}))
		await agent.Videos.update(randomAllVideo)
		await agent.VideoNavigation.update(randomAllVideo)
	},
	testCall: async (video: any) => {
		await agent.Videos.test(video)
	},
	setSearchTerm: (searchTerm: string) => set({ searchTerm }),
}))
