import React from "react";
import { ChromePicker, ColorResult, RGBColor } from "react-color";

interface ColorPickersProps {
    baseColor?: RGBColor;
    effectColor?: RGBColor;
    resultColor?: RGBColor;
    onBaseColorChange(color: ColorResult, event: React.ChangeEvent<HTMLInputElement>): void;
    onResultColorChange(color: ColorResult, event: React.ChangeEvent<HTMLInputElement>): void;
}

export class ColorPickers extends React.Component<ColorPickersProps> {
    render(): React.ReactNode {
        return (
            <div className="colorPickers">
                <p>ベース色</p>
                <ChromePicker
                    color={this.props.baseColor}
                    onChange={this.props.onBaseColorChange}
                    onChangeComplete={this.props.onBaseColorChange}/>
                <p>結果色</p>
                <ChromePicker
                    color={this.props.resultColor}
                    onChange={this.props.onResultColorChange}
                    onChangeComplete={this.props.onResultColorChange}/>
                <p>効果レイヤー色</p>
                <ChromePicker color={this.props.effectColor}/>
            </div>
        );
    }
}
