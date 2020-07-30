namespace feng2d
{
    interface ILayout
    {
        left: number;
        right: number;
        top: number;
        bottom: number;
    }

    /**
     * 2D变换
     * 
     * 提供了比Transform更加适用于2D元素的API
     * 
     * 通过修改Transform的数值实现
     */
    @feng3d.AddComponentMenu("Layout/Transform2D")
    export class Transform2D extends feng3d.Component
    {
        get single() { return true; }

        /**
         * 描述了2D对象在未经过变换前的位置与尺寸
         */
        get rect()
        {
            this._rect.init(-this.pivot.x * this.size.x, -this.pivot.y * this.size.y, this.size.x, this.size.y);
            return this._rect;
        }
        private _rect = new feng3d.Vector4(0, 0, 100, 100);

		/**
		 * 创建一个实体，该类为虚类
		 */
        constructor()
        {
            super();

            feng3d.watcher.watch(this._position, "x", this._positionChanged, this);
            feng3d.watcher.watch(this._position, "y", this._positionChanged, this);
            feng3d.watcher.watch(this, "rotation", this._rotationChanged, this);
            feng3d.watcher.watch(this._scale, "x", this._scaleChanged, this);
            feng3d.watcher.watch(this._scale, "y", this._scaleChanged, this);
        }

        init()
        {
            this.on("transformChanged", this._onTransformChanged, this);
            this._onTransformChanged();
        }

        /**
         * X轴坐标。
         */
        get x() { return this._position.x; }
        set x(v) { this._position.x = v; }

        /**
         * Y轴坐标。
         */
        get y() { return this._position.y; }
        set y(v) { this._position.y = v; }

        /**
         * 位移
         */
        @feng3d.oav({ tooltip: "位移", componentParam: { step: 1, stepScale: 1, stepDownup: 1 } })
        get position() { return this._position; }
        set position(v) { this._position.copy(v); }
        private readonly _position = new feng3d.Vector2();

        /**
         * 宽度，不会影响到缩放值。
         */
        get width() { return this._size.x; }
        set width(v) { this._size.x = v; }

        /**
         * 高度，不会影响到缩放值。
         */
        get height() { return this._size.y; }
        set height(v) { this._size.y = v; }

        /**
         * 尺寸，宽高。
         */
        @feng3d.oav({ tooltip: "尺寸，不会影响到缩放值。", componentParam: { step: 1, stepScale: 1, stepDownup: 1 } })
        @feng3d.serialize
        get size() { return this._size; }
        set size(v) { this._size.copy(v); }
        private _size = new feng3d.Vector2(1, 1);

        /**
         * 距离最小锚点应在位置的x轴正向偏移
         */
        get left()
        {
            return this.leftRightTopBottom.left;
        }

        /**
         * 距离最大锚点应在位置的x轴负向偏移
         */
        get right()
        {
            return this.leftRightTopBottom.right;
        }

        /**
         * 距离最小锚点应在位置的y轴正向偏移
         */
        get top()
        {
            return this.leftRightTopBottom.top;
        }

        /**
         * 距离最大锚点应在位置的y轴负向偏移
         */
        get bottom()
        {
            return this.leftRightTopBottom.bottom;
        }

        @feng3d.oav()
        get leftRightTopBottom()
        {
            if (this._leftRightTopBottomInvalid)
            {
                // this._leftRightTopBottonInvalid = false;

                this._updateLeftRightTopBottom();
            }
            return this._leftRightTopBottom;
        }

        private _leftRightTopBottom: ILayout = <any>{};
        private _leftRightTopBottomInvalid = true;

        private _updateLeftRightTopBottom()
        {
            this._leftRightTopBottom.left = 0;
            this._leftRightTopBottom.right = 0;
            this._leftRightTopBottom.top = 0;
            this._leftRightTopBottom.bottom = 0;

            var parentTransform2D = this.gameObject.parent?.transform2D;
            if (!parentTransform2D) return;

            // 当前对象显示区域
            var rect = this.rect;
            // 自身在父对象中的Layout
            var selfLayout: ILayout = {
                left: this.x + rect.x,
                right: this.x + rect.x + rect.z,
                top: this.y + rect.y,
                bottom: this.y + rect.y + rect.w,
            };
            // 父对象显示区域
            var parentRect = parentTransform2D.rect;
            // 父对象显示区域宽高
            var parentWidth = parentRect.z, parentHeight = parentRect.w;
            // 锚点在父Transform2D中锚定的 leftRightTopBottom 位置。
            var anchorLayout: ILayout = {
                left: this.anchorMin.x * parentWidth,
                right: this.anchorMax.x * parentWidth,
                top: this.anchorMin.y * parentHeight,
                bottom: this.anchorMax.y * parentHeight,
            }
            // 计算相对锚点的 ILayout
            this._leftRightTopBottom.left = selfLayout.left - anchorLayout.left;
            this._leftRightTopBottom.right = -(selfLayout.right - anchorLayout.right);
            this._leftRightTopBottom.top = selfLayout.top - anchorLayout.top;
            this._leftRightTopBottom.bottom = -(selfLayout.bottom - anchorLayout.bottom);
        }

        /**
         * 最小锚点，父Transform2D中左上角锚定的规范化位置。
         */
        @feng3d.oav({ tooltip: "父Transform2D中左上角锚定的规范化位置。", componentParam: { step: 0.01, stepScale: 0.01, stepDownup: 0.01 } })
        @feng3d.serialize
        anchorMin = new feng3d.Vector2(0.5, 0.5);

        /**
         * 最大锚点，父Transform2D中左上角锚定的规范化位置。
         */
        @feng3d.oav({ tooltip: "最大锚点，父Transform2D中左上角锚定的规范化位置。", componentParam: { step: 0.01, stepScale: 0.01, stepDownup: 0.01 } })
        @feng3d.serialize
        anchorMax = new feng3d.Vector2(0.5, 0.5);

        /**
         * The normalized position in this RectTransform that it rotates around.
         */
        @feng3d.oav({ tooltip: "中心点" })
        @feng3d.serialize
        pivot = new feng3d.Vector2(0, 0);

        /**
         * 旋转
         */
        @feng3d.oav({ tooltip: "旋转", componentParam: { step: 0.01, stepScale: 30, stepDownup: 50 } })
        rotation = 0;

        /**
         * X轴缩放。
         */
        get sx() { return this._scale.x; }
        set sx(v) { this._scale.x = v; }

        /**
         * Y轴缩放。
         */
        get sy() { return this._scale.y; }
        set sy(v) { this._scale.y = v; }

        /**
         * 缩放
         */
        @feng3d.oav({ tooltip: "缩放", componentParam: { step: 0.01, stepScale: 1, stepDownup: 1 } })
        get scale() { return this._scale; }
        set scale(v) { this._scale.copy(v); }
        private readonly _scale = new feng3d.Vector2(1, 1);

        /**
         * 本地变换矩阵
         */
        get matrix()
        {
            this.transform.matrix.toMatrix3x3(this._matrix);
            return this._matrix;
        }

        set matrix(v)
        {
            var mat = v.toMatrix4x4();
            this.transform.matrix = mat;
        }

        beforeRender(renderAtomic: feng3d.RenderAtomic, scene: feng3d.Scene, camera: feng3d.Camera)
        {
            renderAtomic.uniforms.u_rect = this.rect;
        }

        protected readonly _matrix = new feng3d.Matrix3x3();

        private _positionChanged(object: feng3d.Vector2, property: "x" | "y", oldvalue: number)
        {
            if (!Math.equals(object[property], oldvalue))
            {
                if (property == "x")
                    this.transform.x = object.x;
                else
                    this.transform.y = object.y;
            }
        }

        private _rotationChanged(object: Transform2D, property: string, oldvalue: number)
        {
            if (!Math.equals(object[property], oldvalue))
            {
                this.transform.rz = this.rotation;
            }
        }

        private _scaleChanged(object: feng3d.Vector2, property: string, oldvalue: number)
        {
            if (!Math.equals(object[property], oldvalue))
            {
                if (property == "x")
                    this.transform.sx = object.x;
                else
                    this.transform.sy = object.y;
            }
        }

        private _onTransformChanged()
        {
            this.x = this.transform.x;
            this.y = this.transform.y;

            this.rotation = this.transform.rz;

            this.sx = this.transform.sx;
            this.sy = this.transform.sy;
        }
    }
}

namespace feng3d
{

    export interface GameObject
    {
        /**
         * 游戏对象上的2D变换。
         */
        transform2D: feng2d.Transform2D;
    }

    Object.defineProperty(GameObject.prototype, "transform2D",
        {
            get: function () { return this.getComponent(feng2d.Transform2D); },
        });

    export interface Component
    {
        /**
         * 游戏对象上的2D变换。
         */
        transform2D: feng2d.Transform2D;
    }

    Object.defineProperty(Component.prototype, "transform2D",
        {
            get: function () { return this._gameObject && this._gameObject.transform2D; },
        });
}