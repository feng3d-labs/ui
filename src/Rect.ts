namespace feng3d
{
    /**
     * 矩形纯色组件
     * 
     * 用于填充UI中背景等颜色。
     */
    export class Rect extends Component
    {
        /**
         * 填充颜色。
         */
        @oav()
        @serialize
        color = new Color4();

        beforeRender(gl: GL, renderAtomic: RenderAtomic, scene: Scene, camera: Camera)
        {
            super.beforeRender(gl, renderAtomic, scene, camera);

            renderAtomic.uniforms.u_color = this.color;
        }
    }

    /**
     * 原始游戏对象，可以通过GameObject.createPrimitive进行创建。
     */
    export interface PrimitiveGameObject
    {
        Rect: GameObject;
    }
}