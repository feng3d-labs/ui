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
     * Position, size, anchor and pivot information for a rectangle.
     *
     * 矩形的位置、大小、锚点和枢轴信息。
     */
    var Transform2D = /** @class */ (function (_super) {
        __extends(Transform2D, _super);
        function Transform2D() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 旋转
             */
            _this.rotation = 0;
            _this._position = new feng3d.Vector2();
            _this._scale = new feng3d.Vector2(1, 1);
            return _this;
            // /**
            //  * 本地变换矩阵
            //  */
            // get matrix()
            // {
            //     return this._updateMatrix();
            // }
            // set matrix(v)
            // {
            //     v.decompose(this._position, this._rotation, this._scale);
            //     this._matrix.copyRawDataFrom(v.rawData);
            //     this._matrixInvalid = false;
            // }
        }
        Object.defineProperty(Transform2D.prototype, "x", {
            /**
             * X轴坐标。
             */
            get: function () { return this._position.x; },
            set: function (v) { this._position.x = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "y", {
            /**
             * Y轴坐标。
             */
            get: function () { return this._position.y; },
            set: function (v) { this._position.y = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "sx", {
            /**
             * X轴缩放。
             */
            get: function () { return this._scale.x; },
            set: function (v) { this._scale.x = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "sy", {
            /**
             * Y轴缩放。
             */
            get: function () { return this._scale.y; },
            set: function (v) { this._scale.y = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "position", {
            /**
             * 本地位移
             */
            get: function () { return this._position; },
            set: function (v) { this._position.copy(v); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "scale", {
            /**
             * 本地缩放
             */
            get: function () { return this._scale; },
            set: function (v) { this._scale.copy(v); },
            enumerable: true,
            configurable: true
        });
        __decorate([
            feng3d.serialize
        ], Transform2D.prototype, "x", null);
        __decorate([
            feng3d.serialize
        ], Transform2D.prototype, "y", null);
        __decorate([
            feng3d.serialize
        ], Transform2D.prototype, "sx", null);
        __decorate([
            feng3d.serialize
        ], Transform2D.prototype, "sy", null);
        __decorate([
            feng3d.oav({ tooltip: "本地位移" })
        ], Transform2D.prototype, "position", null);
        __decorate([
            feng3d.oav({ tooltip: "本地缩放" })
        ], Transform2D.prototype, "scale", null);
        return Transform2D;
    }(feng3d.Component));
    feng3d.Transform2D = Transform2D;
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
    var UIImage = /** @class */ (function (_super) {
        __extends(UIImage, _super);
        function UIImage() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * Tinting color for this Image.
             *
             * 为该图像着色。
             */
            _this.color = new feng3d.Color4();
            return _this;
        }
        return UIImage;
    }(feng3d.Behaviour));
    feng3d.UIImage = UIImage;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=feng2d.js.map