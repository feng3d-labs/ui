namespace feng3d
{
    export function drawText(text: string, width: number, height: number, style: TextStyle, autoSize = false)
    {
        var canvas = document.createElement('canvas');
        if (!canvas)
        {
            console.log('Failed to create canvas');
            return null;
        }

        canvas.width = width;
        canvas.height = height;

        var ctx = canvas.getContext('2d');
        if (!ctx)
        {
            console.log('Failed to get rendering context for 2d context');
            return null;
        }

        // Clear <canvas> with a white
        ctx.fillStyle = style.backgroundColor.toRGBA();
        ctx.fillRect(0, 0, width, height);

        // Set text properties
        ctx.font = `${style.fontSize}px ${style.fontStyle} ${style.fontFamily}`;
        ctx.fillStyle = style.fontColor.toRGBA();

        ctx.shadowColor = style.shadowColor.toRGBA();
        ctx.shadowOffsetX = style.shadowOffsetX;
        ctx.shadowOffsetY = style.shadowOffsetY;
        ctx.shadowBlur = style.shadowBlur;

        // Draw a text
        var textWidth = ctx.measureText(text).width;
        var x = 0;
        var y = 0;
        if (style.horizontalAlign == HorizontalAlign.left)
            x = 0;
        else if (style.horizontalAlign == HorizontalAlign.center)
            x = (width - textWidth) / 2;
        else if (style.horizontalAlign == HorizontalAlign.right)
            x = width - textWidth;
        if (style.verticalAlign == VerticalAlign.top)
            y = 0;
        else if (style.verticalAlign == VerticalAlign.middle)
            y = height / 2;
        else if (style.verticalAlign == VerticalAlign.bottom)
            y = height;

        ctx.textBaseline = style.verticalAlign;



        ctx.fillText(text, x, y);
        var imagedata = ctx.getImageData(0, 0, width, height);
        return imagedata;
    }
}