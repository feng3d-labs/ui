namespace feng3d
{

    export interface UniformsTypes { image: ImageUniforms }
    export class ImageUniforms
    {
        __class__: "feng3d.ImageUniforms";
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
    }

    shaderConfig.shaders["image"] = {
        vertex: `
    attribute vec2 a_position;
    attribute vec2 a_uv;
    
    varying vec2 v_uv;
    uniform mat4 u_modelMatrix;
    uniform mat4 u_viewProjection;
    
    void main() 
    {
        gl_Position = u_viewProjection * u_modelMatrix * vec4(a_position, 0.0, 1.0);
        v_uv = a_uv;
    }
    `,
        fragment: `
    precision mediump float;

    uniform sampler2D s_texture;
    varying vec2 v_uv;
    
    uniform vec4 u_color;
    
    void main() {
    
        vec4 color = texture2D(s_texture, v_uv);
        gl_FragColor = color * u_color;
    }
    
    `,
        cls: ImageUniforms,
        renderParams: { cullFace: CullFace.NONE, enableBlend: true },
    };

    export interface Uniforms extends ImageUniforms
    {
    }

    export interface DefaultMaterial
    {
        "Default-Image": Material;
    }

    Material.setDefault("Default-Image", { shaderName: "image" });
}