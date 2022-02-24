
import React, { useState, useEffect, useRef } from 'react'
import { db, auth } from '../firebase/firebase'

import { useAuthState } from 'react-firebase-hooks/auth'
function Chat() {
    const scroll = useRef()
    const [messages, setMessages] = useState([])
    const [user] = useAuthState(auth)
    console.log(user.refreshToken)
    



    const [posts, setPosts] = useState([]);

    useEffect(() => {

        return db.collection('messages').limit(50).onSnapshot((snapshot) => {
            const Data = [];
            snapshot.forEach((doc) => Data.push({ ...doc.data(), id: doc.id }));
            console.log(Data);  // <------
            setPosts(Data);
            console.log(posts)
        });
    }, []);




    return (
        <>
            <div>Chata App</div>


{user ?  'user is here' : 'user not here'}

            <div>
                {posts.map((item) => (

                    <p key={item.id}>{item.text}</p>

                ))}


            </div>



        </>
    )
}



export default Chat
