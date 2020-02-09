namespace feng2d
{
    /**
     * 文本组件
     * 
     * 用于显示文字。
     */
    export class Text extends feng3d.Component
    {
        /**
         * 文本内容。
         */
        @feng3d.oav()
        @feng3d.serialize
        @feng3d.watch("invalidate")
        text = "Hello 🌷 world\nHello 🌷 world";

        /**
         * 是否根据文本自动调整宽高。
         */
        @feng3d.oav({ tooltip: "是否根据文本自动调整宽高。" })
        @feng3d.serialize
        autoSize = true;

        @feng3d.oav()
        @feng3d.serialize
        @feng3d.watch("_styleChanged")
        style = new TextStyle();

        /**
         * 显示图片的区域，(0, 0, 1, 1)表示完整显示图片。
         */
        private _uvRect = new feng3d.Vector4(0, 0, 1, 1);

        /**
         * 遮罩，控制显示区域。
         */
        private _mask = new feng3d.Vector4(0, 0, 4096, 4096);

        private _image = new feng3d.Texture2D();
        private _canvas: HTMLCanvasElement;
        private _invalid = true;

        beforeRender(gl: feng3d.GL, renderAtomic: feng3d.RenderAtomic, scene: feng3d.Scene, camera: feng3d.Camera)
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

            if (this.autoSize)
            {
                this.transform2D.width = canvas.width;
                this.transform2D.height = canvas.height;
            }

            // 调整缩放使得更改尺寸时文字不被缩放。
            this._uvRect.z = this.transform2D.width / canvas.width;
            this._uvRect.w = this.transform2D.height / canvas.height;

            // 只显示有文字的区域
            this._mask.z = canvas.width;
            this._mask.w = canvas.height;

            //
            renderAtomic.uniforms.s_texture = this._image;
            renderAtomic.uniforms.u_uvRect = this._uvRect;
            renderAtomic.uniforms.u_mask = this._mask;
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