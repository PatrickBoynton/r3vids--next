"use client"

import { useVideoStore } from "@/stores/videoStore"
import { Video } from "@/types"

export const SearchResult = () => {
	const { searchVideos, searchTerm, setVideo, setSearchTerm } =
		useVideoStore()
	const handleClick = (video: Video) => {
		setVideo(video)
		setSearchTerm("")
	}
	return (
		<div className="absolute top-full left-0 right-0 z-50 border-2 border-secondary bg-transparent">
			{searchTerm
				? searchVideos.map(video => (
						<div className="p-2 cursor-pointer" key={video.id}>
							<h3 onClick={() => handleClick(video)}>
								{video.url}
							</h3>
						</div>
					))
				: null}
		</div>
	)
}
