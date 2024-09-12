import axios, { AxiosResponse } from "axios"
import { IVideoNavigation, IVideoStatus, Video } from "./types"

axios.defaults.baseURL = `http://192.168.1.8:5070/api`
// getIpAddress()
const responseBody = (response: AxiosResponse) => response.data

const requests = {
	get: <T>(url: string) => axios.get<T>(url).then(responseBody),
	post: <T>(url: string, body: object) =>
		axios.post<T>(url, body).then(responseBody),
	put: <T>(url: string, body: object) =>
		axios.put<T>(url, body).then(responseBody),
	patch: <T>(url: string, body: object) =>
		axios.patch<T>(url, body).then(responseBody),
	delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Videos = {
	list: () => requests.get<Video[]>("/videos"),
	get: (id: string) => requests.get<Video>(`/videos/${id}`),
	played: () => requests.get<Video[]>("/videos/played"),
	random: (query?: string) => {
		requests.get<Video>(`/videos/random${query}`)
	},
	randomAll: (query?: string) =>
		requests.get<Video>(`/videos/random/${query} `),
	randomPlayed: (query?: string) =>
		requests.get<Video>(`/videos/random/${query}`),
	update: (video: Video) =>
		requests.patch(`/videos/update/${video.id}`, video),
	test: (video: any) => requests.put(`/videos/${video.id}`, video),
	search: (query: string) => requests.get<Video[]>(`/videos/search/${query}`),
	delete: () => requests.delete<Video>("/videos/reset"),
}

const VideoStatus = {
	list: () => requests.get<IVideoStatus[]>("/status"),
	status: (id: string) => requests.get<IVideoStatus>(`/status/${id}`),
}

const VideoNavigation = {
	get: () => requests.get<Video>("/navigation"),
	create: (video: Video) =>
		requests.post<IVideoNavigation>("/navigation", {
			currentVideo: video.id,
			previousVideo: null,
		}),

	update: (currentVideo?: Video) =>
		requests.put("/navigation", {
			currentVideo: currentVideo?.id || null,
			previousVideo: null,
		}),
	delete: () => requests.delete("/navigation"),
}

const Playlist = {
	list: () => requests.get<Video[]>("/playlist"),
	get: (id: string) => requests.get<Video>(`/playlist/${id}`),
	create: (video: Video) => requests.post<Video>("/playlist", video),
	update: (video: Video) =>
		requests.put<Video>(`/playlist/${video.id}`, video),
	delete: (id: string) => requests.delete<Video>(`/playlist/${id}`),
}

const agent = { Videos, VideoStatus, VideoNavigation, Playlist }

export default agent
