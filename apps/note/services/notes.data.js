"use strict"

export const gNotes = [
  {
    id: "n101",
    type: "text",
    isPinned: true,
    info: { title: "Bobi and Me", text: "Fullstack Me Baby!" },
    style: { backgroundColor: "#00d", class: "level-2" },
  },
  {
    id: "n102",
    type: "image",
    info: {
      url: "../../../assets/img/599-200x300.jpg",
      title: "Bobi and Me",
    },
    style: { backgroundColor: "#00d", class: "level-5" },
  },
  {
    id: "n103",
    type: "todos",
    info: {
      title:'my todos',
      label: "Get my stuff together",
      todos: [
        { text: "Driving liscence", doneAt: null },
        { text: "Coding power", doneAt: 187111111 },
      ],
    },
    style: { backgroundColor: "#00d", class: "level-4" },
  },
  {
    id: "n104",
    type: "iframe",
    info: {
      url: "https://www.youtube.com/watch?v=e27b8xj5sNM",
      title: "Bobi and Me",
    },
    style: { backgroundColor: "#00d", class: "level-3" },
  },
]
