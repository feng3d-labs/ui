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
     * Converts a hexadecimal color number to an [R, G, B] array of normalized floats (numbers from 0.0 to 1.0).
     *
     * @example
     * PIXI.utils.hex2rgb(0xffffff); // returns [1, 1, 1]
     *
     * @param hex - The hexadecimal number to convert
     * @param out If supplied, this array will be used rather than returning a new one
     * @return An array representing the [R, G, B] of the color where all values are floats.
     */
    function hex2rgb(hex: number, out?: number[]): number[];
    /**
     * Converts a hexadecimal color number to a string.
     *
     * @example
     * PIXI.utils.hex2string(0xffffff); // returns "#ffffff"
     *
     * @param hex - Number in hex (e.g., `0xffffff`)
     * @return The string color (e.g., `"#ffffff"`).
     */
    function hex2string(hex: number): string;
    /**
     * Converts a hexadecimal string to a hexadecimal color number.
     *
     * @example
     * PIXI.utils.string2hex("#ffffff"); // returns 0xffffff
     *
     * @param The string color (e.g., `"#ffffff"`)
     * @return Number in hexadecimal.
     */
    function string2hex(string: string): number;
    /**
     * Converts a color as an [R, G, B] array of normalized floats to a hexadecimal number.
     *
     * @example
     * PIXI.utils.rgb2hex([1, 1, 1]); // returns 0xffffff
     *
     * @param rgb - Array of numbers where all values are normalized floats from 0.0 to 1.0.
     * @return Number in hexadecimal.
     */
    function rgb2hex(rgb: number[]): number;
}
declare namespace feng3d {
    function drawText(canvas: HTMLCanvasElement, _text: string, style: TextStyle, resolution?: number): HTMLCanvasElement;
}
declare namespace feng3d {
    /**
     * Trim transparent borders from a canvas
     *
     * @param canvas - the canvas to trim
     */
    function trimCanvas(canvas: HTMLCanvasElement): {
        height: number;
        width: number;
        data: any;
    };
}
declare namespace feng3d {
    /**
     * Constants that define the type of gradient on text.
     */
    enum TEXT_GRADIENT {
        /**
         * Vertical gradient
         */
        LINEAR_VERTICAL = 0,
        /**
         * Linear gradient
         */
        LINEAR_HORIZONTAL = 1
    }
    /**
     * A TextStyle Object contains information to decorate a Text objects.
     *
     * An instance can be shared between multiple Text objects; then changing the style will update all text objects using it.
     *
     * A tool can be used to generate a text style [here](https://pixijs.io/pixi-text-style).
     *
     * @class
     * @memberof PIXI
     */
    class TextStyle {
        styleID: number;
        private _align;
        private _breakWords;
        private _dropShadow;
        private _dropShadowAlpha;
        private _dropShadowAngle;
        private _dropShadowBlur;
        private _dropShadowColor;
        private _dropShadowDistance;
        private _fill;
        private _fillGradientType;
        private _fillGradientStops;
        private _fontFamily;
        private _fontSize;
        private _fontStyle;
        private _fontVariant;
        private _fontWeight;
        private _letterSpacing;
        private _lineHeight;
        private _lineJoin;
        private _miterLimit;
        private _padding;
        private _stroke;
        private _strokeThickness;
        private _textBaseline;
        private _trim;
        private _whiteSpace;
        private _wordWrap;
        private _wordWrapWidth;
        private _leading;
        /**
         * @param style - The style parameters
         */
        constructor(style?: Partial<TextStyle>);
        /**
         * Creates a new TextStyle object with the same values as this one.
         * Note that the only the properties of the object are cloned.
         *
         * @return New cloned TextStyle object
         */
        clone(): TextStyle;
        /**
         * Resets all properties to the defaults specified in TextStyle.prototype._default
         */
        reset(): void;
        /**
         * Alignment for multiline text ('left', 'center' or 'right'), does not affect single line text
         */
        get align(): "left" | "right" | "center";
        set align(align: "left" | "right" | "center");
        /**
         * Indicates if lines can be wrapped within words, it needs wordWrap to be set to true
         */
        get breakWords(): boolean;
        set breakWords(breakWords: boolean);
        /**
         * Set a drop shadow for the text
         */
        get dropShadow(): boolean;
        set dropShadow(dropShadow: boolean);
        /**
         * Set alpha for the drop shadow
         */
        get dropShadowAlpha(): number;
        set dropShadowAlpha(dropShadowAlpha: number);
        /**
         * Set a angle of the drop shadow
         */
        get dropShadowAngle(): number;
        set dropShadowAngle(dropShadowAngle: number);
        /**
         * Set a shadow blur radius
         */
        get dropShadowBlur(): number;
        set dropShadowBlur(dropShadowBlur: number);
        /**
         * A fill style to be used on the dropshadow e.g 'red', '#00FF00'
         */
        get dropShadowColor(): string | number;
        set dropShadowColor(dropShadowColor: string | number);
        /**
         * Set a distance of the drop shadow
         */
        get dropShadowDistance(): number;
        set dropShadowDistance(dropShadowDistance: number);
        /**
         * A canvas fillstyle that will be used on the text e.g 'red', '#00FF00'.
         * Can be an array to create a gradient eg ['#000000','#FFFFFF']
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
         */
        get fill(): string | number;
        set fill(fill: string | number);
        /**
         * If fill is an array of colours to create a gradient, this can change the type/direction of the gradient.
         */
        get fillGradientType(): TEXT_GRADIENT;
        set fillGradientType(fillGradientType: TEXT_GRADIENT);
        /**
         * If fill is an array of colours to create a gradient, this array can set the stop points
         * (numbers between 0 and 1) for the color, overriding the default behaviour of evenly spacing them.
         */
        get fillGradientStops(): number[];
        set fillGradientStops(fillGradientStops: number[]);
        /**
         * The font family
         */
        get fontFamily(): string | string[];
        set fontFamily(fontFamily: string | string[]);
        /**
         * The font size
         * (as a number it converts to px, but as a string, equivalents are '26px','20pt','160%' or '1.6em')
         */
        get fontSize(): number;
        set fontSize(fontSize: number);
        /**
         * The font style
         * ('normal', 'italic' or 'oblique')
         */
        get fontStyle(): string;
        set fontStyle(fontStyle: string);
        /**
         * The font variant
         * ('normal' or 'small-caps')
         */
        get fontVariant(): string;
        set fontVariant(fontVariant: string);
        /**
         * The font weight
         * ('normal', 'bold', 'bolder', 'lighter' and '100', '200', '300', '400', '500', '600', '700', 800' or '900')
         */
        get fontWeight(): string;
        set fontWeight(fontWeight: string);
        /**
         * The amount of spacing between letters, default is 0
         */
        get letterSpacing(): number;
        set letterSpacing(letterSpacing: number);
        /**
         * The line height, a number that represents the vertical space that a letter uses
         */
        get lineHeight(): number;
        set lineHeight(lineHeight: number);
        /**
         * The space between lines
         */
        get leading(): number;
        set leading(leading: number);
        /**
         * The lineJoin property sets the type of corner created, it can resolve spiked text issues.
         * Default is 'miter' (creates a sharp corner).
         */
        get lineJoin(): CanvasLineJoin;
        set lineJoin(lineJoin: CanvasLineJoin);
        /**
         * The miter limit to use when using the 'miter' lineJoin mode
         * This can reduce or increase the spikiness of rendered text.
         */
        get miterLimit(): number;
        set miterLimit(miterLimit: number);
        /**
         * Occasionally some fonts are cropped. Adding some padding will prevent this from happening
         * by adding padding to all sides of the text.
         */
        get padding(): number;
        set padding(padding: number);
        /**
         * A canvas fillstyle that will be used on the text stroke
         * e.g 'blue', '#FCFF00'
         */
        get stroke(): string | CanvasGradient | CanvasPattern;
        set stroke(stroke: string | CanvasGradient | CanvasPattern);
        /**
         * A number that represents the thickness of the stroke.
         * Default is 0 (no stroke)
         */
        get strokeThickness(): number;
        set strokeThickness(strokeThickness: number);
        /**
         * The baseline of the text that is rendered.
         */
        get textBaseline(): CanvasTextBaseline;
        set textBaseline(textBaseline: CanvasTextBaseline);
        /**
         * Trim transparent borders
         */
        get trim(): boolean;
        set trim(trim: boolean);
        /**
         * How newlines and spaces should be handled.
         * Default is 'pre' (preserve, preserve).
         *
         *  value       | New lines     |   Spaces
         *  ---         | ---           |   ---
         * 'normal'     | Collapse      |   Collapse
         * 'pre'        | Preserve      |   Preserve
         * 'pre-line'   | Preserve      |   Collapse
         */
        get whiteSpace(): string;
        set whiteSpace(whiteSpace: string);
        /**
         * Indicates if word wrap should be used
         */
        get wordWrap(): boolean;
        set wordWrap(wordWrap: boolean);
        /**
         * The width at which text will wrap, it needs wordWrap to be set to true
         */
        get wordWrapWidth(): number;
        set wordWrapWidth(wordWrapWidth: number);
        /**
         * Generates a font style string to use for `TextMetrics.measureFont()`.
         *
         * @return Font style string, for passing to `TextMetrics.measureFont()`
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
        beforeRender(gl: GL, renderAtomic: RenderAtomic, scene: Scene, camera: Camera): void;
        getImagedata(): HTMLCanvasElement;
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