var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var feng3d;
(function (feng3d) {
    /**
     * UIRenderMode for the Canvas.
     *
     * Canvas的渲染模式
     */
    var UIRenderMode;
    (function (UIRenderMode) {
        /**
         * Render at the end of the Scene using a 2D Canvas.
         *
         * 在场景的最后使用2D画布渲染。
         */
        UIRenderMode[UIRenderMode["ScreenSpaceOverlay"] = 0] = "ScreenSpaceOverlay";
        /**
         * Render using the Camera configured on the Canvas.
         *
         * 使用在画布上配置的摄像机进行渲染。
         */
        UIRenderMode[UIRenderMode["ScreenSpaceCamera"] = 1] = "ScreenSpaceCamera";
        /**
         * Render using any Camera in the Scene that can render the layer.
         *
         * 使用场景中任何可以渲染图层的相机渲染。
         */
        UIRenderMode[UIRenderMode["WorldSpace"] = 2] = "WorldSpace";
    })(UIRenderMode = feng3d.UIRenderMode || (feng3d.UIRenderMode = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * Element that can be used for screen rendering.
     *
     * 能够被用于屏幕渲染的元素
     */
    var Canvas = /** @class */ (function (_super) {
        __extends(Canvas, _super);
        function Canvas() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * Is the Canvas in World or Overlay mode?
             *
             * 画布是在世界或覆盖模式?
             */
            _this.renderMode = feng3d.UIRenderMode.ScreenSpaceOverlay;
            return _this;
        }
        return Canvas;
    }(feng3d.Behaviour));
    feng3d.Canvas = Canvas;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 图片组件
     */
    var Image = /** @class */ (function (_super) {
        __extends(Image, _super);
        function Image() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.geometry = feng3d.Geometry.getDefault("Quad");
            _this.castShadows = false;
            _this.receiveShadows = false;
            _this.width = 1;
            _this.height = 1;
            /**
             * The source texture of the Image element.
             *
             * 图像元素的源纹理。
             */
            _this.image = feng3d.Texture2D.default;
            /**
             * Tinting color for this Image.
             *
             * 为该图像着色。
             */
            _this.color = new feng3d.Color4();
            // @oav({ exclude: true })
            _this.material = feng3d.Material.getDefault("Default-Image");
            return _this;
        }
        Image.prototype.beforeRender = function (gl, renderAtomic, scene, camera) {
            _super.prototype.beforeRender.call(this, gl, renderAtomic, scene, camera);
            renderAtomic.uniforms.s_texture = this.image;
            renderAtomic.uniforms.u_color = this.color;
        };
        __decorate([
            feng3d.oav({ exclude: true })
        ], Image.prototype, "geometry", void 0);
        __decorate([
            feng3d.oav({ exclude: true })
        ], Image.prototype, "castShadows", void 0);
        __decorate([
            feng3d.oav({ exclude: true })
        ], Image.prototype, "receiveShadows", void 0);
        __decorate([
            feng3d.oav()
        ], Image.prototype, "width", void 0);
        __decorate([
            feng3d.oav()
        ], Image.prototype, "height", void 0);
        __decorate([
            feng3d.oav(),
            feng3d.serialize
        ], Image.prototype, "image", void 0);
        __decorate([
            feng3d.oav(),
            feng3d.serialize
        ], Image.prototype, "color", void 0);
        return Image;
    }(feng3d.Model));
    feng3d.Image = Image;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 字体
     */
    var FontFamily;
    (function (FontFamily) {
        FontFamily["serif"] = "serif";
        FontFamily["sans-serif"] = "sans-serif";
        FontFamily["monospace"] = "monospace";
        FontFamily["cursive"] = "cursive";
        FontFamily["fantasy"] = "fantasy";
        FontFamily["system-ui"] = "system-ui";
    })(FontFamily = feng3d.FontFamily || (feng3d.FontFamily = {}));
    /**
     * 字体样式
     */
    var FontStyle;
    (function (FontStyle) {
        FontStyle["normal"] = "normal";
        FontStyle["bold"] = "bold";
        FontStyle["italic"] = "italic";
        FontStyle["bold italic"] = "bold italic";
    })(FontStyle = feng3d.FontStyle || (feng3d.FontStyle = {}));
    // export enum CanvasTextBaseline
    // {
    //     "top" = "top",
    //     "hanging" = "hanging",
    //     "middle" = "middle",
    //     "alphabetic" = "alphabetic",
    //     "ideographic" = "ideographic",
    //     "bottom" = "bottom",
    // }
    /**
     * 水平对齐方式
     */
    var HorizontalAlign;
    (function (HorizontalAlign) {
        HorizontalAlign["left"] = "left";
        HorizontalAlign["center"] = "center";
        HorizontalAlign["right"] = "right";
    })(HorizontalAlign = feng3d.HorizontalAlign || (feng3d.HorizontalAlign = {}));
    /**
     * 垂直对齐方式
     */
    var VerticalAlign;
    (function (VerticalAlign) {
        VerticalAlign["top"] = "top";
        VerticalAlign["middle"] = "middle";
        VerticalAlign["bottom"] = "bottom";
    })(VerticalAlign = feng3d.VerticalAlign || (feng3d.VerticalAlign = {}));
    /**
     * 文本样式
     */
    var TextStyle = /** @class */ (function () {
        function TextStyle() {
            /**
             * 背景颜色，默认透明背景。
             */
            this.backgroundColor = new feng3d.Color4(0, 0, 0, 0);
            /**
             * 字体尺寸。
             */
            this.fontSize = 42;
            /**
             * 字体样式。
             */
            this.fontStyle = FontStyle.normal;
            /**
             * 字体类型。
             */
            this.fontFamily = FontFamily["sans-serif"];
            /**
             * 字体颜色。
             */
            this.fontColor = new feng3d.Color4(0, 0, 0, 1);
            // /**
            //  * 文本基线，决定文字垂直方向的对齐方式。
            //  */
            // @oav({ tooltip: "文本基线，决定文字垂直方向的对齐方式。", component: "OAVEnum", componentParam: { enumClass: CanvasTextBaseline } })
            // @serialize
            // textBaseline = CanvasTextBaseline.alphabetic;
            /**
             * 阴影颜色。
             */
            this.shadowColor = new feng3d.Color4(0, 0, 0, 1);
            /**
             * X轴方向阴影偏移。
             */
            this.shadowOffsetX = 3;
            /**
             * Y轴方向阴影偏移。
             */
            this.shadowOffsetY = 3;
            /**
             * 阴影模糊度。
             */
            this.shadowBlur = 4;
            /**
             * 水平对齐方式。
             */
            this.horizontalAlign = HorizontalAlign.left;
            /**
             * 垂直对齐方式。
             */
            this.verticalAlign = VerticalAlign.top;
        }
        __decorate([
            feng3d.oav({ tooltip: "背景颜色，默认透明背景。" }),
            feng3d.serialize
        ], TextStyle.prototype, "backgroundColor", void 0);
        __decorate([
            feng3d.oav({ tooltip: "字体尺寸。" }),
            feng3d.serialize
        ], TextStyle.prototype, "fontSize", void 0);
        __decorate([
            feng3d.oav({ tooltip: "字体样式。", component: "OAVEnum", componentParam: { enumClass: FontStyle } }),
            feng3d.serialize
        ], TextStyle.prototype, "fontStyle", void 0);
        __decorate([
            feng3d.oav({ tooltip: "字体类型。", component: "OAVEnum", componentParam: { enumClass: FontFamily } }),
            feng3d.serialize
        ], TextStyle.prototype, "fontFamily", void 0);
        __decorate([
            feng3d.oav({ tooltip: "字体颜色。" }),
            feng3d.serialize
        ], TextStyle.prototype, "fontColor", void 0);
        __decorate([
            feng3d.oav({ tooltip: "阴影颜色。" }),
            feng3d.serialize
        ], TextStyle.prototype, "shadowColor", void 0);
        __decorate([
            feng3d.oav({ tooltip: "X轴方向阴影偏移。" }),
            feng3d.serialize
        ], TextStyle.prototype, "shadowOffsetX", void 0);
        __decorate([
            feng3d.oav({ tooltip: "Y轴方向阴影偏移。" }),
            feng3d.serialize
        ], TextStyle.prototype, "shadowOffsetY", void 0);
        __decorate([
            feng3d.oav({ tooltip: "阴影模糊度。" }),
            feng3d.serialize
        ], TextStyle.prototype, "shadowBlur", void 0);
        __decorate([
            feng3d.oav({ tooltip: "水平对齐方式。", component: "OAVEnum", componentParam: { enumClass: HorizontalAlign } }),
            feng3d.serialize
        ], TextStyle.prototype, "horizontalAlign", void 0);
        __decorate([
            feng3d.oav({ tooltip: "垂直对齐方式。", component: "OAVEnum", componentParam: { enumClass: VerticalAlign } }),
            feng3d.serialize
        ], TextStyle.prototype, "verticalAlign", void 0);
        return TextStyle;
    }());
    feng3d.TextStyle = TextStyle;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    function drawText(text, width, height, style) {
        var canvas = document.createElement('canvas');
        if (!canvas) {
            console.log('Failed to create canvas');
            return null;
        }
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        if (!ctx) {
            console.log('Failed to get rendering context for 2d context');
            return null;
        }
        // Clear <canvas> with a white
        ctx.fillStyle = style.backgroundColor.toRGBA();
        ctx.fillRect(0, 0, width, height);
        // Set text properties
        ctx.font = style.fontSize + "px " + style.fontStyle + " " + style.fontFamily;
        ctx.fillStyle = style.fontColor.toRGBA();
        ctx.shadowColor = style.shadowColor.toRGBA();
        ctx.shadowOffsetX = style.shadowOffsetX;
        ctx.shadowOffsetY = style.shadowOffsetY;
        ctx.shadowBlur = style.shadowBlur;
        // Draw a text
        var textWidth = ctx.measureText(text).width;
        var x = 0;
        var y = 0;
        if (style.horizontalAlign == feng3d.HorizontalAlign.left)
            x = 0;
        else if (style.horizontalAlign == feng3d.HorizontalAlign.center)
            x = (width - textWidth) / 2;
        else if (style.horizontalAlign == feng3d.HorizontalAlign.right)
            x = width - textWidth;
        if (style.verticalAlign == feng3d.VerticalAlign.top)
            y = 0;
        else if (style.verticalAlign == feng3d.VerticalAlign.middle)
            y = height / 2;
        else if (style.verticalAlign == feng3d.VerticalAlign.bottom)
            y = height;
        ctx.textBaseline = style.verticalAlign;
        ctx.fillText(text, x, y);
        var imagedata = ctx.getImageData(0, 0, width, height);
        return imagedata;
    }
    feng3d.drawText = drawText;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 文本组件
     */
    var Text = /** @class */ (function (_super) {
        __extends(Text, _super);
        function Text() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.geometry = feng3d.Geometry.getDefault("Quad");
            _this.castShadows = false;
            _this.receiveShadows = false;
            _this.width = 256;
            _this.height = 256;
            _this.text = "Hello 🌷 world";
            /**
             * The source texture of the Image element.
             *
             * 图像元素的源纹理。
             */
            _this.image = new feng3d.Texture2D();
            /**
             * Tinting color for this Image.
             *
             * 为该图像着色。
             */
            _this.color = new feng3d.Color4();
            _this.style = new feng3d.TextStyle();
            // @oav({ exclude: true })
            _this.material = feng3d.Material.getDefault("Default-Image");
            return _this;
        }
        Text.prototype.beforeRender = function (gl, renderAtomic, scene, camera) {
            _super.prototype.beforeRender.call(this, gl, renderAtomic, scene, camera);
            this.image["_pixels"] = feng3d.drawText(this.text, this.width, this.height, this.style);
            this.image.invalidate();
            renderAtomic.uniforms.s_texture = this.image;
            renderAtomic.uniforms.u_color = this.color;
        };
        __decorate([
            feng3d.oav({ exclude: true })
        ], Text.prototype, "geometry", void 0);
        __decorate([
            feng3d.oav({ exclude: true })
        ], Text.prototype, "castShadows", void 0);
        __decorate([
            feng3d.oav({ exclude: true })
        ], Text.prototype, "receiveShadows", void 0);
        __decorate([
            feng3d.oav()
        ], Text.prototype, "width", void 0);
        __decorate([
            feng3d.oav()
        ], Text.prototype, "height", void 0);
        __decorate([
            feng3d.oav()
        ], Text.prototype, "text", void 0);
        __decorate([
            feng3d.oav(),
            feng3d.serialize
        ], Text.prototype, "color", void 0);
        __decorate([
            feng3d.oav(),
            feng3d.serialize
        ], Text.prototype, "style", void 0);
        return Text;
    }(feng3d.Model));
    feng3d.Text = Text;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var ImageUniforms = /** @class */ (function () {
        function ImageUniforms() {
            /**
             * 颜色
             */
            this.u_color = new feng3d.Color4();
            /**
             * 纹理数据
             */
            this.s_texture = feng3d.Texture2D.default;
        }
        __decorate([
            feng3d.serialize,
            feng3d.oav()
        ], ImageUniforms.prototype, "u_color", void 0);
        __decorate([
            feng3d.oav(),
            feng3d.serialize
        ], ImageUniforms.prototype, "s_texture", void 0);
        return ImageUniforms;
    }());
    feng3d.ImageUniforms = ImageUniforms;
    feng3d.shaderConfig.shaders["image"] = {
        vertex: "\n    attribute vec3 a_position;\n    attribute vec2 a_uv;\n    \n    varying vec2 v_uv;\n    uniform mat4 u_modelMatrix;\n    uniform mat4 u_viewProjection;\n    \n    void main() \n    {\n        gl_Position = u_viewProjection * u_modelMatrix * vec4(a_position, 1.0);\n        v_uv = a_uv;\n    }\n    ",
        fragment: "\n    precision mediump float;\n\n    uniform sampler2D s_texture;\n    varying vec2 v_uv;\n    \n    uniform vec4 u_color;\n    \n    void main() {\n    \n        vec4 color = texture2D(s_texture, v_uv);\n        gl_FragColor = color * u_color;\n    }\n    \n    ",
        cls: ImageUniforms,
        renderParams: { cullFace: feng3d.CullFace.NONE, enableBlend: true },
    };
    feng3d.Material.setDefault("Default-Image", { shaderName: "image" });
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    feng3d.functionwrap.extendFunction(feng3d.GameObject, "createPrimitive", function (g, type) {
        if (type == "Image") {
            g.addComponent(feng3d.Image);
        }
        else if (type == "Text") {
            g.addComponent(feng3d.Text);
        }
        return g;
    });
})(feng3d || (feng3d = {}));
//# sourceMappingURL=feng2d.js.map