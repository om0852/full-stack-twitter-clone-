import React, { useMemo } from "react";
import { format } from "date-fns";
import useCurrentUser from "../hooks/useCurrentUser";
import useUser from "../hooks/useUser";
import Button from "../Button";
import { BiCalendar } from "react-icons/bi";
import useEditModal from "../hooks/useEditModal";
import useFollow from "../hooks/useFollowings";

interface userBioProps {
    userid: string
}
const UserBio: React.FC<userBioProps> = ({ userid }) => {
    const { data: currentUser } = useCurrentUser();
    const { data: fetchedUser } = useUser(userid);

    const editModal =useEditModal();

const {isFollowing,toggleFollow}=useFollow(userid);



    const createdAt = useMemo(() => {
        if (!fetchedUser?.createdAt) {
            return null;
        }
        return format(new Date(fetchedUser.createdAt), "MMMM yyyy")
    }, [fetchedUser?.createdAt]);
    return (
        <>
            <div className="border-b-[1x] border-neutral-800 pb-4">
                <div className="flex justify-end p-2">
                    {currentUser?.id === userid ? (
                        <Button secondary label="Edit" onClick={() => {editModal.onOpen() }} />
                    ) : (
                        <Button onClick={() => { toggleFollow()}} label={isFollowing?`Unfollow`:"follow"} secondary={isFollowing} outline={isFollowing} />
                    )}

                </div>
                <div className="mt-2 px-4 pl-[3vh] ">
                    <div className="flex flex-col"></div>
                    <p className="text-white text-2xl font-semibold"
                    >
                        {fetchedUser?.name}
                    </p>
                    <p className="text-md text-neutral-500"
                    >
                        {fetchedUser?.username}
                    </p>

                </div>
                <div className="flex flex-col mt-4 pl-[1vh]">
                    <p className="text-white">{fetchedUser?.bio}</p>
                    <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
                        <BiCalendar size={20} />
                        <p>Joined {createdAt}</p>
                    </div>
                </div>
                <div className="flex flex-row items-center mt-4 gap-6 pl-[1vh]">
                    <div className="flex flex-row items-center gap-1">
                        <p className="text-white">{
                            fetchedUser?.followingIds?.length
                        }</p>
                        <p className="text-neutral-500">Following</p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <p className="text-white">{
                            fetchedUser?.followersCount || 0
                        }</p>
                        <p className="text-neutral-500">Follower</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserBio;