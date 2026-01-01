import { useOptimistic, useState } from "react";



const updateLike = (newLike) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(newLike);
        }, 3000)

    })
}
export default function LikeButton() {

    const [actualLikes, setLikes] = useState(null);
    const [optimisticLikes, setOptimisticLikes] = useOptimistic(10);

    const formAction = async (e) => {
        setOptimisticLikes(optimisticLikes + 1);
        try {
            const updatedLikes = await updateLike(optimisticLikes + 1);
            console.log("up", updatedLikes);
     setLikes(updatedLikes);
        } catch (err) {
            console.log(err);
            setOptimisticLikes(optimisticLikes - 1);
        }
    }
    return (
        <form action={formAction}>
            <p>No of likes {actualLikes ? actualLikes : optimisticLikes}</p>
            <button type="submit">Like</button>
        </form>
    )
}