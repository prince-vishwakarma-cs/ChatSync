import { useInfiniteScrollTop } from "6pp";
import { useCallback, useEffect, useRef, useState } from "react";
import { MoreVertical, Paperclip, Send } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  ALERT,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../components/constants/event";
import AppLayout from "../components/layouts/AppLayout";
import MessageComponent, {
  TypingMessageComponent,
} from "../components/shared/MessageComponent";
import FileMenuDialog from "../components/specific/FileMenuDialog";
import { useErrors, useSocketEvents } from "../hooks/hooks";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { removeNewMessageAlert } from "../redux/reducers/chat";
import { setIsFileMenu } from "../redux/reducers/misc";
import { getSocket } from "../socket";
import { PaperClipIcon } from "@heroicons/react/16/solid";
import { PaperclipIcon } from "lucide-react";

const Chat = ({ user }) => {
  const socket = getSocket();
  const params = useParams();
  const chatId = params.chatId;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const containerRef = useRef(null);
  const lastMessageRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const [isTyping, setIsTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId,populate:true });
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });
  const members = chatDetails?.currentData?.chat?.members;
  const { isFileMenu } = useSelector((state) => state.misc);


  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const messageOnChange = (e) => {
    setMessage(e.target.value);
    if (!isTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIsTyping(true);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIsTyping(false);
    }, 1000);
  };

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");

    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const newMessageHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );

  const alertListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      const messageForAlert = {
        content: data.message,
        sender: {
          _id: "dghghdgvxbbv",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

  const eventArr = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessageHandler,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

  useSocketEvents(socket, eventArr);

  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, userTyping]);

  useEffect(() => {
    dispatch(removeNewMessageAlert());
    return () => {
      setOldMessages([]);
      setMessage("");
      setMessages([]);
      setPage(1);
    };
  }, [chatId]);

  useEffect(() => {
    if (chatDetails.isError) return navigate("/");
  }, [chatDetails.isError]);


  return chatDetails.isLoading ? (
    <>Loading...</>
  ) : (
    <div className="flex flex-col h-[calc(100dvh-4rem)] overflow-hidden bg-not-so-dark sm:h-screen">
      <div className="flex-none">
        <ChatHeader chatDetails={chatDetails} chatId={chatId} />
      </div>
      <div ref={containerRef} className="flex-grow gap-2 p-4 overflow-y-auto">
        {allMessages.map((i) => (
          <MessageComponent message={i} key={i._id} user={user} />
        ))}
        {userTyping && <TypingMessageComponent />}
        <div ref={lastMessageRef} />
      </div>
      <form onSubmit={submitHandler} className="flex-none">
        <div className="relative flex items-center justify-between p-2 px-4 space-x-4 bg-not-so-dark">
          <button type="button" className="relative" onClick={handleFileOpen}>
            <PaperclipIcon className="w-6 h-6 hover:text-dull-text text-text-primary" />
          </button>
          <div className="items-center flex-grow">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={messageOnChange}
              className="w-full p-3 border border-light-gray-divider text-text-primary bg-not-so-dark rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Send className="w-5 h-5" />
          </button>
          <FileMenuDialog anchorE1={fileMenuAnchor} chatId={chatId} />
        </div>
      </form>
    </div>
  );
};

export default AppLayout()(Chat);

export const TypingLoader = () => {
  return (
    <div className="typing-loader">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  );
};

const ChatHeader = ({chatDetails,chatId}) =>{
  const {name,groupChat} = chatDetails?.data?.chat;
  return (
    <div className="flex items-center justify-between px-4 py-4 border-b border-light-gray-divider">
          <div className="flex items-center space-x-4">
            <img
              src={`https://avatar.iran.liara.run/username?username=${name}`}
              alt={name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-medium text-text-primary">
                {name}
              </span>
             
              <span className="text-xs text-text-secondary">
                {groupChat
                  ? "Group Chat"
                  : "Personal Chat"}
              </span>
            </div>
          </div>
        </div>
  )
}