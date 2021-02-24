import { Resizable } from "re-resizable"; //opensource library for resizable divs
import React,{useState, useContext} from 'react';
import {Context} from "./Context";
import axios from 'axios'; //axios to make easy http requests

//default style for Reziable component
const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

//container for all resizable components
function Window() {
    const [item, setItem] = useContext(Context); 
    const [state, setState] = useState({
      text: ""
    })

    //handle input value change
    const handleChange = (e) => {
        setState({
          text: e.target.value
        })
    }

    //Adds new item to list
    const handleAdd = (e) => {
        e.preventDefault(); //prevent submit events default behaviour
        if (!state.text) return;
        let temp = item.list; 
        let tempid = temp.length
        temp.push({ //pushing new item object in list
                    name: state.text,
                    id: tempid
                }) 
        setItem({   //setting updated context
            'count': item.count+1,
            'list': [...temp]
        });
        setState({  //resetting component state
            text: ""
        });

        axios({     //making POST request to add new item at db
            method: 'post',
            url: '/item',
            data: { //data sent in res object
              name: state.text,
              id: +item.list.length-1,
              count: item.count
            }
        }, console.log("axios POST made"));
    }

    //update existing list item
    const handleUpdate = (id) => {
        const newData = prompt("Enter new name");
        let temp = [...item.list];
        temp[id].name = newData;
        setItem({   //updating list
            'count': item.count+1,
            'list': [...temp]
        })

        axios({     //PUT request to edit list item on db
            method: 'put',
            url: '/item',
            data: {
              name: newData,
              id: id,
              count: item.count
            }
        }, console.log("axios PUT made"));
    }

    return (
        <div className="window">
            <Resizable className="sizable-div" style={style} defaultSize={{width:400, height:350}}>
                <h1>Count : {item.count}</h1>
            </Resizable>
            <Resizable className="sizable-div" style={style} defaultSize={{width:400, height:350}}>
                <ul>
                    {
                        (item.list) ? 
                        (item.list.map(obj => (
                            <li key={obj._id}> {obj.name}
                                <button onClick={() => handleUpdate(obj.id)}>UPDATE</button>
                            </li>))
                        ) : <li></li>
                    }
                </ul>
            </Resizable>
            <Resizable className="sizable-div" style={style} defaultSize={{width:800, height:200}}>
                <form className="Container">
                    <input type="text" placeholder="Add data" onChange={handleChange} onSubmit={handleAdd} value={state.text}></input>
                    <button type="submit" onClick={handleAdd}>ADD</button>
                </form>
            </Resizable>
        </div>
    );
}

export default Window;