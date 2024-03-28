import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

function ChatMessage() {
  const session = JSON.parse(localStorage.getItem("user"));

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [roomData, setRoomdata] = useState([]);
  const token = localStorage.getItem("token");
  const endpoint = `${import.meta.env.VITE_KEY}`;
  const { roomid } = useParams();

  const [myuserid, setMyUserId] = useState("");

  useEffect(() => {
    setMyUserId(session.role + session.id);

    fetchMessages();

    return () => setMessages([]);
  }, [roomid]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${endpoint}/messages/${roomid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages(response.data[0].messages);
      setRoomdata(response.data[0]);
      console.log(roomData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const sendMessage = async () => {
    try {
      const [userPrefix, doctorPrefix] = roomid.split("_");

      const userId = userPrefix.slice(4);
      const doctorId = doctorPrefix.slice(6);

      let senderId, receverId;
      // Check if session ID matches user ID or doctor ID
      if (session && session.id) {
        if (session.id === userId) {
          // If session ID matches user ID
          senderId = "user" + userId;
          receverId = "doctor" + doctorId;
        } else if (session.id === doctorId) {
          // If session ID matches doctor ID
          senderId = "doctor" + doctorId;
          receverId = "user" + userId;
        } else {
          console.error(
            "Session ID does not match user ID or doctor ID in chatRoomId"
          );
          return;
        }

        // Proceed to send message
        const response = await axios.post(
          `${endpoint}/messages`,
          {
            senderId: senderId,
            receiverId: receverId,
            text: messageText,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          fetchMessages();
          console.log("Message sent successfully");
          setMessageText("");
        } else {
          console.error("Failed to send message");
        }
      } else {
        console.error("Session ID not found");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };
    return date.toLocaleDateString(undefined, options);
  }

  return (
    <>
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col flex-auto h-full">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              <Link to={"../messages"}>
                <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon> &nbsp;
                Back
              </Link>
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-12 gap-y-2">
                    {messages?.map((message) => (
                      <React.Fragment key={message._id}>
                        {message.senderId === myuserid ? (
                          // My Message
                          <div className="col-start-6 col-end-13 p-3 rounded-lg">
                            <div className="flex items-center justify-start flex-row-reverse">
                              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                <img
                                  src={`${endpoint}/doctor/profile/${
                                    session.role === "user"
                                      ? roomData.patient.p_profile_pic
                                      : roomData.doctor.d_profile_pic
                                  }`}
                                  alt="Profile Pic"
                                />
                              </div>

                              <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                <div>{message.text}</div>
                                <div className="text-[12px] font-inter text-gray-400">
                                  {formatTimestamp(message.createdAt)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          // Other Message
                          <div className="col-start-1 col-end-8 p-3 rounded-lg">
                            <div className="flex flex-row items-center">
                              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                  <img
                                    src={`${endpoint}/doctor/profile/${
                                      session.role === "user"
                                        ? roomData.doctor.d_profile_pic
                                        : roomData.patient.p_profile_pic
                                    }`}
                                    alt="Profile Pic"
                                  />
                                </div>
                              </div>

                              <div className="relative ml-3 font-inter text-sm bg-white py-2 px-4 shadow rounded-xl">
                                <div>{message.text}</div>
                                <div className="text-[12px] text-gray-400">
                                  {formatTimestamp(message.createdAt)}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div>
                  <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="flex-grow ml-4">
                  <div className="relative w-full">
                    <input
                      name="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      type="text"
                      className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    />
                    <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          stroke-linejoin="round"
                          strokeWidth="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    onClick={sendMessage}
                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                  >
                    <span>Send</span>
                    <span className="ml-2">
                      <svg
                        className="w-4 h-4 transform rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          stroke-linejoin="round"
                          strokeWidth="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatMessage;
