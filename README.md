# Leboncoin test - André Vieira :

I'm using this repository to show my solution to the Leboncoin test.

# Start project :

To run the project please follow these steps:

- Go to the project folder
- Open a terminal and run `npm run install`
- Run `npm run dev`
- Open another terminal in the same location
- Run `npm run start-server`
- Open your browser and insert `http://localhost:3000/`

# Walking through the project:

### Home:
This is the main page where the user can see all the conversations where it is either the sender or the reciever. Each item is a button to check the conversation's messages ([Conversation Details](#Conversation-details)).
The user can also create a new conversation ([New Conversation](#New-Conversation))!

### Conversation Details:
The conversation details page shows the recepient nickname, the timestamp for the last message sent and the list of messages exchanged between these two users. At the bottom of the page the user can also send another message to add to the selected conversation.

### New Conversation:
In this simple page the user can choose another user to create a new entry in the conversation array.
