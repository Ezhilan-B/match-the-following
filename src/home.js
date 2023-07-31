import React, { useRef } from 'react';

function Home() {
    
    const name = useRef();

    const handlesubmit=(e)=>{

        e.preventDefault();
        sessionStorage.setItem('username',name.current.value);
      window.location.href = "/home";

    }
  return (
    <div className='container'>
      <div className='message-container'>
        <div className='input-container'>
        <label className='label'>Player Name</label>
        <input className='input' required ref={name}/>

        </div>
      
        <button type="submit" onClick={(e)=>handlesubmit(e)}>Submit</button>
      </div>
        
    </div>
  );
}

export default Home;
