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
     * 2D变换
     *
     * 提供了比Transform更加适用于2D元素的API
     *
     * 通过修改Transform的数值实现
     */
    class Transform2D extends Component {
        get single(): boolean;
        /**
         * 创建一个实体，该类为虚类
         */
        constructor();
        init(): void;
        /**
         * X轴坐标。
         */
        get x(): number;
        set x(v: number);
        /**
         * Y轴坐标。
         */
        get y(): number;
        set y(v: number);
        /**
         * X轴缩放。
         */
        get sx(): number;
        set sx(v: number);
        /**
         * Y轴缩放。
         */
        get sy(): number;
        set sy(v: number);
        /**
         * 本地位移
         */
        get position(): Vector2;
        set position(v: Vector2);
        /**
         * 本地旋转
         */
        rotation: number;
        /**
         * 本地缩放
         */
        get scale(): Vector2;
        set scale(v: Vector2);
        /**
         * 本地变换矩阵
         */
        get matrix(): Matrix3x3;
        set matrix(v: Matrix3x3);
        private readonly _position;
        private readonly _scale;
        protected readonly _matrix: Matrix3x3;
        private _positionChanged;
        private _rotationChanged;
        private _scaleChanged;
        private _onTransformChanged;
    }
}
declare namespace feng3d {
    /**
     * 前向渲染器

     */
    var canvasRenderer: CanvasRenderer;
    /**
     * 前向渲染器
     */
    class CanvasRenderer {
        /**
         * 渲染
         */
        draw(gl: GL, canvas: Canvas): void;
    }
}
declare namespace feng3d {
    /**
     * 可在画布上渲染组件，使得拥有该组件的GameObject可以在画布上渲染。
     */
    class CanvasRenderable extends Behaviour {
        readonly renderAtomic: RenderAtomic;
        geometry: QuadGeometry;
        material: Material;
        /**
         * 渲染前执行函数
         *
         * 可用于渲染前收集渲染数据，或者更新显示效果等
         *
         * @param gl
         * @param renderAtomic
         * @param scene
         * @param camera
         */
        beforeRender(gl: GL, renderAtomic: RenderAtomic, scene: Scene, camera: Camera): void;
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
        width: number;
        height: number;
        init(): void;
        /**
         * 更新布局
         *
         * @param width 画布宽度
         * @param height 画布高度
         */
        layout(width: number, height: number): void;
        /**
         * 投影矩阵
         *
         * 渲染前自动更新
         */
        projection: Matrix4x4;
    }
}
declare namespace feng3d {
    /**
     * 图片组件
     */
    class Image extends Component {
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
     *
     * 从pixi.js移植
     *
     * @see https://github.com/pixijs/pixi.js/blob/dev/packages/text/src/TextStyle.js
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
     * 文本度量
     *
     * 用于度量指定样式的文本的宽度。
     *
     * 从pixi.js移植
     *
     * @see https://github.com/pixijs/pixi.js/blob/dev/packages/text/src/TextMetrics.js
     */
    export class TextMetrics {
        /**
         * 被测量的文本。
         */
        text: string;
        /**
         * 被测量的样式。
         */
        style: TextStyle;
        /**
         * 测量出的宽度。
         */
        width: number;
        /**
         * 测量出的高度。
         */
        height: number;
        /**
         * 根据样式分割成的多行文本。
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
    class Text extends Renderable {
        geometry: QuadGeometry;
        castShadows: boolean;
        receiveShadows: boolean;
        width: number;
        height: number;
        text: string;
        isAutoSize: boolean;
        /**
         * The source texture of the Image element.
         *
         * 图像元素的源纹理。
         */
        image: Texture2D;
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
        Canvas: GameObject;
        Image: GameObject;
        Text: GameObject;
    }
}
declare namespace feng3d {
}
//# sourceMappingURL=feng2d.d.ts.map