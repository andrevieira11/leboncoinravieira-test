import { render, screen } from "@testing-library/react"
import NewConversation from "../pages/conversation/newconversation"
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

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

describe("NewConversation", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  it("should render error page", () => {
    render(<NewConversation users={undefined} />)
    expect(
      screen.getByText(/There was an error retrieving the users. Try again later!/)
    ).toBeInTheDocument()
  })

  it("should render page with list of users", () => {
    render(<NewConversation users={mockUsers} />)
    expect(
      screen.getByText(/Select a user to create a new conversation!/)
    ).toBeInTheDocument()
    const conversationElements = screen.getAllByTestId("user-item")
    expect(conversationElements).toHaveLength(2)
  })
})