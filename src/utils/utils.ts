import os from "os"

const getIpAddress = (): string | undefined => {
	const networkInterfaces = os.networkInterfaces()
	let ipAddress
	for (const interfaceName in networkInterfaces) {
		const interfaces = networkInterfaces[interfaceName]

		if (interfaces) {
			for (const i of interfaces) {
				if (i.family === "IPv4" && !i.internal) {
					ipAddress = i.address
					break
				}
			}
			if (ipAddress) break
		}
	}
	return ipAddress
}
