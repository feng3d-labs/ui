namespace feng3d
{
    /**
     * 图片组件
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

        beforeRender(gl: GL, renderAtomic: RenderAtomic, scene: Scene, camera: Camera)
        {
            super.beforeRender(gl, renderAtomic, scene, camera);

            renderAtomic.uniforms.s_texture = this.image;
            renderAtomic.uniforms.u_color = this.color;
        }

        /**
         * 重置图片尺寸。
         */
        @oav({ tooltip: "重置图片尺寸。" })
        resetSize()
        {
            var imagesize = this.image.getSize();
            this.transform2D.width = imagesize.x;
            this.transform2D.height = imagesize.y;
        }
    }
}