import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../components/constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/`,
    credentials: "include",
  }),
  tagTypes: ["Chat", "User"],
  endpoints: (builder) => ({
    getChats: builder.query({
      query: () => ({ url: "chat/my", credentials: "include" }),
      providesTags: ["Chat"],
    }),

    searchUser: builder.query({
      query: (name) => ({
        url: `user/search?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    chatSearch: builder.query({
      query: (name) => ({
        url: `chat/search?search=${name}`,
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),

    sendFriendRequest: builder.mutation({
      query: (id) => ({
        url: `user/friendrequest`,
        method: "PUT",
        credentials: "include",
        body: id,
      }),
      invalidatesTags: ["User"],
    }),

    acceptFriendRequest: builder.mutation({
      query: (id) => ({
        url: `user/acceptrequest`,
        method: "PUT",
        credentials: "include",
        body: id,
      }),
      invalidatesTags: ["Chat"],
    }),

    getNotifications: builder.query({
      query: () => ({ url: "user/notifications", credentials: "include" }),
      providesTags: ["User"],
    }),

    chatDetails: builder.query({
      query: ({ chatId, populate = false }) => {
        let url = `chat/${chatId}`;
        if (populate) url += "?populate=true";
        return { url: url, credentials: "include" };
      },
      providesTags: ["Chat"],
    }),

    getMessages: builder.query({
      query: ({ chatId, page }) => ({
        url: `chat/message/${chatId}?page=${page}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),

    sendAttachments: builder.mutation({
      query: (data) => ({
        url: `chat/message`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Message"],
    }),

    getGroups: builder.query({
      query: () => ({ url: "chat/my/groups", credentials: "include" }),
      providesTags: ["Chat"],
    }),

    availableFriends: builder.query({
      query: (chatId) => {
        let url = "user/friends";
        if (chatId) url += `?chatId=${chatId}`;
        return { url, credentials: "include" };
      },
      providesTags: ["Chat"],
    }),

    newGroup: builder.mutation({
      query: ({ name, members }) => ({
        url: `chat/new`,
        method: "POST",
        credentials: "include",
        body: { name, members },
      }),
      invalidatesTags: ["Chat"],
    }),

    renameGroup: builder.mutation({
      query: ({ chatId, name }) => ({
        url: `chat/${chatId}`,
        method: "PUT",
        credentials: "include",
        body: { name },
      }),
      invalidatesTags: ["Chat"],
    }),

    removeGroupMember: builder.mutation({
      query: ({ userId, chatId }) => ({
        url: `chat/removemember`,
        method: "PUT",
        credentials: "include",
        body: { userId, chatId },
      }),
      invalidatesTags: ["Chat"],
    }),

    addGroupMembers: builder.mutation({
      query: ({chatId, members }) => ({
        url: `chat/addmembers`,
        method: "PUT",
        credentials: "include",
        body: {chatId, members },
      }),
      invalidatesTags: ["Chat"],
    }),

    deleteChat: builder.mutation({
      query: (chatId) => ({
        url: `chat/${chatId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),

    leaveGroup: builder.mutation({
      query: (chatId) => ({
        url: `chat/leave/${chatId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export default api;
export const {
  useGetChatsQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useGetNotificationsQuery,
  useAcceptFriendRequestMutation,
  useChatDetailsQuery,
  useGetMessagesQuery,
  useSendAttachmentsMutation,
  useGetGroupsQuery,
  useAvailableFriendsQuery,
  useNewGroupMutation,
  useRenameGroupMutation,
  useRemoveGroupMemberMutation,
  useAddGroupMembersMutation,
  useDeleteChatMutation,
  useLeaveGroupMutation,
  useLazyChatSearchQuery
} = api;
