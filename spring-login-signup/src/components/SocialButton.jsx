import React from "react";


const SocialButton = ({props})=>{
    return(
        <button className ='border-2 basis-[31%] flex justify-center py-2 rounded-md hover:drop-shadow-sm'>
            <img src={props} alt="" className='w-7'/>
        </button>

    )
}

export default SocialButton