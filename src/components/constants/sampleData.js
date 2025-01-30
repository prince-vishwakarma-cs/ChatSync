export const sampleChats = [
    {
      _id: "1",
      avatar: ["https://avatar.iran.liara.run/public"],
      name: "Prince",
      groupChat: false,
      members: ["user1", "user2"],  // Representing user ids
    },
    {
      _id: "2",
      avatar: ["https://avatar.iran.liara.run/public"],
      name: "Development Team",
      groupChat: true,
      members: ["user1", "user3", "user4"],
    },
    {
      _id: "3",
      avatar: ["https://avatar.iran.liara.run/public"],
      name: "Gym Buddies",
      groupChat: true,
      members: ["user2", "user5", "user6"],
    },
  ];
  
export const sampleOnlineUsers = ["user1", "user5"];
  
export const sampleNewMessagesAlert = [
    {
      chatId: "1",
      count: 2,
    },
    {
      chatId: "2",
      count: 0,
    },
    {
      chatId: "3",
      count: 5,
    },
  ];
  
  // Simulated current chat ID
export const currentChatId = "2";
  
  // Dummy delete handler
export const handleDeleteChat = (event, chatId, isGroupChat) => {
    event.preventDefault();
  };
  

  export const sampleUsers = [
    {
      _id: "1",
      avatar: ["https://avatar.iran.liara.run/public"],
      name: "Prince",
      bio: "Aspiring full-stack developer and tech enthusiast."
    },
    {
      _id: "2",
      avatar: ["https://avatar.iran.liara.run/public"],
      name: "Development Team",
      bio: "Working on exciting projects with cutting-edge technology."
    },
    {
      _id: "3",
      avatar: ["https://avatar.iran.liara.run/public"],
      name: "Gym Buddies",
      bio: "Fitness enthusiasts focused on strength and endurance."
    },
    {
      _id: "4",
      avatar: ["https://avatar.iran.liara.run/public"],
      name: "Prince",
      bio: "Always eager to learn and explore new tech tools."
    },
    {
      _id: "5",
      avatar: ["https://avatar.iran.liara.run/public"],
      name: "Development Team",
      bio: "Collaboration is key to building amazing applications."
    },
    {
      _id: "6",
      avatar: ["https://avatar.iran.liara.run/public"],
      name: "Gym Buddies",
      bio: "Teamwork makes the dream work in fitness and beyond."
    }
  ];


  export const sampleNotifications = [
    {
      sender:{
        avatar: "https://via.placeholder.com/48",
        name: "Prince"
      },
      id: "1",
    },
    {
      sender:{
        avatar:"https://via.placeholder.com/48",
        name: "John Doe"
      },
      id: "2",
    },
    {
      sender:{
        avatar: "https://via.placeholder.com/48",
        name: "Harry"
      },
      id: "3",
    }
  ];
  


  export const SampleMessage =[{
    attachments: [{
      public_id: "1",
      url: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg"
    }],
    _id: "1",
    sender: {
      _id: "1",
      name: "Prince"
    },
    content: "Hello, how are you?",
    chat: "1",
    createdAt: "2024-03-05T12:00:00.000Z",
  },{
    attachments: [{
      public_id: "1",
      url: "https://img.freepik.com/premium-photo/lego-figure-man-wearing-jacket-with-hood-that-says-hes-wearing-hoodie_113255-93079.jpg"
    }],
    _id: "45",
    sender: {
      _id: "dffgdhs",
      name: "Prince"
    },
    content: "Hello, how are not you? yffdghtgdhjhgfggjhftfghffgrtytuye sghfgkghfgdsdhffdgfgdnfgcfx",
    chat: "1",
    createdAt: "2024-03-05T12:00:00.000Z",
  },
]