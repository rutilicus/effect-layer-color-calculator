import React from "react"
import ReactDom from "react-dom"

class AppMain extends React.Component {
    render(): React.ReactNode {
        return(
            <div></div>
        );
    }
}

ReactDom.render(<AppMain />, document.getElementById("wrapper"));
