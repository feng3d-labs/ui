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
        width = 1;

        @oav()
        height = 1;

        @oav()
        text = "Hello 🌷 world\nHello 🌷 world";

        /**
         * The source texture of the Image element.
         * 
         * 图像元素的源纹理。
         */
        image = new Texture2D();

        /**
         * Tinting color for this Image.
         * 
         * 为该图像着色。
         */
        @oav()
        @serialize
        color = new Color4();

        // @oav({ exclude: true })
        material = Material.getDefault("Default-Image");

        @oav()
        style = new TextStyle();

        beforeRender(gl: GL, renderAtomic: RenderAtomic, scene: Scene, camera: Camera)
        {
            super.beforeRender(gl, renderAtomic, scene, camera);

            // this.image["_pixels"] = this.getImagedata();
            var canvas = drawText(null, this.text, this.style);
            this.image["_pixels"] = canvas;
            this.image.invalidate();

            this.width = canvas.width;
            this.height = canvas.height;

            this.transform.sx = this.width * 0.01;
            this.transform.sy = this.height * 0.01;

            renderAtomic.uniforms.s_texture = this.image;
            renderAtomic.uniforms.u_color = this.color;
        }
    }
}