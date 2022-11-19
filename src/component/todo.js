 import React,{useEffect, useState} from 'react'
 import im from "../image/im.jfif"
 import "../index.css"
 const getLocalItems=()=>{
    let list=localStorage.getItem("list");
    if(list){
        return JSON.parse(list)
    }
    else{
        return []
    }
 }
  const Todo = () => { 
    const [inputData,setInputData]=useState("");
    const [items,setItems]=useState(getLocalItems());
    const [toogleSubmit,setToogeleSubmit]=useState(true);
    const [isEditItem,setIsEditItem]=useState(null);
    const addItem=()=>{
        if(!inputData){
           alert("fill the data");
        }
        else if(inputData && !toogleSubmit){
          setItems(
            items.map((ele)=>{
                if(ele.id===isEditItem){
                    return {...ele,name:inputData}
                }
                return ele;

            })
          )
            setToogeleSubmit(true); 
            setInputData("");
            setIsEditItem(null);
        }
        else{
        const allInputData={id:new Date().getTime().toString(),name:inputData}
        setItems([...items,allInputData])
        setInputData("");
        
        }
    }
    const deleteItem=(id)=>{
       const updatedItems=items.filter((elem)=>{
              return elem.id !==id;
       })
       setItems(updatedItems);
    }
    const removeAll=()=>{
        setItems([]);
    }
    const editItem=(id,name)=>{
            let newEditItem=items.find((elem)=>{
                return elem.id===id;
            })
            setToogeleSubmit(false);
            setInputData(newEditItem.name);
            setIsEditItem(id);


            

    }
    useEffect(()=>{
          localStorage.setItem('list',JSON.stringify(items));
    },[items])
   return (
     <>
     <div className="main-div">
        <div className='child-div'>
            <figure>
               <img src={im} alt="todologo"/>
               <figcaption>
                Add Your List Here 
               </figcaption>
            </figure>
            <div className="additems">
                 <input type="text" placeholder='Add Items' value={inputData} onChange={(e)=>setInputData(e.target.value)}/>
                 {
                    toogleSubmit ?   <i className='fa fa-plus add-btn' title='Add Items' onClick={addItem}></i> :
                    <i className='far fa-edit add-btn green' title='Update Item' onClick={addItem}></i> 
                 }
              

            </div>
            <div className="show-items">
              
                    {
                        items.map((elem)=>{
                            return(
                                <div className='eachItem' key={elem.id}>
                                     <h3>{elem.name}</h3>
                                     <div className='todo-btn'>
                                     <i className="far fa-edit add-btn" title="edit-items" onClick={()=>editItem(elem.id)}></i>
                    <i className="far fa-trash-alt add-btn" title="delete-items" onClick={()=>deleteItem(elem.id,elem.name)}></i>
                    </div>
                </div>  
                            )
                        })
                    }
                
            </div>
            <div className='showItems'>
                <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
                    <span>
                    Check List
                    </span>
                </button>
            </div>
               
        </div>
     </div>
     </>
   )
 }
 export default Todo