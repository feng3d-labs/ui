import { AddComponentMenu, Camera, Component, createNodeMenu, GameObject, RegisterComponent, Scene, Texture2D } from '@feng3d/core';
import { Color4 } from '@feng3d/math';
import { oav } from '@feng3d/objectview';
import { RenderAtomic } from '@feng3d/renderer';
import { serialize } from '@feng3d/serialization';
import { CanvasRenderer } from './core/CanvasRenderer';
import { Transform2D } from './core/Transform2D';

declare global
{
    export interface MixinsComponentMap
    {
        Image: Image
    }

    export interface MixinsPrimitiveGameObject
    {
        Image: GameObject;
    }
}

/**
 * 图片组件
 *
 * 用于显示图片
 */
@AddComponentMenu('UI/Image')
@RegisterComponent()
export class Image extends Component
{
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

    /**
     * 使图片显示实际尺寸
     */
    @oav({ tooltip: '使图片显示实际尺寸', componentParam: { label: 'ReSize' } })
    setNativeSize()
    {
        const imagesize = this.image.getSize();
        this.transform2D.size.x = imagesize.x;
        this.transform2D.size.y = imagesize.y;
    }

    beforeRender(renderAtomic: RenderAtomic, scene: Scene, camera: Camera)
    {
        super.beforeRender(renderAtomic, scene, camera);

        renderAtomic.uniforms.s_texture = this.image;
        renderAtomic.uniforms.u_color = this.color;
    }
}

GameObject.registerPrimitive('Image', (g) =>
{
    const transform2D = g.addComponent(Transform2D);
    g.addComponent(CanvasRenderer);

    transform2D.size.x = 100;
    transform2D.size.y = 100;
    g.addComponent(Image);
});

// 在 Hierarchy 界面新增右键菜单项
createNodeMenu.push(
    {
        path: 'UI/Image',
        priority: -2,
        click: () =>
            GameObject.createPrimitive('Image')
    }
);

