import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Todo from '../Todo'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

describe('Todo Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  it('renders title and ADD button', () => {
    render(<Todo />)
    expect(screen.getByText('To-Do List')).toBeInTheDocument()
    expect(screen.getByText('ADD +')).toBeInTheDocument()
  })

  it('shows input when ADD button is clicked', async () => {
    render(<Todo />)
    fireEvent.click(screen.getByText('ADD +'))
    expect(screen.getByPlaceholderText('Add your task')).toBeInTheDocument()
  })

  it('adds new todo', async () => {
    render(<Todo />)
    
    // Show input and add todo
    fireEvent.click(screen.getByText('ADD +'))
    const input = screen.getByPlaceholderText('Add your task')
    
    await userEvent.type(input, 'New todo')
    fireEvent.click(screen.getByText('ADD +'))
    
    expect(screen.getByText('New todo')).toBeInTheDocument()
  })

  it('does not add empty todos', async () => {
    render(<Todo />)
    
    // Click ADD twice without typing
    fireEvent.click(screen.getByText('ADD +'))
    fireEvent.click(screen.getByText('ADD +'))
    
    expect(screen.queryByTestId('todo-item')).not.toBeInTheDocument()
  })

  it('toggles todo completion', async () => {
    render(<Todo />)
    
    // Add todo
    fireEvent.click(screen.getByText('ADD +'))
    await userEvent.type(screen.getByPlaceholderText('Add your task'), 'Test todo')
    fireEvent.click(screen.getByText('ADD +'))
    
    // Toggle it
    fireEvent.click(screen.getByTestId('toggle-todo'))
    
    await waitFor(() => {
      expect(screen.getByText('Test todo')).toHaveClass('line-through')
    })
  })

  it('loads todos from localStorage', async () => {
    const savedTodos = [{ id: 1, text: 'Saved todo', isComplete: false }]
    localStorageMock.getItem.mockReturnValue(JSON.stringify(savedTodos))
    
    render(<Todo />)
    
    await waitFor(() => {
      expect(screen.getByText('Saved todo')).toBeInTheDocument()
    })
  })
}) 