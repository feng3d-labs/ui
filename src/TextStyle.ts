namespace feng3d
{
    /**
     * 字体
     */
    export enum FontFamily
    {
        'serif' = 'serif',
        'sans-serif' = 'sans-serif',
        'monospace' = 'monospace',
        'cursive' = 'cursive',
        'fantasy' = 'fantasy',
        'system-ui' = 'system-ui',
    }

    /**
     * 字体样式
     */
    export enum FontStyle
    {
        "normal" = "normal",
        'bold' = 'bold',
        'italic' = 'italic',
        'bold italic' = 'bold italic',
    }

    /**
     * 水平对齐方式
     */
    export enum HorizontalAlign
    {
        'left' = 'left',
        'center' = 'center',
        'right' = 'right',
    }

    /**
     * 垂直对齐方式
     */
    export enum VerticalAlign
    {
        "top" = "top",
        "middle" = "middle",
        "bottom" = "bottom",
    }

    /**
     * 文本样式
     */
    export class TextStyle
    {
        /**
         * 背景颜色，默认透明背景。
         */
        @oav({ tooltip: "背景颜色，默认透明背景。" })
        @serialize
        backgroundColor = new Color4(0, 0, 0, 0);

        /**
         * 字体尺寸。
         */
        @oav({ tooltip: "字体尺寸。" })
        @serialize
        fontSize = 42;

        /**
         * 字体样式。
         */
        @oav({ tooltip: "字体样式。", component: "OAVEnum", componentParam: { enumClass: FontStyle } })
        @serialize
        fontStyle = FontStyle.normal;

        /**
         * 字体类型。
         */
        @oav({ tooltip: "字体类型。", component: "OAVEnum", componentParam: { enumClass: FontFamily } })
        @serialize
        fontFamily = FontFamily["sans-serif"];

        /**
         * 字体颜色。
         */
        @oav({ tooltip: "字体颜色。" })
        @serialize
        fontColor = new Color4(0, 0, 0, 1);

        /**
         * 阴影颜色。
         */
        @oav({ tooltip: "阴影颜色。" })
        @serialize
        shadowColor = new Color4(0, 0, 0, 1);

        /**
         * X轴方向阴影偏移。
         */
        @oav({ tooltip: "X轴方向阴影偏移。" })
        @serialize
        shadowOffsetX = 3;

        /**
         * Y轴方向阴影偏移。
         */
        @oav({ tooltip: "Y轴方向阴影偏移。" })
        @serialize
        shadowOffsetY = 3;

        /**
         * 阴影模糊度。
         */
        @oav({ tooltip: "阴影模糊度。" })
        @serialize
        shadowBlur = 4;

        /**
         * 水平对齐方式。
         */
        @oav({ tooltip: "水平对齐方式。", component: "OAVEnum", componentParam: { enumClass: HorizontalAlign } })
        @serialize
        horizontalAlign = HorizontalAlign.left;

        /**
         * 垂直对齐方式。
         */
        @oav({ tooltip: "垂直对齐方式。", component: "OAVEnum", componentParam: { enumClass: VerticalAlign } })
        @serialize
        verticalAlign = VerticalAlign.top;
    }
}