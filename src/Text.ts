namespace feng3d
{
    /**
     * 文本组件
     */
    export class Text extends Model
    {
        @oav({ exclude: true })
        geometry = Geometry.getDefault("Quad");

        @oav({ exclude: true })
        castShadows = false;

        @oav({ exclude: true })
        receiveShadows = false;

        @oav()
        @serialize
        autoSize = true;

        @oav()
        @serialize
        width = 256;

        @oav()
        @serialize
        height = 256;

        @oav()
        text = "Hello 🌷 world\nHello 🌷 world";

        /**
         * The source texture of the Image element.
         * 
         * 图像元素的源纹理。
         */
        image = new Texture2D();

        @oav()
        @serialize
        style = new TextStyle();

        // @oav({ exclude: true })
        material = Material.getDefault("Default-Image");

        beforeRender(gl: GL, renderAtomic: RenderAtomic, scene: Scene, camera: Camera)
        {
            super.beforeRender(gl, renderAtomic, scene, camera);

            var { imagedata, width, height } = drawText(this.text, this.width, this.height, this.style, this.autoSize);

            this.image["_pixels"] = imagedata;

            this.image.invalidate();

            this.width = width;
            this.height = height;
            this.transform.sx = this.width * 0.01;
            this.transform.sy = this.height * 0.01;

            renderAtomic.uniforms.s_texture = this.image;
        }
    }
}