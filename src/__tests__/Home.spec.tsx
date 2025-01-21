import { render, screen } from "@testing-library/react"
import Home from "../pages"

describe("Home", () => {
  it("should render button and empty list", () => {
    render(<Home conversations={undefined} />)
    expect(
      screen.getByText(/Create new conversation/)
    ).toBeInTheDocument()
  })
  it("should render a list of conversations", () => {
    const conversations = [
      { id: 1, lastMessageTimestamp: 0, recipientId: 1, recipientNickname: "Recipient1", senderId: 0, senderNickname: "Sender" },
      { id: 2, lastMessageTimestamp: 0, recipientId: 2, recipientNickname: "Recipient2", senderId: 0, senderNickname: "Sender" }
    ]
    render(<Home conversations={conversations} />)
    expect(screen.getByText(/Recipient1/)).toBeInTheDocument()
    expect(screen.getByText(/Recipient2/)).toBeInTheDocument()
  })

  it("should render the correct number of conversations", () => {
    const conversations = [
      { id: 1, lastMessageTimestamp: 0, recipientId: 2, recipientNickname: "Recipient1", senderId: 1, senderNickname: "Sender" },
      { id: 2, lastMessageTimestamp: 0, recipientId: 3, recipientNickname: "Recipient2", senderId: 1, senderNickname: "Sender" },
      { id: 3, lastMessageTimestamp: 0, recipientId: 4, recipientNickname: "Recipient3", senderId: 1, senderNickname: "Sender" }
    ]
    render(<Home conversations={conversations} />)
    const conversationElements = screen.getAllByTestId("conversation-item")
    expect(conversationElements).toHaveLength(3)
  })

  it("should render a message when there are no conversations", () => {
    render(<Home conversations={[]} />)
    expect(screen.getByText(/No conversations yet!/)).toBeInTheDocument()
  })
})