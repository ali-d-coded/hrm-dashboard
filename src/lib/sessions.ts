// import 'server-only'
'use server'
import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from './definitions'
import { cookies } from 'next/headers'


const secretKey = process.env.SESSION_SECRET || "MMhOdxJlRBajqPDRl98lCfOSpE30EM0S580y+qxhkC0="
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: SessionPayload) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('7d')
		.sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
	try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ['HS256'],
		})
		return payload
	} catch {
		console.log('Failed to verify session')
	}
}

export async function createSession(userId: string, role: string) {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
	const session = await encrypt({ userId, role, expiresAt })

	const cookieStore = await cookies()

	cookieStore.set('session', session, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: 'lax',
		path: '/',
	})
}

export async function updateSession() {
	const cookieStore = await cookies()
	const session = cookieStore.get('session')?.value
	const payload = await decrypt(session)

	if (!session || !payload) {
		return null
	}

	const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
	cookieStore.set('session', session, {
		httpOnly: true,
		secure: true,
		expires: expires,
		sameSite: 'lax',
		path: '/',
	})
}

export async function deleteSession() {
	const cookieStore = await cookies()
	cookieStore.delete('session')
}