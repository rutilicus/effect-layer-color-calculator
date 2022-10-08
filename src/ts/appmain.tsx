import React from "react"
import { createRoot } from "react-dom/client"
import { ColorResult, RGBColor } from "react-color"

import { Functionality } from "./functionality"
import { ColorPickers } from "./colorpickers"
import { ImageArea } from "./imagearea"
import { LayerEffect } from "./constants"

interface AppMainProps {

}
interface AppMainState {
    imageData: string;
    baseColor: RGBColor;
    effectColor: RGBColor;
    resultColor: RGBColor;
    layerEffect: LayerEffect;
}

const colorWhite: RGBColor = {r: 255, g: 255, b: 255};

class AppMain extends React.Component<AppMainProps, AppMainState> {
    constructor(props) {
        super(props);

        this.handleImageFileSet = this.handleImageFileSet.bind(this);
        this.onBaseColorChange = this.onBaseColorChange.bind(this);
        this.onResultColorChange = this.onResultColorChange.bind(this);
        this.onEffectChange = this.onEffectChange.bind(this);

        this.state = {
            imageData: "",
            baseColor: colorWhite,
            effectColor: colorWhite,
            resultColor: colorWhite,
            layerEffect: LayerEffect.EFFECT_MULTIPLY
        };
    }
colorPickImage
    handleImageFileSet(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files && files.length > 0) {
            this.setState({ imageData: window.URL.createObjectURL(files[0])});
        }
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

    onBaseColorChange(color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) {
        const baseColor = color.rgb;
        this.setState({
            baseColor: baseColor,
            effectColor: this.calcurateEffectColor(baseColor, this.state.resultColor, this.state.layerEffect)
        });
    }

    onResultColorChange(color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) {
        const resultColor = color.rgb;
        this.setState({
            resultColor: resultColor,
            effectColor: this.calcurateEffectColor(this.state.baseColor, resultColor, this.state.layerEffect)
        });
    }

    onEffectChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const effect: LayerEffect = parseInt(e.target.value);
        this.setState({
            layerEffect: effect,
            effectColor: this.calcurateEffectColor(this.state.baseColor, this.state.resultColor, effect)
        });
    }

    render(): React.ReactNode {
        return (
            <div>
                <div className="header">
                    <Functionality
                        handleImageFileSet={this.handleImageFileSet}
                        onEffectChange={this.onEffectChange}/>
                </div>
                <div className="main">
                    <ColorPickers 
                        baseColor={this.state.baseColor}
                        resultColor={this.state.resultColor}
                        effectColor={this.state.effectColor}
                        onBaseColorChange={this.onBaseColorChange}
                        onResultColorChange={this.onResultColorChange}/>
                    <ImageArea imageData={this.state.imageData}/>
                </div>
            </div>
        );
    }
}

const container = document.getElementById("wrapper");
const root = createRoot(container!);
root.render(<AppMain />);
