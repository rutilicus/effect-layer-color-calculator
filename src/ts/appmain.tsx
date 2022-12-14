import React from "react"
import { createRoot } from "react-dom/client"
import { ColorResult, RGBColor } from "react-color"

import { Functionality } from "./functionality"
import { ColorPickers } from "./colorpickers"
import { ImageArea } from "./imagearea"
import { LayerEffect, SettingLayer } from "./constants"

interface AppMainProps {

}
interface AppMainState {
    baseColor: RGBColor;
    effectColor: RGBColor;
    resultColor: RGBColor;
    layerEffect: LayerEffect;
    settingLayer: SettingLayer;
}

const colorWhite: RGBColor = {r: 255, g: 255, b: 255};

class AppMain extends React.Component<AppMainProps, AppMainState> {
    constructor(props) {
        super(props);

        this.setBaseColor = this.setBaseColor.bind(this);
        this.setResultColor = this.setResultColor.bind(this);
        this.onBaseColorChange = this.onBaseColorChange.bind(this);
        this.onResultColorChange = this.onResultColorChange.bind(this);
        this.onEffectChange = this.onEffectChange.bind(this);
        this.onLayerChange = this.onLayerChange.bind(this);
        this.setCurrentColor = this.setCurrentColor.bind(this);
        this.onImageClick = this.onImageClick.bind(this);

        this.state = {
            baseColor: colorWhite,
            effectColor: colorWhite,
            resultColor: colorWhite,
            layerEffect: LayerEffect.EFFECT_MULTIPLY,
            settingLayer: SettingLayer.LAYER_BASE
        };
    }

    calcurateEffectColor(baseColor: RGBColor, resultColor: RGBColor, effect: LayerEffect): RGBColor {
        let res: RGBColor = colorWhite;

        switch (effect) {
            case LayerEffect.EFFECT_MULTIPLY:
                res = {
                    r: baseColor.r == 0 ? 0 : resultColor.r / baseColor.r * 255,
                    g: baseColor.g == 0 ? 0 : resultColor.g / baseColor.g * 255, 
                    b: baseColor.b == 0 ? 0 : resultColor.b / baseColor.b * 255
                };
                break;
            case LayerEffect.EFFECT_SCREEN:
                res = {
                    r: baseColor.r == 255 ? 255 : (resultColor.r - baseColor.r) / (1 - baseColor.r / 255),
                    g: baseColor.g == 255 ? 255 : (resultColor.g - baseColor.g) / (1 - baseColor.g / 255),
                    b: baseColor.b == 255 ? 255 : (resultColor.b - baseColor.b) / (1 - baseColor.b / 255)
                };
                break;
        }

        return res;
    }

    setBaseColor(color: RGBColor) {
        this.setState({
            baseColor: color,
            effectColor: this.calcurateEffectColor(color, this.state.resultColor, this.state.layerEffect)
        });
    }

    setResultColor(color: RGBColor) {
        this.setState({
            resultColor: color,
            effectColor: this.calcurateEffectColor(this.state.baseColor, color, this.state.layerEffect)
        });
    }

    onBaseColorChange(color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) {
        this.setBaseColor(color.rgb);
    }

    onResultColorChange(color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) {
        this.setResultColor(color.rgb);
    }

    onEffectChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const effect: LayerEffect = parseInt(e.target.value);
        this.setState({
            layerEffect: effect,
            effectColor: this.calcurateEffectColor(this.state.baseColor, this.state.resultColor, effect)
        });
    }

    onLayerChange(e: React.ChangeEvent<HTMLInputElement>) {
        const layer: SettingLayer = parseInt(e.target.value);
        this.setState({ settingLayer: layer });
    }

    setCurrentColor(color: RGBColor) {
        switch (this.state.settingLayer) {
            case SettingLayer.LAYER_BASE:
                this.setBaseColor(color);
                break;
            case SettingLayer.LAYER_RESULT:
                this.setResultColor(color);
                break;
        }
    }

    onImageClick(e: React.MouseEvent<HTMLCanvasElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const canvas = e.currentTarget as HTMLCanvasElement;
        const context = canvas.getContext("2d");
        const imageData = context?.getImageData(x, y, 1, 1);

        const r = imageData?.data[0];
        const g = imageData?.data[1];
        const b = imageData?.data[2];
        if (r && g && b) {
            this.setCurrentColor({r: r, g: g, b: b});
        }
    }

    render(): React.ReactNode {
        return (
            <div>
                <div className="header">
                    <Functionality 
                        onEffectChange={this.onEffectChange}
                        onLayerChange={this.onLayerChange}/>
                </div>
                <div className="main">
                    <ColorPickers 
                        baseColor={this.state.baseColor}
                        resultColor={this.state.resultColor}
                        effectColor={this.state.effectColor}
                        onBaseColorChange={this.onBaseColorChange}
                        onResultColorChange={this.onResultColorChange}/>
                    <ImageArea onImageClick={this.onImageClick}/>
                </div>
            </div>
        );
    }
}

const container = document.getElementById("wrapper");
const root = createRoot(container!);
root.render(<AppMain />);
