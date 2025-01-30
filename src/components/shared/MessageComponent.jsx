import moment from "moment";
import React, { memo, forwardRef, useMemo } from "react";
import { fileFormat } from "../../libs/features";
import renderAttachment from "./RenderAttachment";
import { TypingLoader } from "../../pages/Chat";

const MessageComponent = forwardRef(({ message, user }, ref) => {
  const { sender, content, attachments = [], createdAt } = message;
  const sameSender = sender?._id === user?._id;
  const formatDate = (createdAt) => {
    const now = moment();
    const inputDate = moment(createdAt);
  
    if (inputDate.isSame(now, 'day')) {
      // Today
      return `Today ${inputDate.format("h:mm A")}`;
    } else if (inputDate.isSame(now.subtract(1, 'day'), 'day')) {
      // Yesterday
      return `Yesterday ${inputDate.format("h:mm A")}`;
    } else if (inputDate.isAfter(moment().subtract(1, 'week'))) {
      // Within the past week (use weekday names)
      return `${inputDate.format("dddd h:mm A")}`;
    } else {
      // Older than a week (use full date)
      return inputDate.format("DD/MM/YYYY h:mm A");
    }
  };
  // Memoize timeAgo to avoid recalculating unnecessarily
  return (
    <div
      ref={ref}
      className={`flex ${sameSender ? "justify-end" : "justify-start"} ${sameSender ? "text-right" : "text-left"} text-hover-text`}
    >
      <div className={`w-auto p-2 ${attachments.length > 0 ? "max-w-[200px]" : "max-w-[70%]"}`}>
        <div
          className={`${attachments.length>0 ? "rounded-lg"  : "rounded-xl "}`}
        >
          {/* Sender's name (if not from the current user) */}
          {!sameSender && (
           <div 
           className="pb-2 text-xs font-semibold text-yellow"
         >
              {sender.name}
            </div>
          )}

          {/* Attachments */}
          {attachments.length > 0 && (
            <div className="">
              {attachments.map((attachment, index) => {
                const url = attachment.url;
                const file = fileFormat(url);
                return (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-500 break-all hover:underline"
                  >
                    {renderAttachment(file, url)}
                  </a>
                );
              })}
            </div>
          )}

          {/* Message content */}
          {content && (
            <div className="break-words">
              {content}
            </div>
          )}
        </div>

        {/* Timestamp */}
        <div className="mt-1 text-[0.7rem] text-time-color">
          {useMemo(() => formatDate(createdAt), [createdAt])}
        </div>
      </div>
    </div>
  );
});

export default memo(MessageComponent);

export const TypingMessageComponent = forwardRef(() => {
  return (
    <div
      className={`flex justify-start text-left text-text-primary`}
    >
      <div
        className={`w-auto p-2 max-w-[70%]`}
      >
        <div className="flex items-center p-2 rounded-xl">
          {/* Sender's name */}

          {/* Typing loader animation */}
          <div className="flex items-center">
            <TypingLoader />
          </div>
        </div>

        {/* Timestamp for live typing */}
        <div className="mt-1 text-xs text-text-primary">
          Typing...
        </div>
      </div>
    </div>
  );
});

