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
     * 绘制文本
     *
     * @param canvas 画布
     * @param _text 文本
     * @param style 文本样式
     * @param resolution 分辨率
     */
    function drawText(canvas, _text, style, resolution) {
        if (resolution === void 0) { resolution = 1; }
        canvas = canvas || document.createElement("canvas");
        var _font = style.toFontString();
        var context = canvas.getContext('2d');
        var measured = feng3d.TextMetrics.measureText(_text || ' ', style, style.wordWrap, canvas);
        var width = measured.width;
        var height = measured.height;
        var lines = measured.lines;
        var lineHeight = measured.lineHeight;
        var lineWidths = measured.lineWidths;
        var maxLineWidth = measured.maxLineWidth;
        var fontProperties = measured.fontProperties;
        canvas.width = Math.ceil((Math.max(1, width) + (style.padding * 2)) * resolution);
        canvas.height = Math.ceil((Math.max(1, height) + (style.padding * 2)) * resolution);
        context.scale(resolution, resolution);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = _font;
        context.lineWidth = style.strokeThickness;
        context.textBaseline = style.textBaseline;
        context.lineJoin = style.lineJoin;
        context.miterLimit = style.miterLimit;
        var linePositionX;
        var linePositionY;
        // 需要2个通过如果一个阴影;第一个绘制投影，第二个绘制文本
        var passesCount = style.dropShadow ? 2 : 1;
        for (var i = 0; i < passesCount; ++i) {
            var isShadowPass = style.dropShadow && i === 0;
            var dsOffsetText = isShadowPass ? height * 2 : 0; // 我们只想要投影，所以把文本放到屏幕外
            var dsOffsetShadow = dsOffsetText * resolution;
            if (isShadowPass) {
                // 在Safari上，带有渐变和阴影的文本不能正确定位
                // 如果画布的比例不是1: https://bugs.webkit.org/show_bug.cgi?id=197689
                // 因此，我们将样式设置为纯黑色，同时生成这个投影
                context.fillStyle = 'black';
                context.strokeStyle = 'black';
                context.shadowColor = style.dropShadowColor.toRGBA();
                context.shadowBlur = style.dropShadowBlur;
                context.shadowOffsetX = Math.cos(style.dropShadowAngle * Math.DEG2RAD) * style.dropShadowDistance;
                context.shadowOffsetY = (Math.sin(style.dropShadowAngle * Math.DEG2RAD) * style.dropShadowDistance) + dsOffsetShadow;
            }
            else {
                // 设置画布文本样式
                context.fillStyle = _generateFillStyle(canvas, style, lines, resolution);
                context.strokeStyle = style.stroke.toRGBA();
                context.shadowColor = "";
                context.shadowBlur = 0;
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
            }
            // 一行一行绘制
            for (var i_1 = 0; i_1 < lines.length; i_1++) {
                linePositionX = style.strokeThickness / 2;
                linePositionY = ((style.strokeThickness / 2) + (i_1 * lineHeight)) + fontProperties.ascent;
                if (style.align === 'right') {
                    linePositionX += maxLineWidth - lineWidths[i_1];
                }
                else if (style.align === 'center') {
                    linePositionX += (maxLineWidth - lineWidths[i_1]) / 2;
                }
                if (style.stroke && style.strokeThickness) {
                    drawLetterSpacing(canvas, style, lines[i_1], linePositionX + style.padding, linePositionY + style.padding - dsOffsetText, true);
                }
                if (style.fill) {
                    drawLetterSpacing(canvas, style, lines[i_1], linePositionX + style.padding, linePositionY + style.padding - dsOffsetText);
                }
            }
        }
        // 除去透明边缘。
        if (style.trim) {
            var trimmed = trimCanvas(canvas);
            if (trimmed.data) {
                canvas.width = trimmed.width;
                canvas.height = trimmed.height;
                context.putImageData(trimmed.data, 0, 0);
            }
        }
        return canvas;
    }
    feng3d.drawText = drawText;
    /**
     * 生成填充样式。可以自动生成一个基于填充样式为数组的渐变。
     *
     * @param style 文本样式。
     * @param lines 多行文本。
     * @return 填充样式。
     */
    function _generateFillStyle(canvas, style, lines, resolution) {
        if (resolution === void 0) { resolution = 1; }
        var context = canvas.getContext('2d');
        var stylefill = style.fill;
        if (!Array.isArray(stylefill)) {
            return stylefill.toRGBA();
        }
        else if (stylefill.length === 1) {
            return stylefill[0];
        }
        // 画布颜色渐变。
        var gradient;
        var totalIterations;
        var currentIteration;
        var stop;
        var width = Math.ceil(canvas.width / resolution);
        var height = Math.ceil(canvas.height / resolution);
        var fill = stylefill.slice();
        var fillGradientStops = style.fillGradientStops.slice();
        // 初始化渐变关键帧
        if (!fillGradientStops.length) {
            var lengthPlus1 = fill.length + 1;
            for (var i = 1; i < lengthPlus1; ++i) {
                fillGradientStops.push(i / lengthPlus1);
            }
        }
        // 设置渐变起点与终点。
        fill.unshift(stylefill[0]);
        fillGradientStops.unshift(0);
        fill.push(stylefill[stylefill.length - 1]);
        fillGradientStops.push(1);
        if (style.fillGradientType === feng3d.TEXT_GRADIENT.LINEAR_VERTICAL) {
            // 创建纵向渐变
            gradient = context.createLinearGradient(width / 2, 0, width / 2, height);
            // 我们需要重复渐变，这样每一行文本都有相同的垂直渐变效果
            totalIterations = (fill.length + 1) * lines.length;
            currentIteration = 0;
            for (var i = 0; i < lines.length; i++) {
                currentIteration += 1;
                for (var j = 0; j < fill.length; j++) {
                    if (typeof fillGradientStops[j] === 'number') {
                        stop = (fillGradientStops[j] / lines.length) + (i / lines.length);
                    }
                    else {
                        stop = currentIteration / totalIterations;
                    }
                    gradient.addColorStop(stop, fill[j]);
                    currentIteration++;
                }
            }
        }
        else {
            // 从画布的中间左侧开始渐变，并在画布的中间右侧结束
            gradient = context.createLinearGradient(0, height / 2, width, height / 2);
            totalIterations = fill.length + 1;
            currentIteration = 1;
            for (var i = 0; i < fill.length; i++) {
                if (typeof fillGradientStops[i] === 'number') {
                    stop = fillGradientStops[i];
                }
                else {
                    stop = currentIteration / totalIterations;
                }
                gradient.addColorStop(stop, fill[i]);
                currentIteration++;
            }
        }
        return gradient;
    }
    /**
     * Render the text with letter-spacing.
     * 绘制文本。
     *
     * @param text 文本。
     * @param x X轴位置。
     * @param y Y轴位置。
     * @param isStroke
     */
    function drawLetterSpacing(canvas, style, text, x, y, isStroke) {
        if (isStroke === void 0) { isStroke = false; }
        var context = canvas.getContext('2d');
        var letterSpacing = style.letterSpacing;
        if (letterSpacing === 0) {
            if (isStroke) {
                context.strokeText(text, x, y);
            }
            else {
                context.fillText(text, x, y);
            }
            return;
        }
        var currentPosition = x;
        // 使用 Array.from 可以解决表情符号的分割问题。 如  "🌷","🎁","💩","😜" "👍"
        // https://medium.com/@giltayar/iterating-over-emoji-characters-the-es6-way-f06e4589516
        // https://github.com/orling/grapheme-splitter
        var stringArray = Array.from(text);
        var previousWidth = context.measureText(text).width;
        var currentWidth = 0;
        for (var i = 0; i < stringArray.length; ++i) {
            var currentChar = stringArray[i];
            if (isStroke) {
                context.strokeText(currentChar, currentPosition, y);
            }
            else {
                context.fillText(currentChar, currentPosition, y);
            }
            currentWidth = context.measureText(text.substring(i + 1)).width;
            currentPosition += previousWidth - currentWidth + letterSpacing;
            previousWidth = currentWidth;
        }
    }
    /**
      * 除去边界透明部分
      *
      * @param canvas 画布
      */
    function trimCanvas(canvas) {
        var width = canvas.width;
        var height = canvas.height;
        var context = canvas.getContext('2d');
        var imageData = context.getImageData(0, 0, width, height);
        var pixels = imageData.data;
        var len = pixels.length;
        var top = NaN;
        var left = NaN;
        var right = NaN;
        var bottom = NaN;
        var data = null;
        var i;
        var x;
        var y;
        for (i = 0; i < len; i += 4) {
            if (pixels[i + 3] !== 0) {
                x = (i / 4) % width;
                y = ~~((i / 4) / width);
                if (isNaN(top)) {
                    top = y;
                }
                if (isNaN(left)) {
                    left = x;
                }
                else if (x < left) {
                    left = x;
                }
                if (isNaN(right)) {
                    right = x + 1;
                }
                else if (right < x) {
                    right = x + 1;
                }
                if (isNaN(bottom)) {
                    bottom = y;
                }
                else if (bottom < y) {
                    bottom = y;
                }
            }
        }
        if (!isNaN(top)) {
            width = right - left;
            height = bottom - top + 1;
            data = context.getImageData(left, top, width, height);
        }
        return {
            height: height,
            width: width,
            data: data,
        };
    }
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 文本上渐变方向。
     */
    var TEXT_GRADIENT;
    (function (TEXT_GRADIENT) {
        /**
         * 纵向梯度。
         */
        TEXT_GRADIENT[TEXT_GRADIENT["LINEAR_VERTICAL"] = 0] = "LINEAR_VERTICAL";
        /**
         * 横向梯度。
         */
        TEXT_GRADIENT[TEXT_GRADIENT["LINEAR_HORIZONTAL"] = 1] = "LINEAR_HORIZONTAL";
    })(TEXT_GRADIENT = feng3d.TEXT_GRADIENT || (feng3d.TEXT_GRADIENT = {}));
    /**
     * 通用字体。
     */
    var FontFamily;
    (function (FontFamily) {
        FontFamily["Arial"] = "Arial";
        FontFamily["serif"] = "serif";
        FontFamily["sans-serif"] = "sans-serif";
        FontFamily["monospace"] = "monospace";
        FontFamily["cursive"] = "cursive";
        FontFamily["fantasy"] = "fantasy";
        FontFamily["system-ui"] = "system-ui";
    })(FontFamily = feng3d.FontFamily || (feng3d.FontFamily = {}));
    /**
     * 字体样式。
     */
    var FontStyle;
    (function (FontStyle) {
        FontStyle["normal"] = "normal";
        FontStyle["italic"] = "italic";
        FontStyle["oblique"] = "oblique";
    })(FontStyle = feng3d.FontStyle || (feng3d.FontStyle = {}));
    /**
     * 字体变体。
     */
    var FontVariant;
    (function (FontVariant) {
        FontVariant["normal"] = "normal";
        FontVariant["small-caps"] = "small-caps";
    })(FontVariant = feng3d.FontVariant || (feng3d.FontVariant = {}));
    var FontWeight;
    (function (FontWeight) {
        FontWeight["normal"] = "normal";
        FontWeight["bold"] = "bold";
        FontWeight["bolder"] = "bolder";
        FontWeight["lighter"] = "lighter";
        // '100' = '100',
        // '200' = '200',
        // '300' = '300',
        // '400' = '400',
        // '500' = '500',
        // '600' = '600',
        // '700' = '700',
        // '800' = '800',
        // '900' = '900',
    })(FontWeight = feng3d.FontWeight || (feng3d.FontWeight = {}));
    /**
     * 设置创建的角的类型，它可以解决带尖刺的文本问题。
     */
    var CanvasLineJoin;
    (function (CanvasLineJoin) {
        CanvasLineJoin["round"] = "round";
        CanvasLineJoin["bevel"] = "bevel";
        CanvasLineJoin["miter"] = "miter";
    })(CanvasLineJoin = feng3d.CanvasLineJoin || (feng3d.CanvasLineJoin = {}));
    /**
     * 画布文本基线
     */
    var CanvasTextBaseline;
    (function (CanvasTextBaseline) {
        CanvasTextBaseline["top"] = "top";
        CanvasTextBaseline["hanging"] = "hanging";
        CanvasTextBaseline["middle"] = "middle";
        CanvasTextBaseline["alphabetic"] = "alphabetic";
        CanvasTextBaseline["ideographic"] = "ideographic";
        CanvasTextBaseline["bottom"] = "bottom";
    })(CanvasTextBaseline = feng3d.CanvasTextBaseline || (feng3d.CanvasTextBaseline = {}));
    /**
     * 文本对齐方式
     */
    var TextAlign;
    (function (TextAlign) {
        TextAlign["left"] = "left";
        TextAlign["center"] = "center";
        TextAlign["right"] = "right";
    })(TextAlign = feng3d.TextAlign || (feng3d.TextAlign = {}));
    var WhiteSpaceHandle;
    (function (WhiteSpaceHandle) {
        WhiteSpaceHandle["normal"] = "normal";
        WhiteSpaceHandle["pre"] = "pre";
        WhiteSpaceHandle["pre-line"] = "pre-line";
    })(WhiteSpaceHandle = feng3d.WhiteSpaceHandle || (feng3d.WhiteSpaceHandle = {}));
    /**
     * 文本样式
     */
    var TextStyle = /** @class */ (function () {
        /**
         * @param style 样式参数
         */
        function TextStyle(style) {
            this.styleID = 0;
            /**
             * 字体。
             */
            this.fontFamily = FontFamily.Arial;
            /**
             * 字体尺寸。
             */
            this.fontSize = 26;
            /**
             * 字体样式。
             */
            this.fontStyle = FontStyle.normal;
            /**
             * 字体变体。
             */
            this.fontVariant = FontVariant.normal;
            /**
             * 字型粗细。
             */
            this.fontWeight = FontWeight.normal;
            /**
             * 用于填充文本的颜色。
             * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
             */
            this.fill = new feng3d.Color4(0, 0, 0, 1);
            // fill = new MinMaxGradient();
            /**
             * 如果填充是一个创建渐变的颜色数组，这可以改变渐变的方向。
             */
            this.fillGradientType = TEXT_GRADIENT.LINEAR_VERTICAL;
            /**
             * 如果填充是一个颜色数组来创建渐变，这个数组可以设置停止点
             */
            this.fillGradientStops = [];
            /**
             * 将用于文本笔划的画布填充样式。
             */
            this.stroke = new feng3d.Color4();
            /**
             * 一个表示笔画厚度的数字。
             */
            this.strokeThickness = 0;
            /**
             * lineJoin属性设置创建的角的类型，它可以解决带尖刺的文本问题。
             */
            this.lineJoin = CanvasLineJoin.miter;
            /**
             * 当使用“miter”lineJoin模式时，miter限制使用。这可以减少或增加呈现文本的尖锐性。
             */
            this.miterLimit = 10;
            /**
             * 字母之间的间距，默认为0
             */
            this.letterSpacing = 0;
            /**
             * 呈现文本的基线。
             */
            this.textBaseline = CanvasTextBaseline.alphabetic;
            /**
             * 是否为文本设置一个投影。
             */
            this.dropShadow = false;
            /**
             * 投影颜色。
             */
            this.dropShadowColor = new feng3d.Color4(0, 0, 0, 0);
            /**
             * 投影角度。
             */
            this.dropShadowAngle = 30;
            /**
             * 阴影模糊半径。
             */
            this.dropShadowBlur = 0;
            /**
             * 投影距离。
             */
            this.dropShadowDistance = 5;
            /**
             * 是否应使用自动换行。
             */
            this.wordWrap = false;
            /**
             * 能否把单词分多行。
             */
            this.breakWords = false;
            /**
             * 多行文本对齐方式。
             */
            this.align = TextAlign.left;
            /**
             * 如何处理换行与空格。
             * Default is 'pre' (preserve, preserve).
             *
             *  value       | New lines     |   Spaces
             *  ---         | ---           |   ---
             * 'normal'     | Collapse      |   Collapse
             * 'pre'        | Preserve      |   Preserve
             * 'pre-line'   | Preserve      |   Collapse
             */
            this.whiteSpace = WhiteSpaceHandle.pre;
            /**
             * 文本的换行宽度。
             */
            this.wordWrapWidth = 100;
            /**
             * 行高。
             */
            this.lineHeight = 0;
            /**
             * 行距。
             */
            this.leading = 0;
            /**
             * 内边距，用于文字被裁减问题。
             */
            this.padding = 0;
            /**
             * 是否修剪透明边界。
             */
            this.trim = false;
            feng3d.serialization.setValue(this, style);
        }
        /**
         * 使数据失效
         */
        TextStyle.prototype.invalidate = function () {
            this.styleID++;
        };
        /**
         *
         * 生成用于' TextMetrics.measureFont() '的字体样式字符串。
         */
        TextStyle.prototype.toFontString = function () {
            var fontSizeString = this.fontSize + "px";
            // 通过引用每个字体名来清除fontFamily属性
            // 这将支持带有空格的字体名称
            var fontFamilies = this.fontFamily;
            if (!Array.isArray(this.fontFamily)) {
                fontFamilies = this.fontFamily.split(',');
            }
            for (var i = fontFamilies.length - 1; i >= 0; i--) {
                // 修剪任何多余的空白
                var fontFamily = fontFamilies[i].trim();
                // 检查字体是否已经包含字符串
                if (!(/([\"\'])[^\'\"]+\1/).test(fontFamily) && FontFamily[fontFamily] == undefined) {
                    fontFamily = "\"" + fontFamily + "\"";
                }
                fontFamilies[i] = fontFamily;
            }
            return this.fontStyle + " " + this.fontVariant + " " + this.fontWeight + " " + fontSizeString + " " + fontFamilies.join(',');
        };
        __decorate([
            feng3d.oav({ block: "Font", tooltip: "字体。", component: "OAVEnum", componentParam: { enumClass: FontFamily } }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "fontFamily", void 0);
        __decorate([
            feng3d.oav({ block: "Font", tooltip: "字体尺寸。" }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "fontSize", void 0);
        __decorate([
            feng3d.oav({ block: "Font", tooltip: "字体样式。", component: "OAVEnum", componentParam: { enumClass: FontStyle } }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "fontStyle", void 0);
        __decorate([
            feng3d.oav({ block: "Font", tooltip: "字体变体。", component: "OAVEnum", componentParam: { enumClass: FontVariant } }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "fontVariant", void 0);
        __decorate([
            feng3d.oav({ block: "Font", tooltip: "字型粗细。", component: "OAVEnum", componentParam: { enumClass: FontWeight } }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "fontWeight", void 0);
        __decorate([
            feng3d.oav({ block: "Fill", tooltip: "用于填充文本的颜色。" }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "fill", void 0);
        __decorate([
            feng3d.oav({ block: "Fill", tooltip: "如果填充是一个创建渐变的颜色数组，这可以改变渐变的方向。" }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "fillGradientType", void 0);
        __decorate([
            feng3d.oav({ block: "Fill" }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "fillGradientStops", void 0);
        __decorate([
            feng3d.oav({ block: "Stroke", tooltip: "将用于文本笔划的画布填充样式。" }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "stroke", void 0);
        __decorate([
            feng3d.oav({ block: "Stroke", tooltip: "一个表示笔画厚度的数字。" }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "strokeThickness", void 0);
        __decorate([
            feng3d.oav({ block: "Stroke", tooltip: "lineJoin属性设置创建的角的类型，它可以解决带尖刺的文本问题。", component: "OAVEnum", componentParam: { enumClass: CanvasLineJoin } }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "lineJoin", void 0);
        __decorate([
            feng3d.oav({ block: "Stroke", tooltip: "当使用“miter”lineJoin模式时，miter限制使用。这可以减少或增加呈现文本的尖锐性。" }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "miterLimit", void 0);
        __decorate([
            feng3d.oav({ block: "Layout", tooltip: "字母之间的间距，默认为0" }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "letterSpacing", void 0);
        __decorate([
            feng3d.oav({ block: "Layout", tooltip: "呈现文本的基线。", component: "OAVEnum", componentParam: { enumClass: CanvasTextBaseline } }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "textBaseline", void 0);
        __decorate([
            feng3d.oav({ block: "Drop Shadow", tooltip: "是否为文本设置一个投影。" }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "dropShadow", void 0);
        __decorate([
            feng3d.oav({ block: "Drop Shadow", tooltip: "投影颜色。" }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "dropShadowColor", void 0);
        __decorate([
            feng3d.oav({ block: "Drop Shadow", tooltip: "投影角度。" }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "dropShadowAngle", void 0);
        __decorate([
            feng3d.oav({ block: "Drop Shadow", tooltip: "阴影模糊半径。" }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "dropShadowBlur", void 0);
        __decorate([
            feng3d.oav({ block: "Drop Shadow", tooltip: "投影距离。" }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "dropShadowDistance", void 0);
        __decorate([
            feng3d.oav({ block: "Multiline", tooltip: "是否应使用自动换行。" }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "wordWrap", void 0);
        __decorate([
            feng3d.oav({ block: "Multiline" }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "breakWords", void 0);
        __decorate([
            feng3d.oav({ block: "Multiline", tooltip: "多行文本对齐方式。", component: "OAVEnum", componentParam: { enumClass: TextAlign } }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "align", void 0);
        __decorate([
            feng3d.oav({ block: "Multiline", tooltip: "如何处理换行与空格。", component: "OAVEnum", componentParam: { enumClass: WhiteSpaceHandle } }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "whiteSpace", void 0);
        __decorate([
            feng3d.oav({ block: "Multiline", tooltip: "文本的换行宽度。" }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "wordWrapWidth", void 0);
        __decorate([
            feng3d.oav({ block: "Multiline", tooltip: "行高。" }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "lineHeight", void 0);
        __decorate([
            feng3d.oav({ block: "Multiline", tooltip: "行距。" }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "leading", void 0);
        __decorate([
            feng3d.oav({ block: "Texture", tooltip: "内边距，用于文字被裁减问题。" }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "padding", void 0);
        __decorate([
            feng3d.oav({ block: "Texture", tooltip: "是否修剪透明边界。" }),
            feng3d.watch("invalidate")
        ], TextStyle.prototype, "trim", void 0);
        return TextStyle;
    }());
    feng3d.TextStyle = TextStyle;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * The TextMetrics object represents the measurement of a block of text with a specified style.
     *
     * ```js
     * let style = new PIXI.TextStyle({fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'})
     * let textMetrics = PIXI.TextMetrics.measureText('Your text', style)
     * ```
     */
    var TextMetrics = /** @class */ (function () {
        /**
         * @param text - the text that was measured
         * @param style - the style that was measured
         * @param width - the measured width of the text
         * @param height - the measured height of the text
         * @param lines - an array of the lines of text broken by new lines and wrapping if specified in style
         * @param lineWidths - an array of the line widths for each line matched to `lines`
         * @param lineHeight - the measured line height for this style
         * @param maxLineWidth - the maximum line width for all measured lines
         * @param fontProperties - the font properties object from TextMetrics.measureFont
         */
        function TextMetrics(text, style, width, height, lines, lineWidths, lineHeight, maxLineWidth, fontProperties) {
            this.text = text;
            this.style = style;
            this.width = width;
            this.height = height;
            this.lines = lines;
            this.lineWidths = lineWidths;
            this.lineHeight = lineHeight;
            this.maxLineWidth = maxLineWidth;
            this.fontProperties = fontProperties;
        }
        /**
         * Measures the supplied string of text and returns a Rectangle.
         *
         * @param text - the text to measure.
         * @param style - the text style to use for measuring
         * @param wordWrap - optional override for if word-wrap should be applied to the text.
         * @param canvas - optional specification of the canvas to use for measuring.
         * @return measured width and height of the text.
         */
        TextMetrics.measureText = function (text, style, wordWrap, canvas) {
            if (canvas === void 0) { canvas = TextMetrics._canvas; }
            wordWrap = (wordWrap === undefined || wordWrap === null) ? style.wordWrap : wordWrap;
            var font = style.toFontString();
            var fontProperties = TextMetrics.measureFont(font);
            // fallback in case UA disallow canvas data extraction
            // (toDataURI, getImageData functions)
            if (fontProperties.fontSize === 0) {
                fontProperties.fontSize = style.fontSize;
                fontProperties.ascent = style.fontSize;
            }
            var context = canvas.getContext('2d');
            if (!context) {
                throw "\u83B7\u53D6 CanvasRenderingContext2D \u5931\u8D25\uFF01";
            }
            context.font = font;
            var outputText = wordWrap ? TextMetrics.wordWrap(text, style, canvas) : text;
            var lines = outputText.split(/(?:\r\n|\r|\n)/);
            var lineWidths = new Array(lines.length);
            var maxLineWidth = 0;
            for (var i = 0; i < lines.length; i++) {
                var lineWidth = context.measureText(lines[i]).width + ((lines[i].length - 1) * style.letterSpacing);
                lineWidths[i] = lineWidth;
                maxLineWidth = Math.max(maxLineWidth, lineWidth);
            }
            var width = maxLineWidth + style.strokeThickness;
            if (style.dropShadow) {
                width += style.dropShadowDistance;
            }
            var lineHeight = style.lineHeight || fontProperties.fontSize + style.strokeThickness;
            var height = Math.max(lineHeight, fontProperties.fontSize + style.strokeThickness)
                + ((lines.length - 1) * (lineHeight + style.leading));
            if (style.dropShadow) {
                height += style.dropShadowDistance;
            }
            return new TextMetrics(text, style, width, height, lines, lineWidths, lineHeight + style.leading, maxLineWidth, fontProperties);
        };
        /**
         * Applies newlines to a string to have it optimally fit into the horizontal
         * bounds set by the Text object's wordWrapWidth property.
         *
         * @private
         * @param text - String to apply word wrapping to
         * @param style - the style to use when wrapping
         * @param canvas - optional specification of the canvas to use for measuring.
         * @return New string with new lines applied where required
         */
        TextMetrics.wordWrap = function (text, style, canvas) {
            if (canvas === void 0) { canvas = TextMetrics._canvas; }
            var context = canvas.getContext('2d');
            if (!context) {
                throw "\u83B7\u53D6 CanvasRenderingContext2D \u5931\u8D25\uFF01";
            }
            var width = 0;
            var line = '';
            var lines = '';
            var cache = {};
            var letterSpacing = style.letterSpacing, whiteSpace = style.whiteSpace;
            // How to handle whitespaces
            var collapseSpaces = TextMetrics.collapseSpaces(whiteSpace);
            var collapseNewlines = TextMetrics.collapseNewlines(whiteSpace);
            // whether or not spaces may be added to the beginning of lines
            var canPrependSpaces = !collapseSpaces;
            // There is letterSpacing after every char except the last one
            // t_h_i_s_' '_i_s_' '_a_n_' '_e_x_a_m_p_l_e_' '_!
            // so for convenience the above needs to be compared to width + 1 extra letterSpace
            // t_h_i_s_' '_i_s_' '_a_n_' '_e_x_a_m_p_l_e_' '_!_
            // ________________________________________________
            // And then the final space is simply no appended to each line
            var wordWrapWidth = style.wordWrapWidth + letterSpacing;
            // break text into words, spaces and newline chars
            var tokens = TextMetrics.tokenize(text);
            for (var i = 0; i < tokens.length; i++) {
                // get the word, space or newlineChar
                var token = tokens[i];
                // if word is a new line
                if (TextMetrics.isNewline(token)) {
                    // keep the new line
                    if (!collapseNewlines) {
                        lines += TextMetrics.addLine(line);
                        canPrependSpaces = !collapseSpaces;
                        line = '';
                        width = 0;
                        continue;
                    }
                    // if we should collapse new lines
                    // we simply convert it into a space
                    token = ' ';
                }
                // if we should collapse repeated whitespaces
                if (collapseSpaces) {
                    // check both this and the last tokens for spaces
                    var currIsBreakingSpace = TextMetrics.isBreakingSpace(token);
                    var lastIsBreakingSpace = TextMetrics.isBreakingSpace(line[line.length - 1]);
                    if (currIsBreakingSpace && lastIsBreakingSpace) {
                        continue;
                    }
                }
                // get word width from cache if possible
                var tokenWidth = TextMetrics.getFromCache(token, letterSpacing, cache, context);
                // word is longer than desired bounds
                if (tokenWidth > wordWrapWidth) {
                    // if we are not already at the beginning of a line
                    if (line !== '') {
                        // start newlines for overflow words
                        lines += TextMetrics.addLine(line);
                        line = '';
                        width = 0;
                    }
                    // break large word over multiple lines
                    if (TextMetrics.canBreakWords(token, style.breakWords)) {
                        // break word into characters
                        var characters = TextMetrics.wordWrapSplit(token);
                        // loop the characters
                        for (var j = 0; j < characters.length; j++) {
                            var char = characters[j];
                            var k = 1;
                            // we are not at the end of the token
                            while (characters[j + k]) {
                                var nextChar = characters[j + k];
                                var lastChar = char[char.length - 1];
                                // should not split chars
                                if (!TextMetrics.canBreakChars(lastChar, nextChar, token, j, style.breakWords)) {
                                    // combine chars & move forward one
                                    char += nextChar;
                                }
                                else {
                                    break;
                                }
                                k++;
                            }
                            j += char.length - 1;
                            var characterWidth = TextMetrics.getFromCache(char, letterSpacing, cache, context);
                            if (characterWidth + width > wordWrapWidth) {
                                lines += TextMetrics.addLine(line);
                                canPrependSpaces = false;
                                line = '';
                                width = 0;
                            }
                            line += char;
                            width += characterWidth;
                        }
                    }
                    // run word out of the bounds
                    else {
                        // if there are words in this line already
                        // finish that line and start a new one
                        if (line.length > 0) {
                            lines += TextMetrics.addLine(line);
                            line = '';
                            width = 0;
                        }
                        var isLastToken = i === tokens.length - 1;
                        // give it its own line if it's not the end
                        lines += TextMetrics.addLine(token, !isLastToken);
                        canPrependSpaces = false;
                        line = '';
                        width = 0;
                    }
                }
                // word could fit
                else {
                    // word won't fit because of existing words
                    // start a new line
                    if (tokenWidth + width > wordWrapWidth) {
                        // if its a space we don't want it
                        canPrependSpaces = false;
                        // add a new line
                        lines += TextMetrics.addLine(line);
                        // start a new line
                        line = '';
                        width = 0;
                    }
                    // don't add spaces to the beginning of lines
                    if (line.length > 0 || !TextMetrics.isBreakingSpace(token) || canPrependSpaces) {
                        // add the word to the current line
                        line += token;
                        // update width counter
                        width += tokenWidth;
                    }
                }
            }
            lines += TextMetrics.addLine(line, false);
            return lines;
        };
        /**
         * Convienience function for logging each line added during the wordWrap
         * method
         *
         * @private
         * @param  line        - The line of text to add
         * @param  newLine     - Add new line character to end
         * @return A formatted line
         */
        TextMetrics.addLine = function (line, newLine) {
            if (newLine === void 0) { newLine = true; }
            line = TextMetrics.trimRight(line);
            line = (newLine) ? line + "\n" : line;
            return line;
        };
        /**
         * Gets & sets the widths of calculated characters in a cache object
         *
         * @private
         * @param key            The key
         * @param letterSpacing  The letter spacing
         * @param cache          The cache
         * @param context        The canvas context
         * @return The from cache.
         */
        TextMetrics.getFromCache = function (key, letterSpacing, cache, context) {
            var width = cache[key];
            if (width === undefined) {
                var spacing = ((key.length) * letterSpacing);
                width = context.measureText(key).width + spacing;
                cache[key] = width;
            }
            return width;
        };
        /**
         * Determines whether we should collapse breaking spaces
         *
         * @private
         * @param whiteSpace  The TextStyle property whiteSpace
         * @return should collapse
         */
        TextMetrics.collapseSpaces = function (whiteSpace) {
            return (whiteSpace === 'normal' || whiteSpace === 'pre-line');
        };
        /**
         * Determines whether we should collapse newLine chars
         *
         * @private
         * @param whiteSpace  The white space
         * @return should collapse
         */
        TextMetrics.collapseNewlines = function (whiteSpace) {
            return (whiteSpace === 'normal');
        };
        /**
         * trims breaking whitespaces from string
         *
         * @private
         * @param text  The text
         * @return trimmed string
         */
        TextMetrics.trimRight = function (text) {
            if (typeof text !== 'string') {
                return '';
            }
            for (var i = text.length - 1; i >= 0; i--) {
                var char = text[i];
                if (!TextMetrics.isBreakingSpace(char)) {
                    break;
                }
                text = text.slice(0, -1);
            }
            return text;
        };
        /**
         * Determines if char is a newline.
         *
         * @private
         * @param char  The character
         * @return True if newline, False otherwise.
         */
        TextMetrics.isNewline = function (char) {
            if (typeof char !== 'string') {
                return false;
            }
            return (TextMetrics._newlines.indexOf(char.charCodeAt(0)) >= 0);
        };
        /**
         * Determines if char is a breaking whitespace.
         *
         * @private
         * @param char  The character
         * @return True if whitespace, False otherwise.
         */
        TextMetrics.isBreakingSpace = function (char) {
            if (typeof char !== 'string') {
                return false;
            }
            return (TextMetrics._breakingSpaces.indexOf(char.charCodeAt(0)) >= 0);
        };
        /**
         * Splits a string into words, breaking-spaces and newLine characters
         *
         * @private
         * @param text       The text
         * @return A tokenized array
         */
        TextMetrics.tokenize = function (text) {
            var tokens = [];
            var token = '';
            if (typeof text !== 'string') {
                return tokens;
            }
            for (var i = 0; i < text.length; i++) {
                var char = text[i];
                if (TextMetrics.isBreakingSpace(char) || TextMetrics.isNewline(char)) {
                    if (token !== '') {
                        tokens.push(token);
                        token = '';
                    }
                    tokens.push(char);
                    continue;
                }
                token += char;
            }
            if (token !== '') {
                tokens.push(token);
            }
            return tokens;
        };
        /**
         * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
         *
         * It allows one to customise which words should break
         * Examples are if the token is CJK or numbers.
         * It must return a boolean.
         *
         * @param token       The token
         * @param breakWords  The style attr break words
         * @return whether to break word or not
         */
        TextMetrics.canBreakWords = function (token, breakWords) {
            return breakWords;
        };
        /**
         * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
         *
         * It allows one to determine whether a pair of characters
         * should be broken by newlines
         * For example certain characters in CJK langs or numbers.
         * It must return a boolean.
         *
         * @param char      The character
         * @param nextChar  The next character
         * @param token     The token/word the characters are from
         * @param index     The index in the token of the char
         * @param breakWords  The style attr break words
         * @return whether to break word or not
         */
        TextMetrics.canBreakChars = function (char, nextChar, token, index, breakWords) {
            return true;
        };
        /**
         * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
         *
         * It is called when a token (usually a word) has to be split into separate pieces
         * in order to determine the point to break a word.
         * It must return an array of characters.
         *
         * @example
         * // Correctly splits emojis, eg "🤪🤪" will result in two element array, each with one emoji.
         * TextMetrics.wordWrapSplit = (token) => [...token];
         *
         * @param token The token to split
         * @return The characters of the token
         */
        TextMetrics.wordWrapSplit = function (token) {
            return token.split('');
        };
        /**
         * Calculates the ascent, descent and fontSize of a given font-style
         *
         * @param font - String representing the style of the font
         * @return Font properties object
         */
        TextMetrics.measureFont = function (font) {
            // as this method is used for preparing assets, don't recalculate things if we don't need to
            if (TextMetrics._fonts[font]) {
                return TextMetrics._fonts[font];
            }
            var properties = {};
            var canvas = TextMetrics._canvas;
            var context = TextMetrics._context;
            context.font = font;
            var metricsString = TextMetrics.METRICS_STRING + TextMetrics.BASELINE_SYMBOL;
            var width = Math.ceil(context.measureText(metricsString).width);
            var baseline = Math.ceil(context.measureText(TextMetrics.BASELINE_SYMBOL).width);
            var height = 2 * baseline;
            baseline = baseline * TextMetrics.BASELINE_MULTIPLIER | 0;
            canvas.width = width;
            canvas.height = height;
            context.fillStyle = '#f00';
            context.fillRect(0, 0, width, height);
            context.font = font;
            context.textBaseline = 'alphabetic';
            context.fillStyle = '#000';
            context.fillText(metricsString, 0, baseline);
            var imagedata = context.getImageData(0, 0, width, height).data;
            var pixels = imagedata.length;
            var line = width * 4;
            var i = 0;
            var idx = 0;
            var stop = false;
            // ascent. scan from top to bottom until we find a non red pixel
            for (i = 0; i < baseline; ++i) {
                for (var j = 0; j < line; j += 4) {
                    if (imagedata[idx + j] !== 255) {
                        stop = true;
                        break;
                    }
                }
                if (!stop) {
                    idx += line;
                }
                else {
                    break;
                }
            }
            properties.ascent = baseline - i;
            idx = pixels - line;
            stop = false;
            // descent. scan from bottom to top until we find a non red pixel
            for (i = height; i > baseline; --i) {
                for (var j = 0; j < line; j += 4) {
                    if (imagedata[idx + j] !== 255) {
                        stop = true;
                        break;
                    }
                }
                if (!stop) {
                    idx -= line;
                }
                else {
                    break;
                }
            }
            properties.descent = i - baseline;
            properties.fontSize = properties.ascent + properties.descent;
            TextMetrics._fonts[font] = properties;
            return properties;
        };
        /**
         * Clear font metrics in metrics cache.
         *
         * @param font - font name. If font name not set then clear cache for all fonts.
         */
        TextMetrics.clearMetrics = function (font) {
            if (font === void 0) { font = ''; }
            if (font) {
                delete TextMetrics._fonts[font];
            }
            else {
                TextMetrics._fonts = {};
            }
        };
        /**
         * Cached canvas element for measuring text
         */
        TextMetrics._canvas = (function () {
            var c = document.createElement('canvas');
            c.width = c.height = 10;
            return c;
        })();
        /**
         * Cache for context to use.
         */
        TextMetrics._context = TextMetrics._canvas.getContext('2d');
        /**
         * Cache of {@see PIXI.TextMetrics.FontMetrics} objects.
         */
        TextMetrics._fonts = {};
        /**
         * String used for calculate font metrics.
         * These characters are all tall to help calculate the height required for text.
         */
        TextMetrics.METRICS_STRING = '|ÉqÅ';
        /**
         * Baseline symbol for calculate font metrics.
         */
        TextMetrics.BASELINE_SYMBOL = 'M';
        /**
         * Baseline multiplier for calculate font metrics.
         */
        TextMetrics.BASELINE_MULTIPLIER = 1.4;
        /**
         * Cache of new line chars.
         */
        TextMetrics._newlines = [
            0x000A,
            0x000D,
        ];
        /**
         * Cache of breaking spaces.
         */
        TextMetrics._breakingSpaces = [
            0x0009,
            0x0020,
            0x2000,
            0x2001,
            0x2002,
            0x2003,
            0x2004,
            0x2005,
            0x2006,
            0x2008,
            0x2009,
            0x200A,
            0x205F,
            0x3000,
        ];
        return TextMetrics;
    }());
    feng3d.TextMetrics = TextMetrics;
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
            _this.width = 1;
            _this.height = 1;
            _this.text = "Hello 🌷 world\nHello 🌷 world";
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
            // @oav({ exclude: true })
            _this.material = feng3d.Material.getDefault("Default-Image");
            _this.style = new feng3d.TextStyle();
            return _this;
        }
        Text.prototype.beforeRender = function (gl, renderAtomic, scene, camera) {
            _super.prototype.beforeRender.call(this, gl, renderAtomic, scene, camera);
            // this.image["_pixels"] = this.getImagedata();
            var canvas = feng3d.drawText(null, this.text, this.style);
            this.image["_pixels"] = canvas;
            this.image.invalidate();
            this.width = canvas.width;
            this.height = canvas.height;
            this.transform.sx = this.width * 0.01;
            this.transform.sy = this.height * 0.01;
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
            feng3d.oav()
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