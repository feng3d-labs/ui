namespace feng3d
{

    /**
     * Constants that define the type of gradient on text.
     * 定义文本上渐变类型的常量。
     */
    export enum TEXT_GRADIENT
    {
        /**
         * Vertical gradient
         */
        LINEAR_VERTICAL = 0,
        /**
         * Linear gradient
         */
        LINEAR_HORIZONTAL = 1,
    }

    const defaultStyle: Partial<TextStyle> = {
        align: 'left',
        breakWords: false,
        dropShadow: false,
        dropShadowAlpha: 1,
        dropShadowAngle: Math.PI / 6,
        dropShadowBlur: 0,
        dropShadowColor: 'black',
        dropShadowDistance: 5,
        fill: 'black',
        fillGradientType: TEXT_GRADIENT.LINEAR_VERTICAL,
        fillGradientStops: [],
        fontFamily: 'Arial',
        fontSize: 26,
        fontStyle: 'normal',
        fontVariant: 'normal',
        fontWeight: 'normal',
        letterSpacing: 0,
        lineHeight: 0,
        lineJoin: 'miter',
        miterLimit: 10,
        padding: 0,
        stroke: 'black',
        strokeThickness: 0,
        textBaseline: 'alphabetic',
        trim: false,
        whiteSpace: 'pre',
        wordWrap: false,
        wordWrapWidth: 100,
        leading: 0,
    };

    const genericFontFamilies = [
        'serif',
        'sans-serif',
        'monospace',
        'cursive',
        'fantasy',
        'system-ui',
    ]

    /**
     * A TextStyle Object contains information to decorate a Text objects.
     *
     * An instance can be shared between multiple Text objects; then changing the style will update all text objects using it.
     *
     * A tool can be used to generate a text style [here](https://pixijs.io/pixi-text-style).
     *
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
         * Alignment for multiline text ('left', 'center' or 'right'), does not affect single line text
         */
        @watch("invalidate")
        align: 'left' | 'center' | 'right' = 'left';

        /**
         * Indicates if lines can be wrapped within words, it needs wordWrap to be set to true
         */
        @watch("invalidate")
        breakWords = false;

        /**
         * Set a drop shadow for the text
         */
        @watch("invalidate")
        dropShadow = false;

        /**
         * Set alpha for the drop shadow
         */
        @watch("invalidate")
        dropShadowAlpha = 1;

        /**
         * Set a angle of the drop shadow
         */
        @watch("invalidate")
        dropShadowAngle = Math.PI / 6;

        /**
         * Set a shadow blur radius
         */
        @watch("invalidate")
        dropShadowBlur = 0;

        /**
         * A fill style to be used on the dropshadow e.g 'red', '#00FF00'
         */
        @watch("invalidate")
        dropShadowColor: string | number = 'black';

        /**
         * Set a distance of the drop shadow
         */
        @watch("invalidate")
        dropShadowDistance = 5;

        /**
         * A canvas fillstyle that will be used on the text e.g 'red', '#00FF00'.
         * Can be an array to create a gradient eg ['#000000','#FFFFFF']
         * 
         * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
         */
        @watch("invalidate")
        fill: string | number = 'black';

        /**
         * If fill is an array of colours to create a gradient, this can change the type/direction of the gradient.
         */
        @watch("invalidate")
        fillGradientType = TEXT_GRADIENT.LINEAR_VERTICAL;

        /**
         * If fill is an array of colours to create a gradient, this array can set the stop points
         * (numbers between 0 and 1) for the color, overriding the default behaviour of evenly spacing them.
         */
        @watch("invalidate")
        fillGradientStops: number[] = [];

        /**
         * The font family
         */
        @watch("invalidate")
        fontFamily: string | string[] = 'Arial';

        /**
         * The font size
         * (as a number it converts to px, but as a string, equivalents are '26px','20pt','160%' or '1.6em')
         */
        @watch("invalidate")
        fontSize = 26;

        /**
         * The font style
         * ('normal', 'italic' or 'oblique')
         */
        @watch("invalidate")
        fontStyle = 'normal';

        /**
         * The font variant
         * ('normal' or 'small-caps')
         */
        @watch("invalidate")
        fontVariant = 'normal';

        /**
         * The font weight
         * ('normal', 'bold', 'bolder', 'lighter' and '100', '200', '300', '400', '500', '600', '700', 800' or '900')
         */
        @watch("invalidate")
        fontWeight = 'normal';

        /**
         * The amount of spacing between letters, default is 0
         */
        @watch("invalidate")
        letterSpacing = 0;

        /**
         * The line height, a number that represents the vertical space that a letter uses
         */
        @watch("invalidate")
        lineHeight = 0;

        /**
         * The space between lines
         */
        @watch("invalidate")
        leading = 0;

        /**
         * The lineJoin property sets the type of corner created, it can resolve spiked text issues.
         * Default is 'miter' (creates a sharp corner).
         */
        @watch("invalidate")
        lineJoin: CanvasLineJoin = 'miter';

        /**
         * The miter limit to use when using the 'miter' lineJoin mode
         * This can reduce or increase the spikiness of rendered text.
         */
        @watch("invalidate")
        miterLimit = 10;

        /**
         * Occasionally some fonts are cropped. Adding some padding will prevent this from happening
         * by adding padding to all sides of the text.
         */
        @watch("invalidate")
        padding = 0;

        /**
         * A canvas fillstyle that will be used on the text stroke
         * e.g 'blue', '#FCFF00'
         */
        @watch("invalidate")
        stroke: string | CanvasGradient | CanvasPattern = 'black';

        /**
         * A number that represents the thickness of the stroke.
         * Default is 0 (no stroke)
         */
        @watch("invalidate")
        strokeThickness = 0;

        /**
         * The baseline of the text that is rendered.
         */
        @watch("invalidate")
        textBaseline: CanvasTextBaseline = 'alphabetic';

        /**
         * Trim transparent borders
         */
        @watch("invalidate")
        trim = false;

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
        @watch("invalidate")
        whiteSpace = 'pre';

        /**
         * Indicates if word wrap should be used
         */
        @watch("invalidate")
        wordWrap = false;

        /**
         * The width at which text will wrap, it needs wordWrap to be set to true
         */
        @watch("invalidate")
        wordWrapWidth = 100;

        /**
         * 使数据失效
         */
        invalidate()
        {
            this.styleID++;
        }

        /**
         * Generates a font style string to use for `TextMetrics.measureFont()`.
         *
         * @return Font style string, for passing to `TextMetrics.measureFont()`
         */
        toFontString()
        {
            // build canvas api font setting from individual components. Convert a numeric this.fontSize to px
            const fontSizeString = (typeof this.fontSize === 'number') ? `${this.fontSize}px` : this.fontSize;

            // Clean-up fontFamily property by quoting each font name
            // this will support font names with spaces
            let fontFamilies: string[] = <any>this.fontFamily;

            if (!Array.isArray(this.fontFamily))
            {
                fontFamilies = this.fontFamily.split(',');
            }

            for (let i = fontFamilies.length - 1; i >= 0; i--)
            {
                // Trim any extra white-space
                let fontFamily = fontFamilies[i].trim();

                // Check if font already contains strings
                if (!(/([\"\'])[^\'\"]+\1/).test(fontFamily) && genericFontFamilies.indexOf(fontFamily) < 0)
                {
                    fontFamily = `"${fontFamily}"`;
                }
                fontFamilies[i] = fontFamily;
            }

            return `${this.fontStyle} ${this.fontVariant} ${this.fontWeight} ${fontSizeString} ${fontFamilies.join(',')}`;
        }
    }

    /**
     * Utility function to convert hexadecimal colors to strings, and simply return the color if it's a string.
     * @param color
     * @return The color as a string.
     */
    function getSingleColor(color: string | number)
    {
        if (typeof color === 'number')
        {
            return hex2string(color);
        }
        else if (typeof color === 'string')
        {
            if (color.indexOf('0x') === 0)
            {
                color = color.replace('0x', '#');
            }
        }

        return color;
    }

    /**
     * Utility function to convert hexadecimal colors to strings, and simply return the color if it's a string.
     * This version can also convert array of colors
     * 
     * @param array1 First array to compare
     * @param array2 Second array to compare
     * @return Do the arrays contain the same values in the same order
     */
    function areArraysEqual(array1: any[], array2: any[])
    {
        if (!Array.isArray(array1) || !Array.isArray(array2))
        {
            return false;
        }

        if (array1.length !== array2.length)
        {
            return false;
        }

        for (let i = 0; i < array1.length; ++i)
        {
            if (array1[i] !== array2[i])
            {
                return false;
            }
        }

        return true;
    }

    /**
     * Converts a hexadecimal color number to a string.
     *
     * @example
     * PIXI.utils.hex2string(0xffffff); // returns "#ffffff"
     */
    function hex2string(hex: number): string
    {
        let hexString = hex.toString(16);

        hexString = '000000'.substr(0, 6 - hexString.length) + hexString;

        return `#${hexString}`;
    }
}