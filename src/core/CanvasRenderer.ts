namespace feng2d
{

    /**
     * 可在画布上渲染组件，使得拥有该组件的GameObject可以在画布上渲染。
     */
    @feng3d.AddComponentMenu("Rendering/CanvasRenderer")
    export class CanvasRenderer extends feng3d.RayCastable
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
        beforeRender(renderAtomic: feng3d.RenderAtomic, scene: feng3d.Scene, camera: feng3d.Camera)
        {
            //
            this.geometry.beforeRender(renderAtomic);
            this.material.beforeRender(renderAtomic);

            this.gameObject.components.forEach(element =>
            {
                if (element != this)
                    element.beforeRender(renderAtomic, scene, camera);
            });
        }

        /**
          * 判断射线是否穿过对象
          * @param ray3D
          * @return
          */
        isIntersectingRay(view: feng3d.View)
        {
            var canvas = this.getComponentsInParents(Canvas)[0];
            var worldRay = canvas.mouseRay;

            var localNormal = new feng3d.Vector3();

            //转换到当前实体坐标系空间
            var localRay = new feng3d.Ray3();

            this.transform.worldToLocalMatrix.transformVector(worldRay.position, localRay.position);
            this.transform.worldToLocalMatrix.deltaTransformVector(worldRay.direction, localRay.direction);

            var size = new feng3d.Vector3(this.transform2D.size.x, this.transform2D.size.y, 1);
            localRay.position.divide(size);
            localRay.direction.divide(size).normalize();

            //检测射线与边界的碰撞
            var rayEntryDistance = this.selfLocalBounds.rayIntersection(localRay.position, localRay.direction, localNormal);
            if (rayEntryDistance < 0)
                return null;

            //保存碰撞数据
            var pickingCollisionVO: feng3d.PickingCollisionVO = {
                gameObject: this.gameObject,
                localNormal: localNormal,
                localRay: localRay,
                rayEntryDistance: rayEntryDistance,
                ray3D: worldRay,
                rayOriginIsInsideBounds: rayEntryDistance == 0,
                geometry: this.geometry,
                cullFace: feng3d.CullFace.NONE,
            };

            return pickingCollisionVO;
        }

        protected _updateBounds()
        {
            this._selfLocalBounds = this.geometry.bounding;
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