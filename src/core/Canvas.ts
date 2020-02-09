namespace feng2d
{
    var oav = feng3d.oav;

    /**
     * Element that can be used for screen rendering.
     * 
     * 能够被用于屏幕渲染的元素
     */
    export class Canvas extends Behaviour
    {
        /**
         * Is the Canvas in World or Overlay mode?
         * 
         * 画布是在世界或覆盖模式?
         */
        renderMode = UIRenderMode.ScreenSpaceOverlay;

        @oav({ editable: false })
        width = 1;

        @oav({ editable: false })
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
        projection = new Matrix4x4();
    }
}