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

        // @oav({ exclude: true })
        material = Material.getDefault("Default-Image");

        beforeRender(gl: GL, renderAtomic: RenderAtomic, scene: Scene, camera: Camera)
        {
            super.beforeRender(gl, renderAtomic, scene, camera);

            this.image["_pixels"] = this.getImagedata();
            this.image.invalidate();

            renderAtomic.uniforms.s_texture = this.image;
            renderAtomic.uniforms.u_color = this.color;
        }

        getImagedata()
        {
            // Create <canvas> to draw a text
            var textCanvas = document.createElement('canvas');
            if (!textCanvas)
            {
                console.log('Failed to create canvas');
                return null;
            }

            // Set the size of <canvas>
            textCanvas.width = 256;
            textCanvas.height = 256;

            // Get the rendering context for 2D
            var ctx = textCanvas.getContext('2d');
            if (!ctx)
            {
                console.log('Failed to get rendering context for 2d context');
                return null;
            }

            // Clear <canvas> with a white
            ctx.fillStyle = 'rgba(0, 0, 0, 0)';
            ctx.fillRect(0, 0, textCanvas.width, textCanvas.height);

            // Set text properties
            ctx.font = '42px bold sans-serif';
            ctx.fillStyle = 'rgba(53, 60, 145, 1.0)';
            ctx.textBaseline = 'middle';

            ctx.shadowColor = 'rgba(19, 169, 184, 1.0)';
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 3;
            ctx.shadowBlur = 4;

            // Draw a text
            var text = this.text;
            var textWidth = ctx.measureText(text).width;
            ctx.fillText(text, (textCanvas.width - textWidth) / 2, textCanvas.height / 2 + 100);

            var imagedata = ctx.getImageData(0, 0, textCanvas.height, textCanvas.height);
            return imagedata;
        }

    }
}