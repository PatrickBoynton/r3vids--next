"use client"
import { useState } from "react"

//http://localhost:3000/playlist
export default function Playlist() {
	const [data, setData] = useState<any>()
	const submit = async (e: any) => {
		e.preventDefault()
		const form = e.target
		const formData = new FormData(form)
		setData(formData)
	}
	return (
		<div>
			<form
				action="http://localhost:3000/"
				method="POST"
				onSubmit={submit}>
				<label id="name">Name</label>
				<input type="text" />
				<label id="description">Description</label>
				<input type="text" />
				<label id="video-name">Video name</label>
				<input type="text" />
				<button type="submit">Create Playlist</button>
			</form>
			<h1>{data}</h1>
		</div>
	)
}
