import { Resizable } from "re-resizable";

const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

function Window() {
    return (
        <div className="window">
            <Resizable className="sizable-div" style={style} defaultSize={{width:400, height:350}}>
                <h1>Count : {}</h1>
            </Resizable>
            <Resizable className="sizable-div" style={style} defaultSize={{width:400, height:350}}>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </Resizable>
            <Resizable className="sizable-div" style={style} defaultSize={{width:800, height:200}}>
                Sample with default size
            </Resizable>
        </div>
    );
}

export default Window;