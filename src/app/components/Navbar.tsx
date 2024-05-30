"use client"
import {
	AccountCircle,
	Notifications,
	Search,
	SlowMotionVideo,
} from "@mui/icons-material"

export const Navbar = () => {
	return (
		<nav className="navbar">
			<ul>
				<li id="slow">
					<SlowMotionVideo /> R3vids
				</li>
				<li>
					<input
						onChange={() => {}}
						type="text"
						name="search"
						id="search"
						placeholder="Search for videos"
					/>
					<label htmlFor="search">
						<Search />
					</label>
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
