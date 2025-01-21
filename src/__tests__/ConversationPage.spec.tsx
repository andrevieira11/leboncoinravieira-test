import { render, screen } from "@testing-library/react"
import ConversationPage from "../pages/conversation/[conversationId]"

const mockConversationDetails = {
  id: 1,
  senderId: 1,
  recipientId: 2,
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

const mockUsers = [
  {
    id: 1,
    nickname: "Alice",
  },
  {
    id: 2,
    nickname: "Bob",
  },
]

describe("Home", () => {
  it("should render error page", () => {
    render(<ConversationPage conversationId={undefined} conversationDetails={undefined} initialMessages={undefined} users={undefined} />)
    expect(
      screen.getByText(/There was an error retrieving the conversation. Try again later!/)
    ).toBeInTheDocument()
  })

  it("should render error page with conversation Id", () => {
    render(<ConversationPage conversationId={1} conversationDetails={undefined} initialMessages={undefined} users={undefined} />)
    expect(
      screen.getByText(/There was an error retrieving the conversation. Try again later!/)
    ).toBeInTheDocument()
  })

  it("should render error page with initialMessages", () => {
    render(<ConversationPage conversationId={undefined} conversationDetails={undefined} initialMessages={mockInitialMessages} users={undefined} />)
    expect(
      screen.getByText(/There was an error retrieving the conversation. Try again later!/)
    ).toBeInTheDocument()
  })

  it("should render error page with initialMessages", () => {
    render(<ConversationPage conversationId={undefined} conversationDetails={undefined} initialMessages={undefined} users={mockUsers} />)
    expect(
      screen.getByText(/There was an error retrieving the conversation. Try again later!/)
    ).toBeInTheDocument()
  })

  it("should render error page with initialMessages", () => {
    render(<ConversationPage conversationId={1} conversationDetails={mockConversationDetails} initialMessages={mockInitialMessages} users={mockUsers} />)
    expect(
      screen.getByText(/Last message:/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Bob/)
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