namespace feng2d
{
    export class UIUniforms
    {
        __class__: "feng2d.ImageUniforms";

        /**
         * UI几何体尺寸，在shader中进行对几何体缩放。
         */
        u_size = new Vector2(1, 1);

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

        /**
         * 遮罩，控制显示区域。
         */
        u_mask = new Vector4(0, 0, 4096, 4096);
    }

    shaderConfig.shaders["ui"] = {
        vertex: `
    attribute vec2 a_position;
    attribute vec2 a_uv;
    
    uniform vec4 u_uvRect;
    uniform vec2 u_size;
    uniform mat4 u_modelMatrix;
    uniform mat4 u_viewProjection;
    
    varying vec2 v_uv;
    varying vec2 v_globalPosition;

    void main() 
    {
        vec2 position = a_position * u_size;
        vec4 globalPosition = u_modelMatrix * vec4(position, 0.0, 1.0);
        gl_Position = u_viewProjection * globalPosition;
        v_uv = u_uvRect.xy + a_uv * u_uvRect.zw;
        v_globalPosition = globalPosition.xy;
    }
    `,
        fragment: `
    precision mediump float;

    uniform sampler2D s_texture;
    varying vec2 v_uv;
    varying vec2 v_globalPosition;
    
    uniform vec4 u_color;
    uniform vec4 u_mask;
    
    void main() 
    {
        if(v_globalPosition.x < u_mask.x || v_globalPosition.x > u_mask.x + u_mask.z || v_globalPosition.y < u_mask.y || v_globalPosition.y > u_mask.y + u_mask.w)
            discard;

        vec4 color = texture2D(s_texture, v_uv);
        gl_FragColor = color * u_color;
    }
    
    `,
        cls: UIUniforms,
        renderParams: { enableBlend: true, depthMask: false },
    };

    Material.setDefault("Default-UIMaterial", { shaderName: "ui" });
}

namespace feng3d
{
    export interface UniformsTypes { ui: feng2d.UIUniforms }

    export interface Uniforms extends feng2d.UIUniforms
    {
    }

    export interface DefaultMaterial
    {
        "Default-UIMaterial": Material;
    }
}