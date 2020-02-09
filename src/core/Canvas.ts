namespace feng2d
{
    /**
     * Element that can be used for screen rendering.
     * 
     * 能够被用于屏幕渲染的元素
     */
    export class Canvas extends feng3d.Behaviour
    {
        /**
         * Is the Canvas in World or Overlay mode?
         * 
         * 画布是在世界或覆盖模式?
         */
        renderMode = UIRenderMode.ScreenSpaceOverlay;

        @feng3d.oav({ editable: false })
        width = 1;

        @feng3d.oav({ editable: false })
        height = 1;

        init()
        {
            // this.transform.hideFlags = this.transform.hideFlags | HideFlags.Hide;
            // this.gameObject.hideFlags = this.gameObject.hideFlags | HideFlags.DontTransform;
        }

        /**
         * 更新布局     
         * 
         * @param width 画布宽度
         * @param height 画布高度
         */
        layout(width: number, height: number)
        {
            this.width = width;
            this.height = height;

            this.transform.x = 0;
            this.transform.y = 0;
            this.transform.z = 0;

            this.transform.rx = 0;
            this.transform.ry = 0;
            this.transform.rz = 0;

            this.transform.sx = 1;
            this.transform.sy = 1;
            this.transform.sz = 1;

            this.projection.identity().appendScale(2 / width, -2 / height, 1).appendTranslation(-1, 1, 0);
        }

        /**
         * 投影矩阵
         * 
         * 渲染前自动更新
         */
        projection = new feng3d.Matrix4x4();
    }
}

namespace feng3d
{
    // 注册游戏原始对象
    GameObject.registerPrimitive("Canvas", (g) =>
    {
        g.addComponent(feng2d.Canvas)
    });

    /**
     * 原始游戏对象，可以通过GameObject.createPrimitive进行创建。
     */
    export interface PrimitiveGameObject
    {
        Canvas: GameObject;
    }
}