"use client"
import {
	AccountCircle,
	Notifications,
	Search,
	SlowMotionVideo,
} from "@mui/icons-material"
import { useVideoStore } from "@/stores/videoStore"
import { SearchResult } from "@/app/components/SearchResult"

export const Navbar = () => {
	const { setSearchTerm, setSearchVideos } = useVideoStore()

	return (
		<nav className="p-3">
			<ul className="flex justify-between">
				<li id="slow">
					<SlowMotionVideo /> R3vids
				</li>
				<li className="relative">
					<input
						onChange={async e => {
							setSearchTerm(e.target.value)
							setSearchVideos()
						}}
						type="text"
						name="search"
						id="search"
						className="py-1 px-2 items-center border-2 rounded   bg-primary  mr-2 placeholder-secondary"
						placeholder="Search for videos"
					/>
					<label htmlFor="search">
						<Search />
					</label>
					<SearchResult />
				</li>
				<li id="notify">
					<Notifications />
				</li>
				<li id="account">
					<AccountCircle />
				</li>
			</ul>
		</nav>
	)
}
