// Game1.js
import React, { useRef, useEffect, useState } from 'react';
import './styles/game.css';
import axios from 'axios';


function Game1() {

  // const question = useRef();
  // const answer = useRef();
  const answerContainerRef =useRef();

  const [questionData,setQuestionData] = useState([]);

  const[dataToBeDisplay,setDataToBeDisplay] =useState([]);

  const [pageCount,setPageCount] = useState(0);

  const [randomNum,setRandomNum] = useState(1);

  const [activePageNum,setActivePageNum] = useState(1);

  const [lastPage,setLastPage] = useState(false);

  const apiEndpoint ='http://localhost:5000/api/';

  // const handleSubmit =(e)=>{

  //   e.preventDefault();

  //   console.log(question.current.value);

  //   const postData = {

  //       'question' : question.current.value,
  //       'answer' : answer.current.value

  //   };

  //   axios.post(apiEndpoint + 'round1addquestions', postData)
  //     .then(response => {
  //       // Handle the response data
  //       console.log('Response:', response.data);
  //      })
  //     .catch(error => {
  //     // Handle any errors that occurred during the request
  //       console.error('Error:', error);
  //     });

  // }

  useEffect(()=>{

      axios.get(apiEndpoint+'round1qa').then(res=>{

        // console.log(res.data);

        setQuestionData(res.data);

        setDataToBeDisplay(res.data.slice(0,5));

        const pagecount = res.data.length/5;

        setPageCount(Math.trunc(pagecount));

        for(let i=1;i<=pageCount;i++){

          sessionStorage.removeItem(`page `+i);

        }

      }).catch(err=>{

          console.log(err);

      })

  },[])

  const handlePageClick =(e)=>{

    if(activePageNum===(pageCount-1)){

      console.log("lastpage");

      setLastPage(true);

    }

    let answerContainers = document.getElementsByClassName('answer-container');

    let answers = [];

    for(let answercontainer of answerContainers){
      
      if(answercontainer.hasChildNodes()){

        answers.push(answercontainer.children[0].children[1].textContent)

      }else{

        answers.push(0);

      }

    }

     sessionStorage.setItem(`page `+activePageNum,JSON.stringify(answers));

    
    setDataToBeDisplay(questionData.slice(activePageNum * 5, activePageNum * 5 + 5 ))
    
    setRandomNum(activePageNum * 6)

    setActivePageNum(activePageNum+1);



  }

  const handleSubmit=(e)=>{

    let answerContainers = document.getElementsByClassName('answer-container');

    let answers = [];

    for(let answercontainer of answerContainers){
      
      if(answercontainer.hasChildNodes()){

        answers.push(answercontainer.children[0].children[1].textContent)

      }else{

        answers.push("0");

      }

    }

     sessionStorage.setItem(`page `+activePageNum,JSON.stringify(answers));

    var answer =[];
     for(let i=1;i<=pageCount;i++){

          let pageRecord = sessionStorage.getItem(`page `+i);

          answer.push(pageRecord);

     }


     var answerArray =[];

     for(let i=0;i<answer.length;i++){

        // answer[i].replace("[","");
        // answer[i].replace("]","");
        // answer[i].replace(" ","");

        var array = answer[i].split(",");

        for(let j=0;j<array.length;j++){

          answerArray.push(array[j]);

        }

     }

     const postdata = 


        questionData.map((d,index)=>{

            return(

                {

                    "question" : d.question,
                    "answer" : answerArray[index].replace("["," ").replace("]"," ").replaceAll('"','').trim(),
                    "id":d._id

                }

            )

        })

     

     console.log(postdata);

     axios.post(apiEndpoint+'round1compareanswers',{
       username : sessionStorage.getItem('username'),
       answers : postdata
     }).then((res)=>{

      console.log(res.data);
      sessionStorage.setItem('score',res.data.score);
      window.location.href="/scorePage";

     }).catch(err=>{

      console.log(err);

     })

    


  }

  const handleDragStart =(e)=>{


    let rightBox = document.getElementById('right');

    let answerBox = document.getElementById('answer');

    let selected = e.target;


    rightBox.addEventListener('dragover',(e)=>{

      e.preventDefault();

    })

    answerBox.addEventListener('dragover',(e)=>{

      e.preventDefault();
    })

    let answerContainer = document.querySelectorAll(".answer-container");

    for(let answercontainer of answerContainer){

      answercontainer.addEventListener('dragover',(e)=>{

          e.preventDefault();

      })

      answercontainer.addEventListener('drop',(e)=>{

        // console.log(e.target.hasChildNodes());

        if(!e.target.hasChildNodes()){
          
          if(selected!==null){

            answercontainer.appendChild(selected);
      
            selected=null;
      
          }

        }
        

      })

    }

    let answerList = document.querySelectorAll('.answer-list');

    for(let answerlist of answerList){

      answerlist.addEventListener('dragover',function(e){

        e.preventDefault();
  
      })
  
      answerlist.addEventListener('drop',function(e){
  
        // e.preventDefault();
        if(!e.target.hasChildNodes()){
      if(selected!==null){
  
        answerlist.appendChild(selected);
  
        selected=null;
  
      }
    }
  
  
      })

    }
   


  }

 

  return (
    <div className='container'>
      <div className='question'>
        <div className='left' id='left'>
          {dataToBeDisplay.map((d,index)=>{

            return(
            <div className="question-container" id={`question-container`+ index} key={index + randomNum}>
              <div className='question-list'  id={`question-list`+ index}>
              <ion-icon name="chatbox-outline"></ion-icon>
              <div className='question-content'  id={`question-content`+ index}>
                {d.question}
              </div>
              </div>  
            </div>)
          })}
          
        </div>
        <div className='right' id='right'>
          {dataToBeDisplay.map((d,index)=>{
            return(
            <div className='answer-container' id={`answer-container`+index} key={index + randomNum} ref={answerContainerRef}></div>)
          })}
        </div>
        <div className='answer' id='answer'>
          {
            dataToBeDisplay.map((d, index)=>{

              return(
                <div className='answer-list' id={`answer-list` + index} key={index + randomNum} >
                  <div className='draggable-answer' draggable='true' id={`draggable-answer`+index} onDragStart={(e)=>{handleDragStart(e)}}>
                    <ion-icon name="thumbs-up-outline"></ion-icon>
                    <div className='answer-content' id={`answer-content`+index}>{d.answer}</div>
                  </div>
                </div>
              )

            })
          }
        </div>
      </div>

      {/* <div>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div>
              <label>Question</label>
              <input type='text' ref={question}/>
            </div>
            <div>
              <label>answer</label>
              <input type='text' ref={answer}/>
            </div>
            <div>
                <button type='submit'>Submit</button>
            </div>
           
        </form>

    </div> */}

    {lastPage ?
      <div>
      <button className='next-btn'onClick={(e)=>{handleSubmit(e)}}>Submit ?</button>
    </div> :
    <div>
    <button className='next-btn' onClick={(e)=>{handlePageClick(e)}}>Next ></button>
  </div>  
  }

    

    {/* <ReactPaginate
      breakLabel="..."
      nextLabel="Next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      previousLabel="< Previous"
      renderOnZeroPageCount={null}
      containerClassName='pagination'
      pageClassName='page-item'
      pageLinkClassName='page-link'
      previousClassName='page-item'
      previousLinkClassName='page-link'
      nextClassName='page-item'
      nextLinkClassName='page-link'
      activeClassName='active'
    /> */}
    </div>


   
  );
}

export default Game1;
