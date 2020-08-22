namespace feng2d
{

    /**
     * 可在画布上渲染组件，使得拥有该组件的GameObject可以在画布上渲染。
     */
    @feng3d.AddComponentMenu("Rendering/CanvasRenderer")
    export class CanvasRenderer extends feng3d.Renderable
    {
        readonly renderAtomic = new feng3d.RenderAtomic();

        geometry = feng3d.Geometry.getDefault("Default-UIGeometry");

        @feng3d.oav()
        material = feng3d.Material.getDefault("Default-UIMaterial");

        /**
         * 与世界空间射线相交
         * 
         * @param worldRay 世界空间射线
         * 
         * @return 相交信息
         */
        worldRayIntersection(worldRay: feng3d.Ray3)
        {
            var canvas = this.getComponentsInParents(Canvas)[0];
            if (canvas)
                worldRay = canvas.mouseRay;
            var localRay = this.transform2D.rayWorldToLocal(worldRay);

            var pickingCollisionVO = this.localRayIntersection(localRay);
            if (pickingCollisionVO)
                pickingCollisionVO.cullFace = feng3d.CullFace.NONE;
            return pickingCollisionVO;
        }

        protected _updateBounds()
        {
            var bounding = this.geometry.bounding.clone();
            var transformLayout = this.getComponent(feng3d.TransformLayout);
            if (transformLayout != null)
            {
                bounding.scale(transformLayout.size);
            }
            this._selfLocalBounds = bounding;
        }

        /**
         * 渲染
         */
        static draw(view: feng3d.View)
        {
            var gl = view.gl;
            var scene = view.scene;

            var canvasList = scene.getComponentsInChildren(Canvas).filter(v => v.isVisibleAndEnabled);
            canvasList.forEach(canvas =>
            {
                canvas.layout(gl.canvas.width, gl.canvas.height);

                // 更新鼠标射线
                canvas.calcMouseRay3D(view);

                var renderables = canvas.getComponentsInChildren(CanvasRenderer).filter(v => v.isVisibleAndEnabled);
                renderables.forEach(renderable =>
                {
                    //绘制
                    var renderAtomic = renderable.renderAtomic;

                    renderAtomic.uniforms.u_viewProjection = canvas.projection;

                    renderable.beforeRender(renderAtomic, null, null);

                    gl.render(renderAtomic);
                });

            });
        }
    }
}