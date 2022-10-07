import React from "react"
import { createRoot } from "react-dom/client"

import { Functionality } from "./functionality"
import { ColorPickers } from "./colorpickers"
import { ImageArea } from "./imagearea"

interface AppMainProps {

}
interface AppMainState {
    imageData?: string;
}

class AppMain extends React.Component<AppMainProps, AppMainState> {
    constructor(props) {
        super(props);

        this.handleImageFileSet = this.handleImageFileSet.bind(this);

        this.state = {
            imageData: "",
        };
    }

    handleImageFileSet(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files && files.length > 0) {
            this.setState({ imageData: window.URL.createObjectURL(files[0])});
        }
    }

    render(): React.ReactNode {
        return (
            <div>
                <div className="header">
                    <Functionality handleImageFileSet={this.handleImageFileSet} />
                </div>
                <div className="main">
                    <ColorPickers />
                    <ImageArea imageData={this.state.imageData}/>
                </div>
            </div>
        );
    }
}

const container = document.getElementById("wrapper");
const root = createRoot(container!);
root.render(<AppMain />);
