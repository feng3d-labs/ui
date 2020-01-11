namespace feng3d
{
    View.prototype

    functionwrap.extendFunction(View.prototype, "render", function (r, interval)
    {
        CanvasRenderer.draw(this.gl, this.scene);
    });
}