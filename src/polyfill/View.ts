namespace feng3d
{
    functionwrap.extendFunction(View.prototype, "render", function (r, interval)
    {
        CanvasRenderer.draw(this);
    });
}