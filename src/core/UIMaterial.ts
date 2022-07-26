import { Material, Texture2D } from '@feng3d/core';
import { Color4, Vector4 } from '@feng3d/math';
import { oav } from '@feng3d/objectview';
import { shaderConfig } from '@feng3d/renderer';
import { serialize } from '@feng3d/serialization';

declare global
{
    export interface MixinsUniformsTypes
    {
        ui: UIUniforms
    }

    export interface MixinsUniforms extends UIUniforms
    {
    }

    export interface MixinsDefaultMaterial
    {
        'Default-UIMaterial': Material;
    }
}

export class UIUniforms
{
    __class__: 'UIUniforms';

    /**
     * UI几何体尺寸，在shader中进行对几何体缩放。
     */
    u_rect = new Vector4(0, 0, 100, 100);

    /**
     * 颜色
     */
    @serialize
    @oav()
    u_color = new Color4();

    /**
     * 纹理数据
     */
    @oav()
    @serialize
    s_texture = Texture2D.default;

    /**
     * 控制图片的显示区域。
     */
    u_uvRect = new Vector4(0, 0, 1, 1);
}

shaderConfig.shaders['ui'] = {
    vertex: `
    attribute vec2 a_position;
    attribute vec2 a_uv;
    
    uniform vec4 u_uvRect;
    uniform vec4 u_rect;
    uniform mat4 u_modelMatrix;
    uniform mat4 u_viewProjection;
    
    varying vec2 v_uv;
    varying vec2 v_position;

    void main() 
    {
        vec2 position = u_rect.xy + a_position * u_rect.zw;
        gl_Position = u_viewProjection * u_modelMatrix * vec4(position, 0.0, 1.0);
        v_uv = u_uvRect.xy + a_uv * u_uvRect.zw;
        v_position = position.xy;
    }
    `,
    fragment: `
    precision mediump float;

    uniform sampler2D s_texture;
    varying vec2 v_uv;
    varying vec2 v_position;
    
    uniform vec4 u_color;
    
    void main() 
    {
        vec4 color = texture2D(s_texture, v_uv);
        gl_FragColor = color * u_color;
    }
    
    `,
    cls: UIUniforms,
    renderParams: { enableBlend: true, depthtest: false },
};

Material.setDefault('Default-UIMaterial', { shaderName: 'ui' });
