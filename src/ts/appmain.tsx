import React from "react"
import ReactDom from "react-dom"

import { Functionality } from "./functionality"
import { ColorPickers } from "./colorpickers"

class AppMain extends React.Component {
    render(): React.ReactNode {
        return (
            <div>
                <Functionality />
                <ColorPickers />
                <img className="colorPickImage" src=""/>
            </div>
        );
    }
}

ReactDom.render(<AppMain />, document.getElementById("wrapper"));
