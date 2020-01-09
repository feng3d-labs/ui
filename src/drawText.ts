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

        var ctx = canvas.getContext('2d');
        if (!ctx)
        {
            console.log('Failed to get rendering context for 2d context');
            return null;
        }

        // 
        ctx.font = `${style.fontSize}px ${style.fontStyle} ${style.fontFamily}`;

        // 测量文本宽度
        var textWidth = ctx.measureText(text).width;
        if (autoSize)
        {
            width = textWidth + Math.abs(style.shadowOffsetX) + Math.abs(style.shadowBlur);
            height = style.fontSize * 0.5;
        }
        canvas.width = width;
        canvas.height = height;

        // 绘制背景
        ctx.fillStyle = style.backgroundColor.toRGBA();
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = style.fontColor.toRGBA();

        ctx.shadowColor = style.shadowColor.toRGBA();
        ctx.shadowOffsetX = style.shadowOffsetX;
        ctx.shadowOffsetY = style.shadowOffsetY;
        ctx.shadowBlur = style.shadowBlur;

        var x = 0;
        var y = 0;
        if (style.horizontalAlign == HorizontalAlign.left)
        {
            x = 0;
            if (style.shadowOffsetX < 0) x -= style.shadowOffsetX;
        }
        else if (style.horizontalAlign == HorizontalAlign.center)
            x = (width - textWidth) / 2;
        else if (style.horizontalAlign == HorizontalAlign.right)
        {
            x = width - textWidth;
            if (style.shadowOffsetX > 0) x -= style.shadowOffsetX;
        }
        if (style.verticalAlign == VerticalAlign.top)
        {
            y = 0;
            if (style.shadowOffsetY < 0) y -= style.shadowOffsetY;
        }
        else if (style.verticalAlign == VerticalAlign.middle)
            y = height / 2;
        else if (style.verticalAlign == VerticalAlign.bottom)
        {
            y = height;
            if (style.shadowOffsetY > 0) y -= style.shadowOffsetY;
        }

        ctx.textBaseline = style.verticalAlign;

        ctx.fillText(text, x, y);
        var imagedata = ctx.getImageData(0, 0, width, height);

        return { imagedata: imagedata, width: width, height: height };
    }
}