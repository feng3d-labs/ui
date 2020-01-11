namespace feng3d
{

    /**
     * 可在画布上渲染组件，使得拥有该组件的GameObject可以在画布上渲染。
     */
    export class CanvasRenderer extends Behaviour
    {
        readonly renderAtomic = new RenderAtomic();

        geometry = Geometry.getDefault("Default-UIGeometry");

        material = Material.getDefault("Default-Image");

        /**
         * 渲染前执行函数
         * 
         * 可用于渲染前收集渲染数据，或者更新显示效果等
         * 
         * @param gl 
         * @param renderAtomic 
         * @param scene 
         * @param camera 
         */
        beforeRender(gl: GL, renderAtomic: RenderAtomic, scene: Scene, camera: Camera)
        {
            //
            this.geometry.beforeRender(renderAtomic);
            this.material.beforeRender(renderAtomic);

            this.gameObject.components.forEach(element =>
            {
                if (element != this)
                    element.beforeRender(gl, renderAtomic, scene, camera);
            });
        }

        /**
         * 渲染
         */
        static draw(gl: GL, scene: Scene)
        {
            var canvasList = scene.getComponentsInChildren(Canvas).filter(v => v.isVisibleAndEnabled);
            canvasList.forEach(canvas =>
            {
                canvas.layout(gl.canvas.width, gl.canvas.height);

                var renderables = canvas.getComponentsInChildren(CanvasRenderer).filter(v => v.isVisibleAndEnabled);
                renderables.forEach(renderable =>
                {
                    //绘制
                    var renderAtomic = renderable.renderAtomic;

                    renderAtomic.uniforms.u_viewProjection = canvas.projection;

                    renderable.beforeRender(gl, renderAtomic, null, null);

                    gl.render(renderAtomic);
                });

            });
        }
    }
}