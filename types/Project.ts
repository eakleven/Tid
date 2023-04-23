export interface Project {
	projectId: string
	projectName: string
	projectOwner: string
	projectWorkers: projectWorker[]
	hours: hours[]
}

interface projectWorker {
	workerId: string
	name: string
	email: string
	salary: number
}

interface hours {
	workerId: string
	desc?: string
	hours: number
	date: string
	salary: number
}
