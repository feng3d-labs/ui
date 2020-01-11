namespace feng3d
{

    /**
     * 前向渲染器

     */
    export var canvasRenderer: CanvasRenderer;

    /**
     * 前向渲染器
     */
    export class CanvasRenderer
    {
        /**
         * 渲染
         */
        draw(gl: GL, canvas: Canvas)
        {
            var renderables = canvas.getComponentsInChildren(CanvasRenderable);

            renderables.forEach(renderable =>
            {
                //绘制
                var renderAtomic = renderable.renderAtomic;

                renderAtomic.uniforms.u_viewProjection = canvas.projection;

                renderable.beforeRender(gl, renderAtomic, null, null);

                gl.render(renderAtomic);
            });
        }
    }

    canvasRenderer = new CanvasRenderer();
}