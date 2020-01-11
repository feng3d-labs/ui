namespace feng3d
{
    View.prototype

    functionwrap.extendFunction(View.prototype, "render", function (r, interval)
    {
        this.scene.getComponentsInChildren(Canvas).forEach(canvas =>
        {
            canvas.layout(this.canvas.width, this.canvas.height);

            canvasRenderer.draw(this.gl, canvas);
        });
    });
}