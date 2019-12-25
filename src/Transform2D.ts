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