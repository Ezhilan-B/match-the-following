import React from 'react';
import './styles/game.css';

function ScorePage() {

    return(

        <div className='container'>
            <div className='message-container'>

                <div className="message-content">congratulations {sessionStorage.getItem('username')} !! Your Score is </div>
    <div className='score'>{sessionStorage.getItem('score')}</div>

            </div>
        </div>


    )
}

export default ScorePage;