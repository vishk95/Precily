import axios from 'axios';
import React,{createContext ,useEffect} from 'react';

export const Context = createContext();
export const ContextProvider = (props) => {
  
//To get data from database and save it on client context, so that we have access to whole list right from start
  useEffect(() => {
    axios({
      method: "get",
      withCredentials: true,
      url: "/item"

    }).then((res) => {
      setItem(res.data);
      console.log(res.data)
    });
  }, []);

  const [item, setItem] = React.useState(
    {}
  );


  return(
    <Context.Provider value={[item, setItem]}>
      {props.children}
    </Context.Provider>
  );
}