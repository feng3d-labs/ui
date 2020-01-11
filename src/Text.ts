namespace feng3d
{
    /**
     * 文本组件
     */
    export class Text extends Component
    {
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
        private _image = new Texture2D();

        @oav()
        @serialize
        style = new TextStyle();

        beforeRender(gl: GL, renderAtomic: RenderAtomic, scene: Scene, camera: Camera)
        {
            super.beforeRender(gl, renderAtomic, scene, camera);

            var canvas = drawText(null, this.text, this.style);
            this._image["_pixels"] = canvas;
            this._image.invalidate();

            if (this.isAutoSize)
            {
                this.width = canvas.width;
                this.height = canvas.height;
            }

            this.transform.sx = this.width;
            this.transform.sy = this.height;

            renderAtomic.uniforms.s_texture = this._image;
        }
    }
}