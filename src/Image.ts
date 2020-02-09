namespace feng2d
{
    /**
     * 图片组件
     * 
     * 用于显示图片
     */
    export class Image extends Component
    {
        /**
         * The source texture of the Image element.
         * 
         * 图像元素的源纹理。
         */
        @oav()
        @serialize
        image = Texture2D.default;

        /**
         * Tinting color for this Image.
         * 
         * 为该图像着色。
         */
        @oav()
        @serialize
        color = new Color4();

        /**
         * 是否根据图片实际尺寸自动调整宽高。
         */
        @oav({ tooltip: "是否根据图片实际尺寸自动调整宽高。" })
        @serialize
        autoSize = true;

        beforeRender(gl: GL, renderAtomic: RenderAtomic, scene: Scene, camera: Camera)
        {
            super.beforeRender(gl, renderAtomic, scene, camera);

            renderAtomic.uniforms.s_texture = this.image;
            renderAtomic.uniforms.u_color = this.color;

            if (this.autoSize)
            {
                var imagesize = this.image.getSize();
                this.transform2D.width = imagesize.x;
                this.transform2D.height = imagesize.y;
            }
        }
    }
}