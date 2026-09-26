const reviews = [
  {
    id: 101,
    bookId: 1,
    user: "Praveen",
    rating: 5,
    review:
      "The ending completely surprised me. A simple story with a powerful message.",
    likes: 124,
    date: "21 Sep 2026",
    comments: [
      {
        id: 1,
        user: "Praveen",
        text: "I completely agree!"
      },
      {
        id: 2,
        user: "Kumar",
        text: "One of my favorite books too."
      }
    ]
  },

  {
    id: 102,
    bookId: 2,
    user: "Kumar",
    rating: 5,
    review:
      "Very practical and easy to apply in everyday life.",
    likes: 98,
    date: "20 Sep 2026",
    comments: [
      {
        id: 3,
        user: "Dhasarathi",
        text: "The habit stacking idea was useful."
      }
    ]
  },

  {
    id: 103,
    bookId: 5,
    user: "Uma",
    rating: 5,
    review:
      "A wonderful adventure with memorable characters.",
    likes: 86,
    date: "19 Sep 2026",
    comments: []
  },

  {
    id: 104,
    bookId: 3,
    user: "Meena",
    rating: 4,
    review:
      "A thoughtful book about behavior and money.",
    likes: 72,
    date: "18 Sep 2026",
    comments: []
  },

  {
    id: 105,
    bookId: 6,
    user: "Praveen Kumar",
    rating: 5,
    review:
      "Thought-provoking and still relevant to discussions about society.",
    likes: 65,
    date: "17 Sep 2026",
    comments: []
  }
];

export default reviews;