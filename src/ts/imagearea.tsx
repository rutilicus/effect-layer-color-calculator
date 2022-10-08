import React from "react"

interface ImageAreaProps {
    onImageClick(e: React.MouseEvent<HTMLCanvasElement>): void;
}

export class ImageArea extends React.Component<ImageAreaProps> {
    render(): React.ReactNode {
        return (
            <div className="colorPickImage">
                <canvas id="colorPickImageCanvas" onClick={this.props.onImageClick}/>
            </div>
        );
    }
}
