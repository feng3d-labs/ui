namespace feng2d
{
    /**
     * 矩形纯色组件
     * 
     * 用于填充UI中背景等颜色。
     */
    export class Rect extends feng3d.Component
    {
        /**
         * 填充颜色。
         */
        @feng3d.oav()
        @feng3d.serialize
        color = new feng3d.Color4();

        beforeRender(gl: feng3d.GL, renderAtomic: feng3d.RenderAtomic, scene: feng3d.Scene, camera: feng3d.Camera)
        {
            super.beforeRender(gl, renderAtomic, scene, camera);

            renderAtomic.uniforms.u_color = this.color;
        }
    }
}

namespace feng3d
{
    /**
     * 原始游戏对象，可以通过GameObject.createPrimitive进行创建。
     */
    export interface PrimitiveGameObject
    {
        Rect: GameObject;
    }
}