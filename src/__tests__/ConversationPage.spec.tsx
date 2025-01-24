import { render, screen } from "@testing-library/react"
import ConversationPage from "../pages/conversation/[conversationId]"

const mockConversationDetails = {
  id: 1,
  senderId: 1,
  senderNickname: "Alice",
  recipientId: 2,
  recipientNickname: "Bob",
  lastMessageTimestamp: new Date().toISOString(),
}

const mockInitialMessages = [
  {
    id: 1,
    conversationId: 1,
    timestamp: new Date().toISOString(),
    authorId: 1,
    body: "Hello",
  },
  {
    id: 2,
    conversationId: 1,
    timestamp: new Date().toISOString(),
    authorId: 2,
    body: "Hi",
  },
]

describe("Home", () => {
  it("should render error page", () => {
    render(<ConversationPage conversationId={undefined} conversationDetails={undefined} initialMessages={undefined} />)
    expect(
      screen.getByText(/There was an error retrieving the conversation. Try again later!/)
    ).toBeInTheDocument()
  })

  it("should render error page with conversation Id", () => {
    render(<ConversationPage conversationId={1} conversationDetails={undefined} initialMessages={undefined} />)
    expect(
      screen.getByText(/There was an error retrieving the conversation. Try again later!/)
    ).toBeInTheDocument()
  })

  it("should render error page with initialMessages", () => {
    render(<ConversationPage conversationId={undefined} conversationDetails={undefined} initialMessages={mockInitialMessages} />)
    expect(
      screen.getByText(/There was an error retrieving the conversation. Try again later!/)
    ).toBeInTheDocument()
  })

  it("should render correctly", () => {
    render(<ConversationPage conversationId={1} conversationDetails={mockConversationDetails} initialMessages={mockInitialMessages} />)
    expect(
      screen.getByText(/Last message:/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Hello/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Hi/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Send/)
    ).toBeInTheDocument()
  })
})