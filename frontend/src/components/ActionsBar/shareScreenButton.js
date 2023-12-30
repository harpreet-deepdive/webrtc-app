import React from 'react'
import {Button} from 'flowbite-react'
import { HiOutlineArrowRight, HiShoppingCart } from 'react-icons/hi';
import socket from "../../utils/socketConnection";
const ShareScreenButton = () => {

    socket.onmessage = (message) => {
        const data = JSON.parse(message.data)

        console.log(data)

    }

    return (
    <button onClick={() => {
        socket.send(JSON.stringify({
            type: "message",
            payload: {
                message: 'hi vaathi cominggg!!!!'
            }
        }));
    }} type="button" className="mx-auto text-white h-full block bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 ">
        <svg className="mr-2 h-5 w-5 fill-white text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M14 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/>
                    <path d="M18 5h-8a2 2 0 0 0-2 2v11H5a1 1 0 0 0 0 2h14a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2Zm-4 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm0 9a3 3 0 1 1 0-5.999A3 3 0 0 1 14 17Z"/>
                    <path d="M6 9H2V2h16v1c.65.005 1.289.17 1.86.48A.971.971 0 0 0 20 3V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h4V9Z"/>
                </svg>
        Share Screen
    </button>
    )
}
export default ShareScreenButton
