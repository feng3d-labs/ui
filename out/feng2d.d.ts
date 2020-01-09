declare namespace feng3d {
    /**
     * UIRenderMode for the Canvas.
     *
     * Canvas的渲染模式
     */
    enum UIRenderMode {
        /**
         * Render at the end of the Scene using a 2D Canvas.
         *
         * 在场景的最后使用2D画布渲染。
         */
        ScreenSpaceOverlay = 0,
        /**
         * Render using the Camera configured on the Canvas.
         *
         * 使用在画布上配置的摄像机进行渲染。
         */
        ScreenSpaceCamera = 1,
        /**
         * Render using any Camera in the Scene that can render the layer.
         *
         * 使用场景中任何可以渲染图层的相机渲染。
         */
        WorldSpace = 2
    }
}
declare namespace feng3d {
    /**
     * Element that can be used for screen rendering.
     *
     * 能够被用于屏幕渲染的元素
     */
    class Canvas extends Behaviour {
        /**
         * Is the Canvas in World or Overlay mode?
         *
         * 画布是在世界或覆盖模式?
         */
        renderMode: UIRenderMode;
    }
}
declare namespace feng3d {
    /**
     * 图片组件
     */
    class Image extends Model {
        geometry: QuadGeometry;
        castShadows: boolean;
        receiveShadows: boolean;
        width: number;
        height: number;
        /**
         * The source texture of the Image element.
         *
         * 图像元素的源纹理。
         */
        image: Texture2D;
        /**
         * Tinting color for this Image.
         *
         * 为该图像着色。
         */
        color: Color4;
        material: Material;
        beforeRender(gl: GL, renderAtomic: RenderAtomic, scene: Scene, camera: Camera): void;
    }
}
declare namespace feng3d {
    /**
     * 绘制文本
     *
     * @param canvas 画布
     * @param _text 文本
     * @param style 文本样式
     * @param resolution 分辨率
     */
    function drawText(canvas: HTMLCanvasElement, _text: string, style: TextStyle, resolution?: number): HTMLCanvasElement;
}
declare namespace feng3d {
    /**
     * 文本上渐变方向。
     */
    enum TEXT_GRADIENT {
        /**
         * 纵向梯度。
         */
        LINEAR_VERTICAL = 0,
        /**
         * 横向梯度。
         */
        LINEAR_HORIZONTAL = 1
    }
    /**
     * 通用字体。
     */
    enum FontFamily {
        'Arial' = "Arial",
        'serif' = "serif",
        'sans-serif' = "sans-serif",
        'monospace' = "monospace",
        'cursive' = "cursive",
        'fantasy' = "fantasy",
        'system-ui' = "system-ui"
    }
    /**
     * 字体样式。
     */
    enum FontStyle {
        'normal' = "normal",
        'italic' = "italic",
        'oblique' = "oblique"
    }
    /**
     * 字体变体。
     */
    enum FontVariant {
        'normal' = "normal",
        'small-caps' = "small-caps"
    }
    enum FontWeight {
        'normal' = "normal",
        'bold' = "bold",
        'bolder' = "bolder",
        'lighter' = "lighter"
    }
    /**
     * 设置创建的角的类型，它可以解决带尖刺的文本问题。
     */
    enum CanvasLineJoin {
        "round" = "round",
        "bevel" = "bevel",
        "miter" = "miter"
    }
    /**
     * 画布文本基线
     */
    enum CanvasTextBaseline {
        "top" = "top",
        "hanging" = "hanging",
        "middle" = "middle",
        "alphabetic" = "alphabetic",
        "ideographic" = "ideographic",
        "bottom" = "bottom"
    }
    /**
     * 文本对齐方式
     */
    enum TextAlign {
        'left' = "left",
        'center' = "center",
        'right' = "right"
    }
    enum WhiteSpaceHandle {
        "normal" = "normal",
        'pre' = "pre",
        'pre-line' = "pre-line"
    }
    /**
     * 文本样式
     */
    class TextStyle {
        styleID: number;
        /**
         * @param style 样式参数
         */
        constructor(style?: Partial<TextStyle>);
        /**
         * 字体。
         */
        fontFamily: FontFamily;
        /**
         * 字体尺寸。
         */
        fontSize: number;
        /**
         * 字体样式。
         */
        fontStyle: FontStyle;
        /**
         * 字体变体。
         */
        fontVariant: FontVariant;
        /**
         * 字型粗细。
         */
        fontWeight: FontWeight;
        /**
         * 用于填充文本的颜色。
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
         */
        fill: Color4;
        /**
         * 如果填充是一个创建渐变的颜色数组，这可以改变渐变的方向。
         */
        fillGradientType: TEXT_GRADIENT;
        /**
         * 如果填充是一个颜色数组来创建渐变，这个数组可以设置停止点
         */
        fillGradientStops: number[];
        /**
         * 将用于文本笔划的画布填充样式。
         */
        stroke: Color4;
        /**
         * 一个表示笔画厚度的数字。
         */
        strokeThickness: number;
        /**
         * lineJoin属性设置创建的角的类型，它可以解决带尖刺的文本问题。
         */
        lineJoin: CanvasLineJoin;
        /**
         * 当使用“miter”lineJoin模式时，miter限制使用。这可以减少或增加呈现文本的尖锐性。
         */
        miterLimit: number;
        /**
         * 字母之间的间距，默认为0
         */
        letterSpacing: number;
        /**
         * 呈现文本的基线。
         */
        textBaseline: CanvasTextBaseline;
        /**
         * 是否为文本设置一个投影。
         */
        dropShadow: boolean;
        /**
         * 投影颜色。
         */
        dropShadowColor: Color4;
        /**
         * 投影角度。
         */
        dropShadowAngle: number;
        /**
         * 阴影模糊半径。
         */
        dropShadowBlur: number;
        /**
         * 投影距离。
         */
        dropShadowDistance: number;
        /**
         * 是否应使用自动换行。
         */
        wordWrap: boolean;
        /**
         * 能否把单词分多行。
         */
        breakWords: boolean;
        /**
         * 多行文本对齐方式。
         */
        align: TextAlign;
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
        whiteSpace: WhiteSpaceHandle;
        /**
         * 文本的换行宽度。
         */
        wordWrapWidth: number;
        /**
         * 行高。
         */
        lineHeight: number;
        /**
         * 行距。
         */
        leading: number;
        /**
         * 内边距，用于文字被裁减问题。
         */
        padding: number;
        /**
         * 是否修剪透明边界。
         */
        trim: boolean;
        /**
         * 使数据失效
         */
        invalidate(): void;
        /**
         *
         * 生成用于' TextMetrics.measureFont() '的字体样式字符串。
         */
        toFontString(): string;
    }
}
declare namespace feng3d {
    /**
     * The TextMetrics object represents the measurement of a block of text with a specified style.
     *
     * ```js
     * let style = new PIXI.TextStyle({fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'})
     * let textMetrics = PIXI.TextMetrics.measureText('Your text', style)
     * ```
     */
    export class TextMetrics {
        /**
         * The text that was measured
         *
         */
        text: string;
        /**
         * The style that was measured
         */
        style: TextStyle;
        /**
         * The measured width of the text
         */
        width: number;
        /**
         * The measured height of the text
         */
        height: number;
        /**
         * An array of lines of the text broken by new lines and wrapping is specified in style
         */
        lines: string[];
        /**
         * An array of the line widths for each line matched to `lines`
         */
        lineWidths: number[];
        /**
         * The measured line height for this style
         */
        lineHeight: number;
        /**
         * The maximum line width for all measured lines
         */
        maxLineWidth: number;
        /**
         * The font properties object from TextMetrics.measureFont
         */
        fontProperties: IFontMetrics;
        /**
         * Cached canvas element for measuring text
         */
        static _canvas: HTMLCanvasElement;
        /**
         * Cache for context to use.
         */
        static _context: CanvasRenderingContext2D;
        /**
         * Cache of {@see PIXI.TextMetrics.FontMetrics} objects.
         */
        static _fonts: {
            [key: string]: IFontMetrics;
        };
        /**
         * String used for calculate font metrics.
         * These characters are all tall to help calculate the height required for text.
         */
        static METRICS_STRING: string;
        /**
         * Baseline symbol for calculate font metrics.
         */
        static BASELINE_SYMBOL: string;
        /**
         * Baseline multiplier for calculate font metrics.
         */
        static BASELINE_MULTIPLIER: number;
        /**
         * Cache of new line chars.
         */
        static _newlines: number[];
        /**
         * Cache of breaking spaces.
         */
        static _breakingSpaces: number[];
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
        constructor(text: string, style: TextStyle, width: number, height: number, lines: string[], lineWidths: number[], lineHeight: number, maxLineWidth: number, fontProperties: IFontMetrics);
        /**
         * Measures the supplied string of text and returns a Rectangle.
         *
         * @param text - the text to measure.
         * @param style - the text style to use for measuring
         * @param wordWrap - optional override for if word-wrap should be applied to the text.
         * @param canvas - optional specification of the canvas to use for measuring.
         * @return measured width and height of the text.
         */
        static measureText(text: string, style: TextStyle, wordWrap: boolean, canvas?: HTMLCanvasElement): TextMetrics;
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
        static wordWrap(text: string, style: TextStyle, canvas?: HTMLCanvasElement): string;
        /**
         * Convienience function for logging each line added during the wordWrap
         * method
         *
         * @private
         * @param  line        - The line of text to add
         * @param  newLine     - Add new line character to end
         * @return A formatted line
         */
        static addLine(line: string, newLine?: boolean): string;
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
        static getFromCache(key: string, letterSpacing: number, cache: {
            [key: string]: number;
        }, context: CanvasRenderingContext2D): number;
        /**
         * Determines whether we should collapse breaking spaces
         *
         * @private
         * @param whiteSpace  The TextStyle property whiteSpace
         * @return should collapse
         */
        static collapseSpaces(whiteSpace: string): boolean;
        /**
         * Determines whether we should collapse newLine chars
         *
         * @private
         * @param whiteSpace  The white space
         * @return should collapse
         */
        static collapseNewlines(whiteSpace: string): boolean;
        /**
         * trims breaking whitespaces from string
         *
         * @private
         * @param text  The text
         * @return trimmed string
         */
        static trimRight(text: string): string;
        /**
         * Determines if char is a newline.
         *
         * @private
         * @param char  The character
         * @return True if newline, False otherwise.
         */
        static isNewline(char: string): boolean;
        /**
         * Determines if char is a breaking whitespace.
         *
         * @private
         * @param char  The character
         * @return True if whitespace, False otherwise.
         */
        static isBreakingSpace(char: string): boolean;
        /**
         * Splits a string into words, breaking-spaces and newLine characters
         *
         * @private
         * @param text       The text
         * @return A tokenized array
         */
        static tokenize(text: string): string[];
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
        static canBreakWords(token: string, breakWords: boolean): boolean;
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
        static canBreakChars(char: string, nextChar: string, token: string, index: number, breakWords: boolean): boolean;
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
        static wordWrapSplit(token: string): string[];
        /**
         * Calculates the ascent, descent and fontSize of a given font-style
         *
         * @param font - String representing the style of the font
         * @return Font properties object
         */
        static measureFont(font: string): IFontMetrics;
        /**
         * Clear font metrics in metrics cache.
         *
         * @param font - font name. If font name not set then clear cache for all fonts.
         */
        static clearMetrics(font?: string): void;
    }
    /**
     * A number, or a string containing a number.
     */
    interface IFontMetrics {
        /**
         * Font ascent
         */
        ascent: number;
        /**
         * Font descent
         */
        descent: number;
        /**
         * Font size
         */
        fontSize: number;
    }
    export {};
}
declare namespace feng3d {
    /**
     * 文本组件
     */
    class Text extends Model {
        geometry: QuadGeometry;
        castShadows: boolean;
        receiveShadows: boolean;
        width: number;
        height: number;
        text: string;
        /**
         * The source texture of the Image element.
         *
         * 图像元素的源纹理。
         */
        image: Texture2D;
        /**
         * Tinting color for this Image.
         *
         * 为该图像着色。
         */
        color: Color4;
        material: Material;
        style: TextStyle;
        beforeRender(gl: GL, renderAtomic: RenderAtomic, scene: Scene, camera: Camera): void;
    }
}
declare namespace feng3d {
    interface UniformsTypes {
        image: ImageUniforms;
    }
    class ImageUniforms {
        __class__: "feng3d.ImageUniforms";
        /**
         * 颜色
         */
        u_color: Color4;
        /**
         * 纹理数据
         */
        s_texture: Texture2D;
    }
    interface Uniforms extends ImageUniforms {
    }
    interface DefaultMaterial {
        "Default-Image": Material;
    }
}
declare namespace feng3d {
    interface PrimitiveGameObject {
        Image: GameObject;
    }
    interface PrimitiveGameObject {
        Text: GameObject;
    }
}
//# sourceMappingURL=feng2d.d.ts.map