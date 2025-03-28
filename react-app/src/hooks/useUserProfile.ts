import { useState, useEffect, useCallback } from "react";
import { useUser } from "./useUser";
import { useParams } from "react-router-dom";

interface ProfileUserType {
  user_id: number;
  username: string;
  friendsCount: number;
}

interface RequestSender {
  id: number;
  username: string;
}

export const useUserProfile = () => {
  const { username } = useParams();
  const { user, updateUser } = useUser();
  const [profileUser, setProfileUser] = useState<ProfileUserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [friendshipStatus, setFriendshipStatus] = useState<string | null>(null);
  const [friendRequestsCount, setFriendRequestsCount] = useState(0);
  const [requestSenders, setRequestSenders] = useState<RequestSender[]>([]);

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/api/users/profile", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        updateUser(data);
      }
    } catch (e) {
      console.error("Error fetching user:", e);
    }
  }, [updateUser]);

  const fetchProfileUser = useCallback(async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/users/profile/${username}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (res.ok) {
        return await res.json();
      }
      return null;
    } catch (e) {
      console.error("Error fetching profile:", e);
      return null;
    }
  }, [username]);

  const fetchFriendshipStatus = useCallback(
    async (user1: number, user2: number) => {
      if (user1 === user2) return;
      try {
        const res = await fetch(
          `http://localhost:3000/api/friends/fetchStatus?id1=${user1}&id2=${user2}`,
          {
            credentials: "include",
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setFriendshipStatus(data.status);
          console.log("status", data);
        }
      } catch (e) {
        console.error("Error fetching friendship status:", e);
      }
    },
    []
  );
  const fetchFriendsRequests = useCallback(async (userId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/friends/fetchRequests?id=${userId}`,
        {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch requests");
      }

      setFriendRequestsCount(data.count || 0);

      if (data.requests && Array.isArray(data.requests)) {
        const sendersWithNames = await Promise.all(
          data.requests.map(async (req) => {
            try {
              const userResponse = await fetch(
                `http://localhost:3000/api/users/${req.user1_id}/name`
              );

              const userData = await userResponse.json();

              return {
                id: req.user1_id,
                username: userData || "Unknown",
              };
            } catch (e) {
              console.error(`Failed to fetch name for user ${req.user1_id}`, e);
              return {
                id: req.user1_id,
                username: "Unknown",
              };
            }
          })
        );
        setRequestSenders(sendersWithNames);
      }
    } catch (error) {
      console.error("Fetch requests failed:", error);
      setFriendRequestsCount(0);
      setRequestSenders([]);
      throw error;
    }
  }, []);

  const handleFriendRequest = useCallback(async () => {
    if (!user?.id || !profileUser?.user_id) return;

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/friends/sendRequest", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: user.id,
          recipientId: profileUser.user_id,
        }),
      });

      if (res.ok) {
        await Promise.all([
          fetchFriendshipStatus(user.id, profileUser.user_id),
          fetchFriendsRequests(profileUser.user_id),
        ]);
      }
    } catch (e) {
      console.error("Error sending friend request:", e);
    } finally {
      setIsLoading(false);
    }
  }, [
    user?.id,
    profileUser?.user_id,
    fetchFriendshipStatus,
    fetchFriendsRequests,
  ]);

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  useEffect(() => {
    if (!username || !user?.id) return;

    const loadData = async () => {
      setIsLoading(true);
      try {
        const profileData = await fetchProfileUser();
        if (profileData) {
          setProfileUser(profileData);
          await Promise.all([
            fetchFriendshipStatus(user.id, profileData.user_id),
            fetchFriendsRequests(profileData.user_id),
          ]);
        }
      } catch (e) {
        console.error("Error loading profile data:", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [
    username,
    user?.id,
    fetchProfileUser,
    fetchFriendshipStatus,
    fetchFriendsRequests,
  ]);

  return {
    displayUser: profileUser || user,
    isLoading,
    friendshipStatus,
    friendRequestsCount,
    handleFriendRequest,
    requestSenders,
  };
};
