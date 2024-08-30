import fs from "fs"
import axios from "axios"

const configPath = "/home/mymar101/R3vidsNet/R3vids.csproj"

export const getIpAddress = () => {
	fs.readFile(configPath, "utf8", (err, data) => {
		if (err) {
			console.error(err)
			return
		}
		try {
			const config = JSON.parse(data)
			const baseUrl = `http://${config.ipAddress}:5070/api`

			axios.defaults.baseURL = baseUrl
			console.log(`Axios base URL updated to: ${baseUrl}`)
		} catch (e) {
			console.error(e)
		}
	})
}
