import {useEffect, useState} from "react";

export const useSearch = (username: string) => {
    const [userId, setUserId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        if (!username) return;

        const fetchUserId = async () => {
            setIsLoading(true)
            try {
                const res = await fetch(`http://localhost:3000/api/users/getUserIdByName?username=${username}`,
                    {
                        method: "GET",
                        credentials: "include"
                    })
                if (res.ok) {
                    const data = await res.json()
                    setUserId(data.user_id)
                } else {
                    console.error('Ошибка загрузки', await res.text())
                }

            } catch (e) {
                console.log(e)
            } finally {
                setIsLoading(false)
            }
        }
        fetchUserId()
    }, [username]);

    return {userId, isLoading}
}

