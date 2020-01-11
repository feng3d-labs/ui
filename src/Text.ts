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
        @watch("invalidate")
        text = "Hello 🌷 world\nHello 🌷 world";

        @oav()
        @serialize
        isAutoSize = false;

        @oav()
        @serialize
        @watch("_styleChanged")
        style = new TextStyle();

        private _image = new Texture2D();
        private _canvas: HTMLCanvasElement;
        private _invalid = true;

        beforeRender(gl: GL, renderAtomic: RenderAtomic, scene: Scene, camera: Camera)
        {
            super.beforeRender(gl, renderAtomic, scene, camera);

            var canvas = this._canvas;

            if (!this._canvas || this._invalid)
            {
                canvas = this._canvas = drawText(this._canvas, this.text, this.style);
                this._image["_pixels"] = canvas;
                this._image.invalidate();
                this._invalid = false;
            }

            if (this.isAutoSize)
            {
                this.width = canvas.width;
                this.height = canvas.height;
            }

            this.transform.sx = this.width;
            this.transform.sy = this.height;

            renderAtomic.uniforms.s_texture = this._image;
        }

        invalidate()
        {
            this._invalid = true;
        }

        private _styleChanged(property: string, oldValue: TextStyle, newValue: TextStyle)
        {
            if (oldValue) oldValue.off("changed", this.invalidate, this);
            if (newValue) newValue.on("changed", this.invalidate, this);
        }
    }
}