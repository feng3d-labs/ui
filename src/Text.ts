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
        width = 256;

        @oav()
        height = 256;

        @oav()
        text = "Hello 🌷 world";

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

        @oav()
        @serialize
        style = new TextStyle();

        // @oav({ exclude: true })
        material = Material.getDefault("Default-Image");

        beforeRender(gl: GL, renderAtomic: RenderAtomic, scene: Scene, camera: Camera)
        {
            super.beforeRender(gl, renderAtomic, scene, camera);

            this.image["_pixels"] = drawText(this.text, this.width, this.height, this.style);
            this.image.invalidate();

            renderAtomic.uniforms.s_texture = this.image;
            renderAtomic.uniforms.u_color = this.color;
        }
    }
}