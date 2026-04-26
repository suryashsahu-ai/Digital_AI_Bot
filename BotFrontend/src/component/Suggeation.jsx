import React, { useState } from 'react'


const Suggeation = () => {
 const [ques,setQues]=useState("")
  const question = ["What services do you offer ?" ,"Tell me about your company","Why should I choose your company ? "]
  return (
    <div  className="bg-gray-900 rounded-2xl    outline-none shadow-sm shadow-blue-300 h-[50%] w-full">

      {/* Question */}
    {
      question.map((elem,idx)=>{
        return (
          <div className="w-full rounded-2xl bg-gray-600" key={idx}>
        <p
          
          className="flex-1  text-white  px-4 py-2 m-2 
        wrap-break-word whitespace-pre-wrap ">{elem}</p>
      </div>
          
        )
      })
      
    }


    </div>
  )
}

export default Suggeation