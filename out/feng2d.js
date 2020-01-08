var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var feng3d;
(function (feng3d) {
    /**
     * UIRenderMode for the Canvas.
     *
     * Canvas的渲染模式
     */
    var UIRenderMode;
    (function (UIRenderMode) {
        /**
         * Render at the end of the Scene using a 2D Canvas.
         *
         * 在场景的最后使用2D画布渲染。
         */
        UIRenderMode[UIRenderMode["ScreenSpaceOverlay"] = 0] = "ScreenSpaceOverlay";
        /**
         * Render using the Camera configured on the Canvas.
         *
         * 使用在画布上配置的摄像机进行渲染。
         */
        UIRenderMode[UIRenderMode["ScreenSpaceCamera"] = 1] = "ScreenSpaceCamera";
        /**
         * Render using any Camera in the Scene that can render the layer.
         *
         * 使用场景中任何可以渲染图层的相机渲染。
         */
        UIRenderMode[UIRenderMode["WorldSpace"] = 2] = "WorldSpace";
    })(UIRenderMode = feng3d.UIRenderMode || (feng3d.UIRenderMode = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * Element that can be used for screen rendering.
     *
     * 能够被用于屏幕渲染的元素
     */
    var Canvas = /** @class */ (function (_super) {
        __extends(Canvas, _super);
        function Canvas() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * Is the Canvas in World or Overlay mode?
             *
             * 画布是在世界或覆盖模式?
             */
            _this.renderMode = feng3d.UIRenderMode.ScreenSpaceOverlay;
            return _this;
        }
        return Canvas;
    }(feng3d.Behaviour));
    feng3d.Canvas = Canvas;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 图片组件
     */
    var Image = /** @class */ (function (_super) {
        __extends(Image, _super);
        function Image() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.geometry = feng3d.Geometry.getDefault("Quad");
            _this.castShadows = false;
            _this.receiveShadows = false;
            _this.width = 1;
            _this.height = 1;
            /**
             * The source texture of the Image element.
             *
             * 图像元素的源纹理。
             */
            _this.image = feng3d.Texture2D.default;
            /**
             * Tinting color for this Image.
             *
             * 为该图像着色。
             */
            _this.color = new feng3d.Color4();
            // @oav({ exclude: true })
            _this.material = feng3d.Material.getDefault("Default-Image");
            return _this;
        }
        Image.prototype.beforeRender = function (gl, renderAtomic, scene, camera) {
            _super.prototype.beforeRender.call(this, gl, renderAtomic, scene, camera);
            renderAtomic.uniforms.s_texture = this.image;
            renderAtomic.uniforms.u_color = this.color;
        };
        __decorate([
            feng3d.oav({ exclude: true })
        ], Image.prototype, "geometry", void 0);
        __decorate([
            feng3d.oav({ exclude: true })
        ], Image.prototype, "castShadows", void 0);
        __decorate([
            feng3d.oav({ exclude: true })
        ], Image.prototype, "receiveShadows", void 0);
        __decorate([
            feng3d.oav()
        ], Image.prototype, "width", void 0);
        __decorate([
            feng3d.oav()
        ], Image.prototype, "height", void 0);
        __decorate([
            feng3d.oav(),
            feng3d.serialize
        ], Image.prototype, "image", void 0);
        __decorate([
            feng3d.oav(),
            feng3d.serialize
        ], Image.prototype, "color", void 0);
        return Image;
    }(feng3d.Model));
    feng3d.Image = Image;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 文本样式
     */
    var TextStyle = /** @class */ (function () {
        function TextStyle() {
        }
        return TextStyle;
    }());
    feng3d.TextStyle = TextStyle;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    function drawText(text, width, height, style) {
        var canvas = document.createElement('canvas');
        if (!canvas) {
            console.log('Failed to create canvas');
            return null;
        }
        canvas.width = width;
        canvas.height = width;
        var ctx = canvas.getContext('2d');
        if (!ctx) {
            console.log('Failed to get rendering context for 2d context');
            return null;
        }
        // Clear <canvas> with a white
        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Set text properties
        ctx.font = '42px bold sans-serif';
        ctx.fillStyle = 'rgba(53, 60, 145, 1.0)';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(19, 169, 184, 1.0)';
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 4;
        // Draw a text
        var textWidth = ctx.measureText(text).width;
        ctx.fillText(text, (canvas.width - textWidth) / 2, canvas.height / 2 + 100);
        var imagedata = ctx.getImageData(0, 0, canvas.height, canvas.height);
        return imagedata;
    }
    feng3d.drawText = drawText;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 文本组件
     */
    var Text = /** @class */ (function (_super) {
        __extends(Text, _super);
        function Text() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.geometry = feng3d.Geometry.getDefault("Quad");
            _this.castShadows = false;
            _this.receiveShadows = false;
            _this.width = 256;
            _this.height = 256;
            _this.text = "Hello 🌷 world";
            /**
             * The source texture of the Image element.
             *
             * 图像元素的源纹理。
             */
            _this.image = new feng3d.Texture2D();
            /**
             * Tinting color for this Image.
             *
             * 为该图像着色。
             */
            _this.color = new feng3d.Color4();
            _this.style = new feng3d.TextStyle();
            // @oav({ exclude: true })
            _this.material = feng3d.Material.getDefault("Default-Image");
            return _this;
        }
        Text.prototype.beforeRender = function (gl, renderAtomic, scene, camera) {
            _super.prototype.beforeRender.call(this, gl, renderAtomic, scene, camera);
            this.image["_pixels"] = feng3d.drawText(this.text, this.width, this.height, this.style);
            this.image.invalidate();
            renderAtomic.uniforms.s_texture = this.image;
            renderAtomic.uniforms.u_color = this.color;
        };
        __decorate([
            feng3d.oav({ exclude: true })
        ], Text.prototype, "geometry", void 0);
        __decorate([
            feng3d.oav({ exclude: true })
        ], Text.prototype, "castShadows", void 0);
        __decorate([
            feng3d.oav({ exclude: true })
        ], Text.prototype, "receiveShadows", void 0);
        __decorate([
            feng3d.oav()
        ], Text.prototype, "width", void 0);
        __decorate([
            feng3d.oav()
        ], Text.prototype, "height", void 0);
        __decorate([
            feng3d.oav()
        ], Text.prototype, "text", void 0);
        __decorate([
            feng3d.oav(),
            feng3d.serialize
        ], Text.prototype, "color", void 0);
        __decorate([
            feng3d.oav(),
            feng3d.serialize
        ], Text.prototype, "style", void 0);
        return Text;
    }(feng3d.Model));
    feng3d.Text = Text;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var ImageUniforms = /** @class */ (function () {
        function ImageUniforms() {
            /**
             * 颜色
             */
            this.u_color = new feng3d.Color4();
            /**
             * 纹理数据
             */
            this.s_texture = feng3d.Texture2D.default;
        }
        __decorate([
            feng3d.serialize,
            feng3d.oav()
        ], ImageUniforms.prototype, "u_color", void 0);
        __decorate([
            feng3d.oav(),
            feng3d.serialize
        ], ImageUniforms.prototype, "s_texture", void 0);
        return ImageUniforms;
    }());
    feng3d.ImageUniforms = ImageUniforms;
    feng3d.shaderConfig.shaders["image"] = {
        vertex: "\n    attribute vec3 a_position;\n    attribute vec2 a_uv;\n    \n    varying vec2 v_uv;\n    uniform mat4 u_modelMatrix;\n    uniform mat4 u_viewProjection;\n    \n    void main() \n    {\n        gl_Position = u_viewProjection * u_modelMatrix * vec4(a_position, 1.0);\n        v_uv = a_uv;\n    }\n    ",
        fragment: "\n    precision mediump float;\n\n    uniform sampler2D s_texture;\n    varying vec2 v_uv;\n    \n    uniform vec4 u_color;\n    \n    void main() {\n    \n        vec4 color = texture2D(s_texture, v_uv);\n        gl_FragColor = color * u_color;\n    }\n    \n    ",
        cls: ImageUniforms,
        renderParams: { cullFace: feng3d.CullFace.NONE, enableBlend: true },
    };
    feng3d.Material.setDefault("Default-Image", { shaderName: "image" });
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    feng3d.functionwrap.extendFunction(feng3d.GameObject, "createPrimitive", function (g, type) {
        if (type == "Image") {
            g.addComponent(feng3d.Image);
        }
        else if (type == "Text") {
            g.addComponent(feng3d.Text);
        }
        return g;
    });
})(feng3d || (feng3d = {}));
//# sourceMappingURL=feng2d.js.map