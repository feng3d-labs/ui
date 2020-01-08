namespace feng3d
{
    export function drawText(text: string, width: number, height: number, style: TextStyle)
    {
        var canvas = document.createElement('canvas');
        if (!canvas)
        {
            console.log('Failed to create canvas');
            return null;
        }

        canvas.width = width;
        canvas.height = width;

        var ctx = canvas.getContext('2d');
        if (!ctx)
        {
            console.log('Failed to get rendering context for 2d context');
            return null;
        }

        // Clear <canvas> with a white
        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set text properties
        ctx.font = '42px bold sans-serif';
        ctx.fillStyle = 'rgba(53, 60, 145, 1.0)';
        ctx.textBaseline = 'middle';

        ctx.shadowColor = 'rgba(19, 169, 184, 1.0)';
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 4;

        // Draw a text
        var textWidth = ctx.measureText(text).width;
        ctx.fillText(text, (canvas.width - textWidth) / 2, canvas.height / 2 + 100);

        var imagedata = ctx.getImageData(0, 0, canvas.height, canvas.height);
        return imagedata;
    }
}