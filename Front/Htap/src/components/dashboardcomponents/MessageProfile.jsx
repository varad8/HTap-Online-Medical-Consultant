import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MessageProfile() {
  const session = JSON.parse(localStorage.getItem("user"));
  const [chatRooms, setChatRooms] = useState([]);
  const token = localStorage.getItem("token");
  const endpoint = `${import.meta.env.VITE_KEY}`;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get(`${endpoint}/chatRooms`, {
          params: { userId: session.id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChatRooms(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      }
    };

    fetchChatRooms();
  }, [endpoint, token]);

  const handleOpenChat = (chatRoom) => {
    navigate(`./${chatRoom?.chatRoomId}`);
  };

  return (
    <>
      {" "}
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col flex-auto h-full">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl gap-2 bg-gray-100 h-full p-4">
              <div className="flex flex-col gap-3">
                {chatRooms.map((chatRoom) => (
                  <div
                    key={chatRoom._id}
                    className="shadow bg-white rounded-lg p-3"
                    onClick={() => {
                      handleOpenChat(chatRoom);
                    }}
                  >
                    <div className="flex items-center">
                      <img
                        className="rounded-full w-24 h-24 border border-indigo-600"
                        src={
                          chatRoom.patient.pid === session.id
                            ? `${endpoint}/doctor/profile/${chatRoom.doctor.d_profile_pic}`
                            : `${endpoint}/users/profile/${chatRoom.patient.p_profile_pic}`
                        }
                        alt="Profile"
                      />
                      <div className="ml-4">
                        <p>
                          {chatRoom.patient.pid === session.id
                            ? chatRoom.doctor.d_firstname
                            : chatRoom.patient.p_firstname}{" "}
                          {chatRoom.patient.pid === session.id
                            ? chatRoom.doctor.d_lastname
                            : chatRoom.patient.p_lastname}
                        </p>
                        <p>Last Message: {chatRoom.lastMessage}</p>
                        <p>
                          {new Date(chatRoom.lastMessageTime).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageProfile;
