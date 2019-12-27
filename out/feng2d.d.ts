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
    class Image extends Model {
        geometry: QuadGeometry;
        castShadows: boolean;
        receiveShadows: boolean;
        width: number;
        height: number;
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
        material: Material;
        beforeRender(gl: GL, renderAtomic: RenderAtomic, scene: Scene, camera: Camera): void;
    }
}
declare namespace feng3d {
    interface UniformsTypes {
        image: ImageUniforms;
    }
    class ImageUniforms {
        __class__: "feng3d.ImageUniforms";
        /**
         * 颜色
         */
        u_color: Color4;
        /**
         * 纹理数据
         */
        s_texture: Texture2D;
    }
    interface Uniforms extends ImageUniforms {
    }
    interface DefaultMaterial {
        "Default-Image": Material;
    }
}
declare namespace feng3d {
    interface PrimitiveGameObject {
        Image: GameObject;
    }
}
//# sourceMappingURL=feng2d.d.ts.map