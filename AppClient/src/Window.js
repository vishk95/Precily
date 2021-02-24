import { Resizable } from "re-resizable";
import React,{useState, useContext} from 'react';
import {Context} from "./Context";
import axios from 'axios';


const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };


function Window() {
    const [item, setItem] = useContext(Context);
    const [state, setState] = useState({
      text: ""
    })

    const handleChange = (e) => {
        setState({
          text: e.target.value
        })
    }

    const handleAdd = (e) => {
        e.preventDefault();
        if (!state.text) return;
        let temp = item.list
        let tempid = temp.length
        temp.push({
                    name: state.text,
                    id: tempid
                }) 
        setItem({
            'count': item.count+1,
            'list': [...temp]
        });
        setState({
            text: ""
        });

        axios({
            method: 'post',
            url: '/item',
            data: {
              name: state.text,
              id: +item.list.length-1,
              count: item.count
            }
        }, console.log("axios made"));
    }

    const handleUpdate = (id) => {
        const newData = prompt("Enter new name");
        let temp = [...item.list];
        temp[id].name = newData;
        setItem({
            'count': item.count+1,
            'list': [...temp]
        })

        axios({
            method: 'put',
            url: '/item',
            data: {
              name: newData,
              id: id,
              count: item.count
            }
        }, console.log("axios made"));
    }

    return (
        <div className="window">
            <Resizable className="sizable-div" style={style} defaultSize={{width:400, height:350}}>
                <h1>Count : {item.count}</h1>
            </Resizable>
            <Resizable className="sizable-div" style={style} defaultSize={{width:400, height:350}}>
                <ul>{(item.list) ? (item.list.map(obj => (
                    <li key={obj._id}> {obj.name}<button onClick={() => handleUpdate(obj.id)}>UPDATE</button> </li>))
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