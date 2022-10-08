import React from "react"

interface ImageAreaProps {
    imageData?: string;
}

export class ImageArea extends React.Component<ImageAreaProps> {
    render(): React.ReactNode {
        return (
            <div className="colorPickImage">
                <img src={this.props.imageData}/>
            </div>
        );
    }
}
