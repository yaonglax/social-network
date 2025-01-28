import {createContext, ReactNode, useState} from "react";

interface User {
    id: number;
    username: string;
}

export interface UserContextType {
    user: User | null;
    updateUser: (user: User) => void;
    clearUser: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
    children: ReactNode
}

export const UserProvider = ({children}: UserProviderProps) => {

    const [user, setUser] = useState<User | null>(null)

    const updateUser = (userData: User) => {
        setUser(userData)
    }

    const clearUser = () => {
        setUser(null)
    }

    return (
        <UserContext.Provider value={{user, updateUser, clearUser}}>
            {children}
        </UserContext.Provider>
    )
}
