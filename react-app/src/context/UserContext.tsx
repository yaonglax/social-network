import {createContext, ReactNode, useContext, useState} from "react";

interface User {
    id: number;
    username: string;
}

interface UserContextType {
    user: User | null;
    updateUser: (user: User) => void;
    clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined)

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

export const useUser = (): UserContextType => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUser must be within a UserProvider")
    }
    return context
}