namespace feng3d
{
    export interface GameObjectEventMap
    {
        /**
         * 尺寸变化事件
         */
        sizeChanged: feng2d.Transform2D;

        /**
         * 中心点变化事件
         */
        pivotChanged: feng2d.Transform2D;
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
            feng3d.watcher.watch(this.anchorMin, "x", this._invalidateLayout, this);
            feng3d.watcher.watch(this.anchorMin, "y", this._invalidateLayout, this);
            feng3d.watcher.watch(this.anchorMax, "x", this._invalidateLayout, this);
            feng3d.watcher.watch(this.anchorMax, "y", this._invalidateLayout, this);
            feng3d.watcher.watch(this._layout, "x", this._invalidateLayout, this);
            feng3d.watcher.watch(this._layout, "y", this._invalidateLayout, this);
            feng3d.watcher.watch(this._layout, "z", this._invalidateLayout, this);
            feng3d.watcher.watch(this._layout, "w", this._invalidateLayout, this);
            //
            feng3d.watcher.watch(this._size, "x", this._invalidateSize, this);
            feng3d.watcher.watch(this._size, "y", this._invalidateSize, this);
            feng3d.watcher.watch(this.pivot, "x", this._invalidatePivot, this);
            feng3d.watcher.watch(this.pivot, "y", this._invalidatePivot, this);
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
            event.data.parent.on("pivotChanged", this._invalidateLayout, this);
            this._invalidateLayout();
        }

        private _onRemoved(event: feng3d.Event<{ parent: feng3d.GameObject; }>)
        {
            event.data.parent.off("sizeChanged", this._invalidateLayout, this);
            event.data.parent.off("pivotChanged", this._invalidateLayout, this);
        }

        /**
         * 位移
         */
        @feng3d.oav({ tooltip: "当anchorMin.x == anchorMax.x时对position.x赋值生效，当 anchorMin.y == anchorMax.y 时对position.y赋值生效，否则赋值无效，自动被覆盖。", componentParam: { step: 1, stepScale: 1, stepDownup: 1 } })
        @feng3d.serialize
        get position()
        {
            this._updateLayout();
            return this._position;
        }
        set position(v) { this._position.copy(v); }
        private readonly _position = new feng3d.Vector2();

        /**
         * 尺寸，宽高。
         */
        @feng3d.oav({ tooltip: "宽度，不会影响到缩放值。当 anchorMin.x == anchorMax.x 时对 size.x 赋值生效，当anchorMin.y == anchorMax.y时对 size.y 赋值生效，否则赋值无效，自动被覆盖。", componentParam: { step: 1, stepScale: 1, stepDownup: 1 } })
        @feng3d.serialize
        get size()
        {
            this._updateLayout();
            return this._size;
        }
        set size(v) { this._size.copy(v); }
        private _size = new feng3d.Vector2(1, 1);

        /**
         * 与最小最大锚点形成的边框的left、right、top、bottom距离。当 anchorMin.x != anchorMax.x 时对 layout.x layout.y 赋值生效，当 anchorMin.y != anchorMax.y 时对 layout.z layout.w 赋值生效，否则赋值无效，自动被覆盖。
         */
        @feng3d.oav({ tooltip: "与最小最大锚点形成的边框的left、right、top、bottom距离。当 anchorMin.x != anchorMax.x 时对 layout.x layout.y 赋值生效，当 anchorMin.y != anchorMax.y 时对 layout.z layout.w 赋值生效，否则赋值无效，自动被覆盖。", componentParam: { step: 1, stepScale: 1, stepDownup: 1 } })
        @feng3d.serialize
        get layout()
        {
            this._updateLayout();
            return this._layout;
        }
        set layout(v)
        {
            if (!v) return;
            this._layout.x = v.x;
            this._layout.y = v.y;
            this._layout.z = v.z;
            this._layout.w = v.w;
        }
        private _layout = new feng3d.Vector4();

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

            // 中心点基于anchorMin的坐标
            var position = this._position;
            // 尺寸
            var size = this._size;
            var layout = this._layout;

            // 最小锚点
            var anchorMin = this.anchorMin.clone();
            // 最大锚点
            var anchorMax = this.anchorMax.clone();
            var pivot = this.pivot.clone();

            // 父对象显示区域宽高
            var parentSize = parentTransform2D.size;
            var parentPivot = parentTransform2D.pivot;
            // 锚点在父Transform2D中锚定的 leftRightTopBottom 位置。
            var anchorLayout = {
                left: anchorMin.x * parentSize.x - parentTransform2D.pivot.x * parentSize.x,
                top: anchorMin.y * parentSize.y - parentTransform2D.pivot.y * parentSize.y,
                right: anchorMax.x * parentSize.x - parentTransform2D.pivot.x * parentSize.x,
                bottom: anchorMax.y * parentSize.y - parentTransform2D.pivot.y * parentSize.y,
            }

            // 使用 x 与 width 计算
            if (anchorMin.x == anchorMax.x)
            {
                // 根据 x 与 width 计算 left 与 right
                layout.x = (-pivot.x * size.x + position.x) - anchorLayout.left;
                layout.y = anchorLayout.right - (size.x - pivot.x * size.x + position.x);
            } else // 使用 left 与 right 计算
            {
                // 计算 x 与 width
                size.x = (anchorLayout.right - layout.y) - (anchorLayout.left + layout.x);
                //
                position.x = layout.x + pivot.x * size.x;
            }

            // 使用 y 与 height 计算
            if (anchorMin.y == anchorMax.y)
            {
                // 计算相对锚点的 ILayout
                layout.z = (-pivot.y * size.y + position.y) - anchorLayout.top;
                layout.w = anchorLayout.bottom - (size.y - pivot.y * size.y + position.y);
            } else // 使用 top 与 bottom 计算
            {
                size.y = (anchorLayout.bottom - layout.w) - (anchorLayout.top + layout.z);
                // 计算 x 与 width
                position.y = layout.z + pivot.y * size.y;
            }
            //
            this.transform.position.x = anchorLayout.left + position.x;
            this.transform.position.y = anchorLayout.top + position.y;
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

        private _invalidatePivot()
        {
            this._invalidateLayout();
            this.dispatch("pivotChanged", this);
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