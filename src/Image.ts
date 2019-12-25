namespace feng3d
{
    /**
     * 图片组件
     */
    export class Image extends Model
    {
        @oav({ exclude: true })
        geometry = Geometry.getDefault("Terrain-Geometry");

        @oav({ exclude: true })
        material = Material.getDefault("Terrain-Material");

        /**
         * The source texture of the Image element.
         * 
         * 图像元素的源纹理。
         */
        image: Texture2D;

        /**
         * Tinting color for this Image.
         * 
         * 为该图像着色。
         */
        color = new Color4();
    }
}