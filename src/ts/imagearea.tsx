import React from "react"

interface ImageAreaProps {
    imageData?: string;
}

export class ImageArea extends React.Component<ImageAreaProps> {
    render(): React.ReactNode {
        return <img className="colorPickImage" src={this.props.imageData}/>
    }
}
