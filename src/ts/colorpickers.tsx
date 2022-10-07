import React from "react";
import { ChromePicker } from "react-color";

export class ColorPickers extends React.Component {
    render(): React.ReactNode {
        return (
            <div className="colorPickers">
                <p>ベース色</p>
                <ChromePicker />
                <p>結果色</p>
                <ChromePicker />
                <p>効果レイヤー色</p>
                <ChromePicker />
            </div>
        );
    }
}
