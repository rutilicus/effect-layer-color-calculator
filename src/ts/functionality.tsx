import React from "react"

import { LayerEffect } from "./constants"

interface FunctionalityProps {
    handleImageFileSet(e: React.ChangeEvent<HTMLInputElement>): void;
    onEffectChange(e: React.ChangeEvent<HTMLSelectElement>): void;
}

export class Functionality extends React.Component<FunctionalityProps> {
    render(): React.ReactNode {
        return (
            <div className="functions">
                <div>
                    <label>レイヤー効果</label>
                    <select name="layerEffects" id="layerEffectsSelect" onChange={(e) => this.props.onEffectChange(e)}>
                        <option value={LayerEffect.EFFECT_MULTIPLY}>乗算</option>
                        <option value={LayerEffect.EFFECT_SCREEN}>スクリーン</option>
                    </select>
                </div>
                <div>
                    <p>色選択</p>
                    <div>
                        <input type="radio" id="colorSelectBase" name="colorSelect" value="colorBase" defaultChecked={true} />
                        <label htmlFor="colorSelectBase">ベース</label>
                        <input type="radio" id="colorSelectResult" name="colorSelect" value="colorResult" />
                        <label htmlFor="colorSelectResult">結果</label>
                    </div>
                </div>
                <div>
                    <p>画像を選択</p>
                    <input type="file" name="fileSelect" accept="image/*" onChange={this.props.handleImageFileSet}/>
                </div>
            </div>
        );
    }
}
