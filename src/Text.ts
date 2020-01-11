namespace feng3d
{
    /**
     * 文本组件
     */
    export class Text extends Component
    {
        @oav({ exclude: true })
        geometry = Geometry.getDefault("Quad");

        @oav({ exclude: true })
        castShadows = false;

        @oav({ exclude: true })
        receiveShadows = false;

        @oav()
        width = 100;

        @oav()
        height = 30;

        @oav()
        @serialize
        text = "Hello 🌷 world\nHello 🌷 world";

        @oav()
        @serialize
        isAutoSize = false;

        /**
         * The source texture of the Image element.
         * 
         * 图像元素的源纹理。
         */
        @oav()
        @serialize
        image = new Texture2D();

        // @oav({ exclude: true })
        material = Material.getDefault("Default-Image");

        @oav()
        @serialize
        style = new TextStyle();

        beforeRender(gl: GL, renderAtomic: RenderAtomic, scene: Scene, camera: Camera)
        {
            super.beforeRender(gl, renderAtomic, scene, camera);

            // this.image["_pixels"] = this.getImagedata();
            var canvas = drawText(null, this.text, this.style);
            this.image["_pixels"] = canvas;
            this.image.invalidate();

            if (this.isAutoSize)
            {
                this.width = canvas.width;
                this.height = canvas.height;
            }

            this.transform.sx = this.width;
            this.transform.sy = this.height;

            renderAtomic.uniforms.s_texture = this.image;
        }
    }
}