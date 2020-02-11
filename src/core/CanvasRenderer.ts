namespace feng2d
{

    /**
     * 可在画布上渲染组件，使得拥有该组件的GameObject可以在画布上渲染。
     */
    @feng3d.AddComponentMenu("Rendering/CanvasRenderer")
    export class CanvasRenderer extends feng3d.Behaviour
    {
        readonly renderAtomic = new feng3d.RenderAtomic();

        geometry = feng3d.Geometry.getDefault("Default-UIGeometry");

        @feng3d.oav()
        material = feng3d.Material.getDefault("Default-UIMaterial");

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
        beforeRender(gl: feng3d.GL, renderAtomic: feng3d.RenderAtomic, scene: feng3d.Scene, camera: feng3d.Camera)
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
        static draw(gl: feng3d.GL, scene: feng3d.Scene)
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