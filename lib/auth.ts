import crypto from "crypto"

interface User {
  id: string
  email: string
  name: string
  role: "admin" | "client"
  phone?: string
}

interface AuthSession {
  user: User
  token: string
  expiresAt: number
}

// Mock JWT token generation (in production, use a proper JWT library)
export function generateToken(userId: string): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64")
  const payload = Buffer.from(
    JSON.stringify({
      userId,
      iat: Date.now(),
      exp: Date.now() + 24 * 60 * 60 * 1000,
    }),
  ).toString("base64")
  const signature = crypto
    .createHmac("sha256", process.env.JWT_SECRET || "secret-key")
    .update(`${header}.${payload}`)
    .digest("base64")
  return `${header}.${payload}.${signature}`
}

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex")
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}
