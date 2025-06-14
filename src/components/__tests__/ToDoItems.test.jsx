import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ToDoItems from '../ToDoItems'

describe('ToDoItems', () => {
  const mockProps = {
    id: 1,
    text: 'Test todo item',
    isComplete: false,
    deleteTodo: vi.fn(),
    toggle: vi.fn(),
    editTodo: vi.fn(),
  }

  it('renders todo item with correct text', () => {
    render(<ToDoItems {...mockProps} />)
    expect(screen.getByText('Test todo item')).toBeInTheDocument()
  })

  it('shows strikethrough when completed', () => {
    render(<ToDoItems {...mockProps} isComplete={true} />)
    const todoText = screen.getByText('Test todo item')
    expect(todoText).toHaveClass('line-through')
  })

  it('calls toggle when clicked', () => {
    render(<ToDoItems {...mockProps} />)
    fireEvent.click(screen.getByTestId('toggle-todo'))
    expect(mockProps.toggle).toHaveBeenCalledWith(1)
  })

  it('calls delete when delete button clicked', () => {
    render(<ToDoItems {...mockProps} />)
    fireEvent.click(screen.getByTestId('delete-button'))
    expect(mockProps.deleteTodo).toHaveBeenCalledWith(1)
  })
}) 