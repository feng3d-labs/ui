namespace feng3d
{
    export interface GameObjectEventMap
    {
        /**
         * 尺寸变化
         */
        sizeChanged: feng2d.Transform2D;
    }

    export interface ComponentMap { Transfrom2D: feng2d.Transform2D; }
}

namespace feng2d
{
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

            feng3d.watcher.watch(this._position, "x", this._invalidateLayout, this);
            feng3d.watcher.watch(this._position, "y", this._invalidateLayout, this);
            feng3d.watcher.watch(this._size, "x", this._invalidateSize, this);
            feng3d.watcher.watch(this._size, "y", this._invalidateSize, this);
            feng3d.watcher.watch(this.anchorMin, "x", this._invalidateLayout, this);
            feng3d.watcher.watch(this.anchorMin, "y", this._invalidateLayout, this);
            feng3d.watcher.watch(this.anchorMax, "x", this._invalidateLayout, this);
            feng3d.watcher.watch(this.anchorMax, "y", this._invalidateLayout, this);
            feng3d.watcher.watch(this._layout, "left", this._invalidateLayout, this);
            feng3d.watcher.watch(this._layout, "right", this._invalidateLayout, this);
            feng3d.watcher.watch(this._layout, "top", this._invalidateLayout, this);
            feng3d.watcher.watch(this._layout, "bottom", this._invalidateLayout, this);
            //
            feng3d.watcher.watch(this, "rotation", this._rotationChanged, this);
            feng3d.watcher.watch(this._scale, "x", this._scaleChanged, this);
            feng3d.watcher.watch(this._scale, "y", this._scaleChanged, this);
            //
            this.on("added", this._onAdded, this);
            this.on("removed", this._onRemoved, this);
        }

        init()
        {
            this.on("transformChanged", this._onTransformChanged, this);
            this._onTransformChanged();
        }

        private _onAdded(event: feng3d.Event<{ parent: feng3d.GameObject; }>)
        {
            event.data.parent.on("sizeChanged", this._invalidateLayout, this);
        }

        private _onRemoved(event: feng3d.Event<{ parent: feng3d.GameObject; }>)
        {
            event.data.parent.off("sizeChanged", this._invalidateLayout, this);
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
        @feng3d.serialize
        get position()
        {
            this._updateLayout();
            return this._position;
        }
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
        get size()
        {
            this._updateLayout();
            return this._size;
        }
        set size(v) { this._size.copy(v); }
        private _size = new feng3d.Vector2(1, 1);

        /**
         * 距离最小锚点应在位置的x轴正向偏移
         */
        @feng3d.oav()
        @feng3d.oav({ componentParam: { step: 1, stepScale: 1, stepDownup: 1 } })
        get left()
        {
            return this.layout.left;
        }
        set left(v)
        {
            this.layout.left = v;
        }

        /**
         * 距离最大锚点应在位置的x轴负向偏移
         */
        @feng3d.oav({ componentParam: { step: 1, stepScale: 1, stepDownup: 1 } })
        get right()
        {
            return this.layout.right;
        }
        set right(v)
        {
            this.layout.right = v;
        }

        /**
         * 距离最小锚点应在位置的y轴正向偏移
         */
        @feng3d.oav()
        @feng3d.oav({ componentParam: { step: 1, stepScale: 1, stepDownup: 1 } })
        get top()
        {
            return this.layout.top;
        }
        set top(v)
        {
            this.layout.top = v;
        }

        /**
         * 距离最大锚点应在位置的y轴负向偏移
         */
        @feng3d.oav()
        @feng3d.oav({ componentParam: { step: 1, stepScale: 1, stepDownup: 1 } })
        get bottom()
        {
            return this.layout.bottom;
        }
        set bottom(v)
        {
            this.layout.bottom = v;
        }

        @feng3d.serialize
        get layout()
        {
            this._updateLayout();
            return this._layout;
        }
        set layout(v)
        {
            if (!v) return;
            this._layout.left = v.left;
            this._layout.right = v.right;
            this._layout.top = v.top;
            this._layout.bottom = v.bottom;
        }
        private _layout = { left: 0, right: 0, top: 0, bottom: 0 };

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

        private _updateLayout()
        {
            if (!this._layoutInvalid) return;

            var parentTransform2D = this.gameObject?.parent?.transform2D;
            if (!parentTransform2D) return;

            // 3d 坐标，中心点基于父容器左上角的坐标
            var position3 = this.transform.position;
            // 中心点基于anchorMin的坐标
            var position = this._position;
            // 尺寸
            var size = this._size;
            var leftRightTopBottom = this._layout;

            // 最小锚点
            var anchorMin = this.anchorMin;
            // 最大锚点
            var anchorMax = this.anchorMax;
            var pivot = this.pivot;

            // 父对象显示区域宽高
            var parentWidth = parentTransform2D.width, parentHeight = parentTransform2D.height;
            // 锚点在父Transform2D中锚定的 leftRightTopBottom 位置。
            var anchorLayout = {
                left: anchorMin.x * parentWidth,
                top: anchorMin.y * parentHeight,
                right: anchorMax.x * parentWidth,
                bottom: anchorMax.y * parentHeight,
            }

            // 使用 x 与 width 计算
            if (anchorMin.x == anchorMax.x)
            {
                // 根据 x 与 width 计算 left 与 right
                leftRightTopBottom.left = (-pivot.x * size.x + position.x) - anchorLayout.left;
                leftRightTopBottom.right = anchorLayout.right - (size.x - pivot.x * size.x + position.x);
            } else // 使用 left 与 right 计算
            {
                // 计算 x 与 width
                size.x = (anchorLayout.right - leftRightTopBottom.right) - (anchorLayout.left + leftRightTopBottom.left);
                //
                position.x = leftRightTopBottom.left + pivot.x * size.x;
            }

            // 使用 y 与 height 计算
            if (anchorMin.y == anchorMax.y)
            {
                // 计算相对锚点的 ILayout
                leftRightTopBottom.top = (-pivot.y * size.y + position.y) - anchorLayout.top;
                leftRightTopBottom.bottom = anchorLayout.bottom - (size.y - pivot.y * size.y + position.y);
            } else // 使用 top 与 bottom 计算
            {
                size.y = (anchorLayout.bottom - leftRightTopBottom.bottom) - (anchorLayout.top + leftRightTopBottom.top);
                // 计算 x 与 width
                position.y = leftRightTopBottom.top + pivot.y * size.y;
            }
            //
            position3.x = anchorLayout.left + position.x;
            position3.y = anchorLayout.top + position.y;
            //
            this._layoutInvalid = false;
            feng3d.ticker.offframe(this._updateLayout, this);
        }

        /**
         * 布局是否失效
         */
        private _layoutInvalid = true;

        private _invalidateLayout()
        {
            this._layoutInvalid = true;
            feng3d.ticker.onframe(this._updateLayout, this);
        }

        private _invalidateSize()
        {
            this._invalidateLayout();
            this.dispatch("sizeChanged", this);
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