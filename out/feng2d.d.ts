declare namespace feng3d {
    /**
     * UIRenderMode for the Canvas.
     *
     * Canvas的渲染模式
     */
    enum UIRenderMode {
        /**
         * Render at the end of the Scene using a 2D Canvas.
         *
         * 在场景的最后使用2D画布渲染。
         */
        ScreenSpaceOverlay = 0,
        /**
         * Render using the Camera configured on the Canvas.
         *
         * 使用在画布上配置的摄像机进行渲染。
         */
        ScreenSpaceCamera = 1,
        /**
         * Render using any Camera in the Scene that can render the layer.
         *
         * 使用场景中任何可以渲染图层的相机渲染。
         */
        WorldSpace = 2
    }
}
declare namespace feng3d {
    /**
     * Position, size, anchor and pivot information for a rectangle.
     *
     * 矩形的位置、大小、锚点和枢轴信息。
     */
    class Transform2D extends Component {
        /**
         * X轴坐标。
         */
        get x(): number;
        set x(v: number);
        /**
         * Y轴坐标。
         */
        get y(): number;
        set y(v: number);
        /**
         * 旋转
         */
        rotation: number;
        /**
         * X轴缩放。
         */
        get sx(): number;
        set sx(v: number);
        /**
         * Y轴缩放。
         */
        get sy(): number;
        set sy(v: number);
        /**
         * 表示显示对象的宽度，以像素为单位。宽度是根据显示对象内容的范围来计算的。
         */
        width: number;
        /**
         * 表示显示对象的高度，以像素为单位。高度是根据显示对象内容的范围来计算的。
         */
        height: number;
        /**
         * 本地位移
         */
        get position(): Vector2;
        set position(v: Vector2);
        private readonly _position;
        /**
         * 本地缩放
         */
        get scale(): Vector2;
        set scale(v: Vector2);
        private readonly _scale;
    }
}
declare namespace feng3d {
    /**
     * Element that can be used for screen rendering.
     *
     * 能够被用于屏幕渲染的元素
     */
    class Canvas extends Behaviour {
        /**
         * Is the Canvas in World or Overlay mode?
         *
         * 画布是在世界或覆盖模式?
         */
        renderMode: UIRenderMode;
    }
}
declare namespace feng3d {
    /**
     * 图片组件
     */
    class UIImage extends Behaviour {
        /**
         * The source texture of the Image element.
         *
         * 图像元素的源纹理。
         */
        image: Texture2D;
        /**
         * Tinting color for this Image.
         *
         * 为该图像着色。
         */
        color: Color4;
    }
}
//# sourceMappingURL=feng2d.d.ts.map