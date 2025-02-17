export interface UserContentProps {
    onLogout: () => void
    user: User
}

interface User {
    id_petugas: number
    username: string
    role: string
    name: string
}