import React from "react"

export class Functionality extends React.Component {
    render(): React.ReactNode {
        return (
            <div>
                <div>
                    <label>レイヤー効果</label>
                    <select name="layerEffects" id="layerEffectsSelect">
                        <option value="multiply">乗算</option>
                        <option value="screen">スクリーン</option>
                    </select>
                </div>
                <div>
                    <p>色選択</p>
                    <div>
                        <input type="radio" id="colorSelectBase" name="colorSelect" value="colorBase" checked={true} />
                        <label htmlFor="colorSelectBase">ベース</label>
                        <input type="radio" id="colorSelectResult" name="colorSelect" value="colorResult" />
                        <label htmlFor="colorSelectResult">結果</label>
                    </div>
                </div>
                <div>
                    <p>画像を選択</p>
                    <input type="file" name="fileSelect" accept="image/*" />
                </div>
            </div>
        );
    }
}
