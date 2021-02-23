import { Resizable } from "re-resizable";
import React,{useState, useContext} from 'react';
import {Context} from "./Context"

const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };


function Window() {
    const [data, setData] = useContext(Context);
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
        let temp = data.list
        let tempid = temp.length
        temp.push({
                    name: state.text+tempid,
                    id: tempid
                }) 
        setData({
            'count': data.count+1,
            'list': [...temp]
        });
        setState({
            text: ""
        });
    }

    const handleUpdate = (id) => {
        const newData = prompt("Enter new name");
        let temp = [...data.list];
        temp[id].name = newData;
        setData({
            'count': data.count+1,
            'list': [...temp]
        })
    }

    return (
        <div className="window">
            <Resizable className="sizable-div" style={style} defaultSize={{width:400, height:350}}>
                <h1>Count : {data.count}</h1>
            </Resizable>
            <Resizable className="sizable-div" style={style} defaultSize={{width:400, height:350}}>
                <ul>{data.list.map(obj => (
                    <li key={obj.id}> {obj.name}<button onClick={() => handleUpdate(obj.id)}>UPDATE</button> </li>))}
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