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
// namespace feng3d
// {
//     export interface GameObjectEventMap
//     {
//         /**
//          * 变换矩阵变化
//          */
//         "Transform2D.Changed"
//         /**
//          * 
//          */
//         "Transform2D.updateLocalToWorldMatrix"
//         /**
//          * 场景矩阵变化
//          */
//         "Transform2D.scenetransformChanged": Transform2D;
//     }
//     /**
//      * Position, size, anchor and pivot information for a rectangle.
//      * 
//      * 矩形的位置、大小、锚点和枢轴信息。
//      */
//     export class Transform2D extends Component
//     {
//         /**
//          * X轴坐标。
//          */
//         @serialize
//         get x() { return this._position.x; }
//         set x(v) { this._position.x = v; }
//         /**
//          * Y轴坐标。
//          */
//         @serialize
//         get y() { return this._position.y; }
//         set y(v) { this._position.y = v; }
//         /**
//          * 旋转
//          */
//         rotation = 0;
//         /**
//          * X轴缩放。
//          */
//         @serialize
//         get sx() { return this._scale.x; }
//         set sx(v) { this._scale.x = v; }
//         /**
//          * Y轴缩放。
//          */
//         @serialize
//         get sy() { return this._scale.y; }
//         set sy(v) { this._scale.y = v; }
//         /**
//          * 表示显示对象的宽度，以像素为单位。宽度是根据显示对象内容的范围来计算的。
//          */
//         width: number;
//         /**
//          * 表示显示对象的高度，以像素为单位。高度是根据显示对象内容的范围来计算的。
//          */
//         height: number;
//         /**
//          * 本地位移
//          */
//         @oav({ tooltip: "本地位移" })
//         get position() { return this._position; }
//         set position(v) { this._position.copy(v); }
//         private readonly _position = new Vector2();
//         /**
//          * 本地缩放
//          */
//         @oav({ tooltip: "本地缩放" })
//         get scale() { return this._scale; }
//         set scale(v) { this._scale.copy(v); }
//         private readonly _scale = new Vector2(1, 1);
//         // /**
//         //  * 本地变换矩阵
//         //  */
//         // get matrix()
//         // {
//         //     return this._updateMatrix();
//         // }
//         // set matrix(v)
//         // {
//         //     v.decompose(this._position, this._rotation, this._scale);
//         //     this._matrix.copyRawDataFrom(v.rawData);
//         //     this._matrixInvalid = false;
//         // }
//         constructor()
//         {
//             super();
//             watcher.watch(this._position, "x", this._positionChanged, this);
//             watcher.watch(this._position, "y", this._positionChanged, this);
//             watcher.watch(this, "rotation", this._rotationChanged, this);
//             watcher.watch(this._scale, "x", this._scaleChanged, this);
//             watcher.watch(this._scale, "y", this._scaleChanged, this);
//         }
//         protected readonly _matrix = new Matrix3x3();
//         protected _matrixInvalid = false;
//         protected readonly _rotationMatrix = new Matrix3x3();
//         protected _rotationMatrixInvalid = false;
//         protected readonly _localToWorldMatrix = new Matrix3x3();
//         protected _localToWorldMatrixInvalid = false;
//         protected readonly _ITlocalToWorldMatrix = new Matrix3x3();
//         protected _ITlocalToWorldMatrixInvalid = false;
//         protected readonly _worldToLocalMatrix = new Matrix3x3();
//         protected _worldToLocalMatrixInvalid = false;
//         protected readonly _localToWorldRotationMatrix = new Matrix3x3();
//         protected _localToWorldRotationMatrixInvalid = false;
//         private _renderAtomic = new RenderAtomic();
//         private _positionChanged(object: Vector2, property: string, oldvalue: number)
//         {
//             if (!Math.equals(object[property], oldvalue))
//                 this._invalidateTransform();
//         }
//         private _rotationChanged(object: Transform2D, property: string, oldvalue: number)
//         {
//             if (!Math.equals(object[property], oldvalue))
//             {
//                 this._invalidateTransform();
//                 this._rotationMatrixInvalid = true;
//             }
//         }
//         private _scaleChanged(object: Vector2, property: string, oldvalue: number)
//         {
//             if (!Math.equals(object[property], oldvalue))
//                 this._invalidateTransform();
//         }
//         private _invalidateTransform()
//         {
//             if (!this._matrixInvalid)
//                 this._matrixInvalid = true;
//             this.dispatch("Transform2D.Changed", this);
//             this._invalidateSceneTransform();
//         }
//         private _invalidateSceneTransform()
//         {
//             if (this._localToWorldMatrixInvalid) return;
//             this._localToWorldMatrixInvalid = true;
//             this._worldToLocalMatrixInvalid = true;
//             this._ITlocalToWorldMatrixInvalid = true;
//             this._localToWorldRotationMatrixInvalid = true;
//             this.dispatch("Transform2D.scenetransformChanged", this);
//             //
//             if (this.gameObject)
//             {
//                 for (var i = 0, n = this.gameObject.numChildren; i < n; i++)
//                 {
//                     this.gameObject.getChildAt(i).transform._invalidateSceneTransform();
//                 }
//             }
//         }
//         private _updateMatrix()
//         {
//             if (this._matrixInvalid)
//             {
//                 this._matrix.recompose(this._position, this._rotation, this._scale);
//                 this._matrixInvalid = false;
//             }
//             return this._matrix;
//         }
//         private _updateLocalToWorldMatrix()
//         {
//             if (this._localToWorldMatrixInvalid)
//             {
//                 this._localToWorldMatrix.copyFrom(this.matrix);
//                 if (this.parent)
//                     this._localToWorldMatrix.append(this.parent.localToWorldMatrix);
//                 this._localToWorldMatrixInvalid = false;
//                 this.dispatch("updateLocalToWorldMatrix");
//                 console.assert(!isNaN(this._localToWorldMatrix.rawData[0]));
//             }
//             return this._localToWorldMatrix;
//         }
//         private _updateWorldToLocalMatrix()
//         {
//             if (this._worldToLocalMatrixInvalid)
//             {
//                 this._worldToLocalMatrix.copyFrom(this.localToWorldMatrix).invert();
//                 this._worldToLocalMatrixInvalid = false;
//             }
//             return this._worldToLocalMatrix;
//         }
//         private _updateITlocalToWorldMatrix()
//         {
//             if (this._ITlocalToWorldMatrixInvalid)
//             {
//                 this._ITlocalToWorldMatrix.copyFrom(this.localToWorldMatrix)
//                 this._ITlocalToWorldMatrix.invert().transpose();
//                 this._ITlocalToWorldMatrixInvalid = false;
//             }
//             return this._ITlocalToWorldMatrix;
//         }
//         private _upDateLocalToWorldRotationMatrix()
//         {
//             if (this._localToWorldRotationMatrixInvalid)
//             {
//                 this._localToWorldRotationMatrix.copyFrom(this.rotationMatrix);
//                 if (this.parent)
//                     this._localToWorldRotationMatrix.append(this.parent.localToWorldRotationMatrix);
//                 this._localToWorldRotationMatrixInvalid = false;
//             }
//             return this._localToWorldRotationMatrix;
//         }
//     }
// }
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