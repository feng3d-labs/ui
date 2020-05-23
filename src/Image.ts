namespace feng2d
{
    /**
     * 图片组件
     * 
     * 用于显示图片
     */
    @feng3d.AddComponentMenu("UI/Image")
    export class Image extends feng3d.Component
    {
        /**
         * The source texture of the Image element.
         * 
         * 图像元素的源纹理。
         */
        @feng3d.oav()
        @feng3d.serialize
        image = feng3d.Texture2D.default;

        /**
         * Tinting color for this Image.
         * 
         * 为该图像着色。
         */
        @feng3d.oav()
        @feng3d.serialize
        color = new feng3d.Color4();

        /**
         * 使图片显示实际尺寸
         */
        @feng3d.oav({ tooltip: "使图片显示实际尺寸", componentParam: { label: "ReSize" } })
        setNativeSize()
        {
            var imagesize = this.image.getSize();
            this.transform2D.width = imagesize.x;
            this.transform2D.height = imagesize.y;
        }

        beforeRender(renderAtomic: feng3d.RenderAtomic, scene: feng3d.Scene, camera: feng3d.Camera)
        {
            super.beforeRender(renderAtomic, scene, camera);

            renderAtomic.uniforms.s_texture = this.image;
            renderAtomic.uniforms.u_color = this.color;
        }
    }
}

namespace feng3d
{
    GameObject.registerPrimitive("Image", (g) =>
    {
        var transform2D = g.addComponent(feng2d.Transform2D);
        g.addComponent(feng2d.CanvasRenderer);

        transform2D.width = 100;
        transform2D.height = 100;
        g.addComponent(feng2d.Image)
    });

    export interface PrimitiveGameObject
    {
        Image: GameObject;
    }
}