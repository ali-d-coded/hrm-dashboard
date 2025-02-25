
const dbUrl = process.env.DBURL
const dbUrlClient = 'https://ash-hrm-pocketbase.appii.space'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

type DynamicData = Record<string, unknown>

export {
	dbUrl, ADMIN_EMAIL, ADMIN_PASSWORD, dbUrlClient, type DynamicData
}