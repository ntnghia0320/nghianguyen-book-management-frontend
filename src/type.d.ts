interface Role {
    id?: number,
    name: string
}

interface User {
    id?: number,
    email: string,
    firstName?: string,
    lastName?: string,
    avata?: string,
    enabled?: boolean,
    role?: Role
}

interface UserLogin {
    email: string,
    password: string
}

interface UserInfo {
    userId: number,
    token: string,
    type: string,
    email: string,
    role: string
}

interface Book {
    id?: number,
    title: string,
    author: string,
    description?: string,
    createAt: string,
    updateAt: string,
    image?: string,
    enabled?: boolean,
    user?: User
}

interface Comment {
    id?: number,
    message: string,
    createAt: string,
    updateAt: string,
    user?: User,
    book?: Book
}

interface PropSnackBar {
    active: boolean,
    status: Color,
    autoHideDuration: number,
    message: string
}