namespace feng3d
{

    /**
     * 文本上渐变方向。
     */
    export enum TEXT_GRADIENT
    {
        /**
         * 纵向梯度。
         */
        LINEAR_VERTICAL = 0,
        /**
         * 横向梯度。
         */
        LINEAR_HORIZONTAL = 1,
    }

    /**
     * 通用字体。
     */
    export enum FontFamily
    {
        'Arial' = 'Arial',
        'serif' = 'serif',
        'sans-serif' = 'sans-serif',
        'monospace' = 'monospace',
        'cursive' = 'cursive',
        'fantasy' = 'fantasy',
        'system-ui' = 'system-ui',
    }

    /**
     * 字体样式。
     */
    export enum FontStyle
    {
        'normal' = 'normal',
        'italic' = 'italic',
        'oblique' = 'oblique',
    }

    /**
     * 字体变体。
     */
    export enum FontVariant
    {
        'normal' = 'normal',
        'small-caps' = 'small-caps',
    }

    export enum FontWeight
    {
        'normal' = 'normal',
        'bold' = 'bold',
        'bolder' = 'bolder',
        'lighter' = 'lighter',
        // '100' = '100',
        // '200' = '200',
        // '300' = '300',
        // '400' = '400',
        // '500' = '500',
        // '600' = '600',
        // '700' = '700',
        // '800' = '800',
        // '900' = '900',
    }

    /**
     * 设置创建的角的类型，它可以解决带尖刺的文本问题。
     */
    export enum CanvasLineJoin
    {
        "round" = "round",
        "bevel" = "bevel",
        "miter" = "miter",
    }

    /**
     * 画布文本基线
     */
    export enum CanvasTextBaseline
    {
        "top" = "top",
        "hanging" = "hanging",
        "middle" = "middle",
        "alphabetic" = "alphabetic",
        "ideographic" = "ideographic",
        "bottom" = "bottom",
    }

    /**
     * 文本对齐方式
     */
    export enum TextAlign
    {
        'left' = 'left',
        'center' = 'center',
        'right' = 'right',
    }

    export enum WhiteSpaceHandle
    {
        "normal" = "normal",
        'pre' = 'pre',
        'pre-line' = 'pre-line',
    }

    /**
     * 文本样式
     * 
     * 从pixi.js移植
     * 
     * @see https://github.com/pixijs/pixi.js/blob/dev/packages/text/src/TextStyle.js
     */
    export class TextStyle
    {
        styleID = 0;

        /**
         * @param style 样式参数
         */
        constructor(style?: Partial<TextStyle>)
        {
            serialization.setValue(this, style);
        }

        /**
         * 字体。
         */
        @oav({ block: "Font", tooltip: "字体。", component: "OAVEnum", componentParam: { enumClass: FontFamily } })
        @watch("invalidate")
        fontFamily = FontFamily.Arial;

        /**
         * 字体尺寸。
         */
        @oav({ block: "Font", tooltip: "字体尺寸。" })
        @watch("invalidate")
        fontSize = 26;

        /**
         * 字体样式。
         */
        @oav({ block: "Font", tooltip: "字体样式。", component: "OAVEnum", componentParam: { enumClass: FontStyle } })
        @watch("invalidate")
        fontStyle = FontStyle.normal;

        /**
         * 字体变体。
         */
        @oav({ block: "Font", tooltip: "字体变体。", component: "OAVEnum", componentParam: { enumClass: FontVariant } })
        @watch("invalidate")
        fontVariant = FontVariant.normal;

        /**
         * 字型粗细。
         */
        @oav({ block: "Font", tooltip: "字型粗细。", component: "OAVEnum", componentParam: { enumClass: FontWeight } })
        @watch("invalidate")
        fontWeight = FontWeight.normal;

        /**
         * 用于填充文本的颜色。
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
         */
        @oav({ block: "Fill", tooltip: "用于填充文本的颜色。" })
        @watch("invalidate")
        fill = new Color4(0, 0, 0, 1);
        // fill = new MinMaxGradient();

        /**
         * 如果填充是一个创建渐变的颜色数组，这可以改变渐变的方向。
         */
        @oav({ block: "Fill", tooltip: "如果填充是一个创建渐变的颜色数组，这可以改变渐变的方向。" })
        @watch("invalidate")
        fillGradientType = TEXT_GRADIENT.LINEAR_VERTICAL;

        /**
         * 如果填充是一个颜色数组来创建渐变，这个数组可以设置停止点
         */
        @oav({ block: "Fill" })
        @watch("invalidate")
        fillGradientStops: number[] = [];

        /**
         * 将用于文本笔划的画布填充样式。
         */
        @oav({ block: "Stroke", tooltip: "将用于文本笔划的画布填充样式。" })
        @watch("invalidate")
        stroke = new Color4();

        /**
         * 一个表示笔画厚度的数字。
         */
        @oav({ block: "Stroke", tooltip: "一个表示笔画厚度的数字。" })
        @watch("invalidate")
        strokeThickness = 0;

        /**
         * lineJoin属性设置创建的角的类型，它可以解决带尖刺的文本问题。
         */
        @oav({ block: "Stroke", tooltip: "lineJoin属性设置创建的角的类型，它可以解决带尖刺的文本问题。", component: "OAVEnum", componentParam: { enumClass: CanvasLineJoin } })
        @watch("invalidate")
        lineJoin = CanvasLineJoin.miter;

        /**
         * 当使用“miter”lineJoin模式时，miter限制使用。这可以减少或增加呈现文本的尖锐性。
         */
        @oav({ block: "Stroke", tooltip: "当使用“miter”lineJoin模式时，miter限制使用。这可以减少或增加呈现文本的尖锐性。" })
        @watch("invalidate")
        miterLimit = 10;

        /**
         * 字母之间的间距，默认为0
         */
        @oav({ block: "Layout", tooltip: "字母之间的间距，默认为0" })
        @watch("invalidate")
        letterSpacing = 0;

        /**
         * 呈现文本的基线。
         */
        @oav({ block: "Layout", tooltip: "呈现文本的基线。", component: "OAVEnum", componentParam: { enumClass: CanvasTextBaseline } })
        @watch("invalidate")
        textBaseline = CanvasTextBaseline.alphabetic;

        /**
         * 是否为文本设置一个投影。
         */
        @oav({ block: "Drop Shadow", tooltip: "是否为文本设置一个投影。" })
        @watch("invalidate")
        dropShadow = false;

        /**
         * 投影颜色。
         */
        @oav({ block: "Drop Shadow", tooltip: "投影颜色。" })
        @watch("invalidate")
        dropShadowColor = new Color4(0, 0, 0, 0);

        /**
         * 投影角度。
         */
        @oav({ block: "Drop Shadow", tooltip: "投影角度。" })
        @watch("invalidate")
        dropShadowAngle = 30;

        /**
         * 阴影模糊半径。
         */
        @oav({ block: "Drop Shadow", tooltip: "阴影模糊半径。" })
        @watch("invalidate")
        dropShadowBlur = 0;

        /**
         * 投影距离。
         */
        @oav({ block: "Drop Shadow", tooltip: "投影距离。" })
        @watch("invalidate")
        dropShadowDistance = 5;

        /**
         * 是否应使用自动换行。
         */
        @oav({ block: "Multiline", tooltip: "是否应使用自动换行。" })
        @watch("invalidate")
        wordWrap = false;

        /**
         * 能否把单词分多行。
         */
        @oav({ block: "Multiline" })
        @watch("invalidate")
        breakWords = false;

        /**
         * 多行文本对齐方式。
         */
        @oav({ block: "Multiline", tooltip: "多行文本对齐方式。", component: "OAVEnum", componentParam: { enumClass: TextAlign } })
        @watch("invalidate")
        align = TextAlign.left;

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
        @oav({ block: "Multiline", tooltip: "如何处理换行与空格。", component: "OAVEnum", componentParam: { enumClass: WhiteSpaceHandle } })
        @watch("invalidate")
        whiteSpace = WhiteSpaceHandle.pre;

        /**
         * 文本的换行宽度。
         */
        @oav({ block: "Multiline", tooltip: "文本的换行宽度。" })
        @watch("invalidate")
        wordWrapWidth = 100;

        /**
         * 行高。
         */
        @oav({ block: "Multiline", tooltip: "行高。" })
        @watch("invalidate")
        lineHeight = 0;

        /**
         * 行距。
         */
        @oav({ block: "Multiline", tooltip: "行距。" })
        @watch("invalidate")
        leading = 0;

        /**
         * 内边距，用于文字被裁减问题。
         */
        @oav({ block: "Texture", tooltip: "内边距，用于文字被裁减问题。" })
        @watch("invalidate")
        padding = 0;

        /**
         * 是否修剪透明边界。
         */
        @oav({ block: "Texture", tooltip: "是否修剪透明边界。" })
        @watch("invalidate")
        trim = false;

        /**
         * 使数据失效
         */
        invalidate()
        {
            this.styleID++;
        }

        /**
         * 
         * 生成用于' TextMetrics.measureFont() '的字体样式字符串。
         */
        toFontString()
        {
            const fontSizeString = `${this.fontSize}px`;

            // 通过引用每个字体名来清除fontFamily属性
            // 这将支持带有空格的字体名称
            let fontFamilies: string[] = <any>this.fontFamily;

            if (!Array.isArray(this.fontFamily))
            {
                fontFamilies = this.fontFamily.split(',');
            }

            for (let i = fontFamilies.length - 1; i >= 0; i--)
            {
                // 修剪任何多余的空白
                let fontFamily = fontFamilies[i].trim();

                // 检查字体是否已经包含字符串
                if (!(/([\"\'])[^\'\"]+\1/).test(fontFamily) && FontFamily[fontFamily] == undefined)
                {
                    fontFamily = `"${fontFamily}"`;
                }
                fontFamilies[i] = fontFamily;
            }

            return `${this.fontStyle} ${this.fontVariant} ${this.fontWeight} ${fontSizeString} ${fontFamilies.join(',')}`;
        }
    }
}