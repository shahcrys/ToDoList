import React, { useState } from 'react'
import { CheckCircle, Circle, Trash2, Pencil } from 'lucide-react'

const ToDoItems = ({text, id, isComplete, deleteTodo, toggle, editTodo}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(text);

    const saveEdit = () => {
        if (editText.trim()) {
            editTodo(id, editText);
        }
        setIsEditing(false);
    };

    return (
        <div className='flex items-center my-3 gap-2 group'>
            {/* Checkbox */}
            <div onClick={() => toggle(id)} className='cursor-pointer'> 
                {isComplete ? (
                    <CheckCircle className="w-8 h-8 text-green-500" />
                ) : (
                    <Circle className="w-8 h-8 text-gray-400" />
                )}
            </div>

            {/* Text or Input */}
            <div className='flex-1'>
                {isEditing ? (
                    <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={saveEdit}
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                        className="w-full text-[17px] bg-transparent border-b border-blue-400 outline-none"
                        autoFocus
                    />
                ) : (
                    <p className={`text-slate-700 text-[17px] ${isComplete ? "line-through" : ""}`}>
                        {text}
                    </p>
                )}
            </div>

            {/* Icons - show on hover */}
            <div className='hidden group-hover:flex gap-2'>
                <Pencil 
                    onClick={() => setIsEditing(true)} 
                    className='w-4 h-4 cursor-pointer text-blue-500 hover:text-blue-700' 
                />
                <Trash2 
                    onClick={() => deleteTodo(id)} 
                    className='w-4 h-4 cursor-pointer text-red-500 hover:text-red-700' 
                />
            </div>
        </div> 
    )
}

export default ToDoItems