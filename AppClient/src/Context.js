import axios from 'axios';
import React,{createContext ,useEffect} from 'react';

export const Context = createContext();
export const ContextProvider = (props) => {
  
//To get data from database and save it on client context, so that we have access to whole list right from start
/*  useEffect(() => {
    axios({
      method: "get",
      withCredentials: true,
      url: "/data"

    }).then((res) => {
      setData(res.data)
    });
  }, []);
*/
  const [data, setData] = React.useState(
    {
        'count': 0,
        'list': [{
                name: 'first',
                id: 0
            },
            {
                name: 'second',
                id: 1
            }
        ]
    }
  );


  return(
    <Context.Provider value={[data, setData]}>
      {props.children}
    </Context.Provider>
  );
}