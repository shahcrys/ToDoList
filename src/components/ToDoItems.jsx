import React from 'react'
import { CheckCircle, Circle, Trash2 } from 'lucide-react'

const ToDoItems = ({text, id, isComplete, deleteTodo, toggle}) => {
  return (
    <div className='flex items-center my-3 gap-2'>
        {/* ---tick or untick---*/}
        <div onClick={()=>{toggle(id)}} className='flex flex-1 items-center cursor-pointer'> 
            {isComplete ? (
                <CheckCircle className="w-8 h-8 text-green-500" />
            ) : (
                <Circle className="w-8 h-8 text-gray-400" />
            )}

            <p className={`tex-slate-700 ml-4 text-[17px] decoration-slate-500
                ${isComplete ? "line-through" : "" }`}>
                {text}</p>
        </div>

        <Trash2 onClick={()=>{deleteTodo(id)}} className='w-5 h-5 cursor-pointer text-red-500 hover:text-red-700' />

    </div> 
  )
}

export default ToDoItems