import React from "react"

import { LayerEffect, SettingLayer } from "./constants"

interface FunctionalityProps {
    onEffectChange(e: React.ChangeEvent<HTMLSelectElement>): void;
    onLayerChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export class Functionality extends React.Component<FunctionalityProps> {
    constructor(props) {
        super(props);

        this.handleImageFileSet = this.handleImageFileSet.bind(this);
    }

    handleImageFileSet(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files && files.length > 0) {
            const canvas = document.getElementById("colorPickImageCanvas")! as HTMLCanvasElement;
            const image = new Image();
            image.src = window.URL.createObjectURL(files[0]);
            image.onload = () => {
                canvas.width = image.width;
                canvas.height = image.height;
                canvas.getContext("2d")?.drawImage(image, 0, 0, image.width, image.height);
            };
        }
    }

    render(): React.ReactNode {
        return (
            <div className="functions">
                <div>
                    <label>レイヤー効果</label>
                    <select name="layerEffects" id="layerEffectsSelect" onChange={this.props.onEffectChange}>
                        <option value={LayerEffect.EFFECT_MULTIPLY}>乗算</option>
                        <option value={LayerEffect.EFFECT_SCREEN}>スクリーン</option>
                    </select>
                </div>
                <div>
                    <p>色選択</p>
                    <div>
                        <input
                            type="radio"
                            id="colorSelectBase"
                            name="colorSelect"
                            value={SettingLayer.LAYER_BASE}
                            onChange={this.props.onLayerChange}
                            defaultChecked={true} />
                        <label htmlFor="colorSelectBase">ベース</label>
                        <input 
                            type="radio"
                            id="colorSelectResult"
                            name="colorSelect"
                            value={SettingLayer.LAYER_RESULT}
                            onChange={this.props.onLayerChange}/>
                        <label htmlFor="colorSelectResult">結果</label>
                    </div>
                </div>
                <div>
                    <p>画像を選択</p>
                    <input type="file" name="fileSelect" accept="image/*" onChange={this.handleImageFileSet}/>
                </div>
            </div>
        );
    }
}
