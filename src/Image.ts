namespace feng3d
{
    /**
     * 图片组件
     */
    export class Image extends Component
    {
        @oav()
        width = 1;

        @oav()
        height = 1;

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

    }
}