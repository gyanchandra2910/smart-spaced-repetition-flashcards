import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Flashcard from "../components/Flashcard";

describe("Flashcard Component", () => {
  const mockCard = {
    id: "1",
    question: "What is the capital of France?",
    answer: "Paris",
  };
  const mockOnKnow = jest.fn();
  const mockOnDontKnow = jest.fn();

  beforeEach(() => {
    mockOnKnow.mockClear();
    mockOnDontKnow.mockClear();
  });

  test("renders the question side by default", () => {
    render(
      <Flashcard
        card={mockCard}
        onKnow={mockOnKnow}
        onDontKnow={mockOnDontKnow}
      />
    );

    expect(
      screen.getByText(/What is the capital of France/i)
    ).toBeInTheDocument();
    expect(screen.queryByText(/Paris/i)).not.toBeVisible();
  });

  test("flips the card when clicked", () => {
    render(
      <Flashcard
        card={mockCard}
        onKnow={mockOnKnow}
        onDontKnow={mockOnDontKnow}
      />
    );

    const card = screen.getByRole("button", { name: /Card front/i });
    fireEvent.click(card);

    // The answer should now be visible
    expect(screen.getByTestId("card-answer")).toBeInTheDocument();
  });

  test("handles keyboard navigation", () => {
    render(
      <Flashcard
        card={mockCard}
        onKnow={mockOnKnow}
        onDontKnow={mockOnDontKnow}
      />
    );

    const card = screen.getByRole("button", { name: /Card front/i });

    // Test Enter key to flip
    fireEvent.keyDown(card, { key: "Enter", code: "Enter" });
    expect(screen.getByTestId("card-answer")).toBeInTheDocument();

    // Test Arrow Right for "Know"
    fireEvent.keyDown(card, { key: "ArrowRight", code: "ArrowRight" });
    expect(mockOnKnow).toHaveBeenCalledTimes(1);

    // Test Arrow Left for "Don't Know"
    fireEvent.keyDown(card, { key: "ArrowLeft", code: "ArrowLeft" });
    expect(mockOnDontKnow).toHaveBeenCalledTimes(1);
  });

  // Additional tests could test drag behavior with more complex testing-library/user-event interactions
});
