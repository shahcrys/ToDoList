import React from 'react'
import checkmark from '../assets/checkmark.png'
import not_tick from '../assets/not_tick.png'
import gar from '../assets/gar.png'


const ToDoItems = ({text, id, isComplete, deleteTodo, toggle}) => {
  return (
    <div className='flex items-center my-3 gap-2'>
        {/* ---tick or untick---*/}
        <div onClick={()=>{toggle(id)}} className='flex flex-1 items-center cursor-pointer'> 
            <img src={isComplete ? checkmark: not_tick} alt="" className="w-8 h-8" />

            <p className={`tex-slate-700 ml-4 text-[17px] decoration-slate-500
                ${isComplete ? "line-through" : "" }`}>
                {text}</p>
        </div>

        <img onClick={()=>{deleteTodo(id)}} src={gar} alt="" className='w-5 h-5 cursor-pointer' />


    </div> 
  )
}

export default ToDoItems