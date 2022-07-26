import { AddComponentMenu, Geometry, Material, RegisterComponent, Renderable, TransformLayout, View } from '@feng3d/core';
import { Ray3, Vector3 } from '@feng3d/math';
import { oav } from '@feng3d/objectview';
import { CullFace, RenderAtomic } from '@feng3d/renderer';
import { Canvas } from './Canvas';

declare global
{
    export interface MixinsComponentMap
    {
        CanvasRenderer: CanvasRenderer;
    }
}

/**
 * 可在画布上渲染组件，使得拥有该组件的GameObject可以在画布上渲染。
 */
@AddComponentMenu('Rendering/CanvasRenderer')
@RegisterComponent()
export class CanvasRenderer extends Renderable
{
    readonly renderAtomic = new RenderAtomic();

    geometry = Geometry.getDefault('Default-UIGeometry');

    @oav()
    material = Material.getDefault('Default-UIMaterial');

    /**
     * 与世界空间射线相交
     *
     * @param worldRay 世界空间射线
     *
     * @return 相交信息
     */
    worldRayIntersection(worldRay: Ray3)
    {
        const canvas = this.getComponentsInParent(Canvas)[0];
        if (canvas)
        {
            worldRay = canvas.mouseRay;
        }

        const localRay = this.transform.rayWorldToLocal(worldRay);
        if (this.transform2D)
        {
            const size = new Vector3(this.transform2D.size.x, this.transform2D.size.y, 1);
            const pivot = new Vector3(this.transform2D.pivot.x, this.transform2D.pivot.y, 0);
            localRay.origin.divide(size).add(pivot);
            localRay.direction.divide(size).normalize();
        }

        const pickingCollisionVO = this.localRayIntersection(localRay);
        if (pickingCollisionVO)
        {
            pickingCollisionVO.cullFace = CullFace.NONE;
        }

        return pickingCollisionVO;
    }

    protected _updateBounds()
    {
        const bounding = this.geometry.bounding.clone();
        const transformLayout = this.getComponent(TransformLayout);
        if (transformLayout)
        {
            bounding.scale(transformLayout.size);
        }
        this._selfLocalBounds = bounding;
    }

    /**
     * 渲染
     */
    static draw(view: View)
    {
        const gl = view.gl.gl;
        const scene = view.scene;

        const canvasList = scene.getComponentsInChildren(Canvas).filter((v) => v.isVisibleAndEnabled);
        canvasList.forEach((canvas) =>
        {
            canvas.layout(gl.canvas.width, gl.canvas.height);

            // 更新鼠标射线
            canvas.calcMouseRay3D(view);

            const renderables = canvas.getComponentsInChildren(CanvasRenderer).filter((v) => v.isVisibleAndEnabled);
            renderables.forEach((renderable) =>
            {
                // 绘制
                const renderAtomic = renderable.renderAtomic;

                renderAtomic.uniforms.u_viewProjection = canvas.projection;

                renderable.beforeRender(renderAtomic, null, null);

                view.gl.render(renderAtomic);
            });
        });
    }
}
