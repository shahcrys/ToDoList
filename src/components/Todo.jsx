import React, { useEffect, useRef, useState } from 'react'
import { ListTodo, Trash } from 'lucide-react'
import ToDoItems from './ToDoItems'

const Todo = () => {

    const [todoList, setTodoList] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [showInput, setShowInput] = useState(false);

    const inputRef = useRef();

    // Load todos from localStorage on component mount
    useEffect(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            try {
                const parsedTodos = JSON.parse(savedTodos);
                setTodoList(parsedTodos);
            } catch (error) {
                console.error("Error loading todos from localStorage:", error);
            }
        }
        setHasLoaded(true);
    }, []);

    const add = ()=>{
        if (!showInput) {
            setShowInput(true);
            // Focus the input after it appears
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
            return;
        }

        const inputText = inputRef.current.value.trim();

        if (inputText === "") {
            return null;
        }
        
        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,

        }
        setTodoList((prev)=> [...prev, newTodo]);
        inputRef.current.value = "";
        setShowInput(false);

    }

    const deleteTodo = (id)=>{
        setTodoList((prvTodos)=>{
           return prvTodos.filter((todo) => todo.id !== id)
        })

    } 

    const toggle =(id)=>{
        setTodoList((prevTodos)=>{
            return prevTodos.map((todo)=>{
                if(todo.id === id){
                    return {...todo, isComplete: !todo.isComplete}
                }
                return todo;
            })

        })

    }

    const editTodo = (id, newText) => {
        setTodoList((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, text: newText };
                }
                return todo;
            });
        });
    };

    const clearStorage = () => {
        setTodoList([]);
        localStorage.removeItem("todos");
    }

    // Save todos to localStorage whemever todoList changes (but not on initial load)
    useEffect(() => {
        if (hasLoaded) {
            localStorage.setItem("todos", JSON.stringify(todoList));
        }
    }, [todoList, hasLoaded]);

  return (
    <div className='bg-red-50 place-self-center w-11/12 max-w-md 
    flex flex-col p-7 min-h-[550px] rounded-xl relative'>

      {/* ---title---*/}
     <div className='flex items-center mt-7 gap-2'>
        <ListTodo className='w-8 h-8 text-red-500' />
        <h1 className='text-3xl font-semibold'>To-Do List </h1>

      </div>

        {/* ---input box---*/}
        <div className='flex items-center my-7 gap-3 h-14'>
            <div className='flex-1'>
                {showInput && (
                    <input 
                        ref={inputRef} 
                        className='w-full h-14 px-4 bg-white border-2 border-gray-200 rounded-xl outline-none focus:border-red-400 placeholder:text-slate-500 text-slate-700' 
                        type="text" 
                        placeholder='Add your task'
                        onKeyDown={(e) => e.key === 'Enter' && add()}
                        onBlur={() => {
                            if (inputRef.current?.value.trim() === '') {
                                setShowInput(false);
                            }
                        }}
                    />
                )}
            </div>

            <button onClick={add} className='border-none rounded-full
             bg-red-400 w-32 h-14 text-white text-lg font-medium
              cursor-pointer hover:bg-red-500 transition-colors'>ADD +</button>
        </div>

        {/* ---to do list---*/}
        <div>
            {todoList.map((item, index)=>{

                return <ToDoItems key={index} text={item.text} id={item.id} 
            isComplete={item.isComplete} deleteTodo={deleteTodo} toggle=
            {toggle} editTodo={editTodo}/>

            })}

        </div>

        {/* ---clear storage button---*/}
        <button 
            onClick={clearStorage}
            className='absolute bottom-4 right-4 bg-gray-500 hover:bg-gray-600 
            text-white p-2 rounded-full transition-colors duration-200 
            shadow-lg hover:shadow-xl'
            title='Clear all todos'
        >
            <Trash className='w-4 h-4' />
        </button>

     </div>

  )
}

export default Todo