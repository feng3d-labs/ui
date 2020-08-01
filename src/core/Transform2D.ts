namespace feng3d
{
    // export interface GameObjectEventMap
    // {
    //     /**
    //      * 尺寸变化事件
    //      */
    //     sizeChanged: any;

    //     /**
    //      * 中心点变化事件
    //      */
    //     pivotChanged: any;
    // }

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

        get transformLayout()
        {
            if (!this._transformLayout)
                this._transformLayout = this.gameObject?.getComponent(feng3d.TransformLayout);
            return this._transformLayout;
        }
        private _transformLayout: feng3d.TransformLayout;

        /**
         * 描述了2D对象在未经过变换前的位置与尺寸
         */
        get rect()
        {
            var transformLayout = this.transformLayout;
            this._rect.init(-transformLayout.pivot.x * transformLayout.size.x, -transformLayout.pivot.y * transformLayout.size.y, transformLayout.size.x, transformLayout.size.y);
            return this._rect;
        }
        private _rect = new feng3d.Vector4(0, 0, 100, 100);

        /**
         * 位移
         */
        @feng3d.oav({ tooltip: "当anchorMin.x == anchorMax.x时对position.x赋值生效，当 anchorMin.y == anchorMax.y 时对position.y赋值生效，否则赋值无效，自动被覆盖。", componentParam: { step: 1, stepScale: 1, stepDownup: 1 } })
        @feng3d.serialize
        get position()
        {
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
            return this._layout;
        }
        set layout(v)
        {
            if (!v) return;
            this._layout.copy(v);
        }
        private _layout = new feng3d.Vector4();

        /**
         * 最小锚点，父Transform2D中左上角锚定的规范化位置。
         */
        @feng3d.oav({ tooltip: "父Transform2D中左上角锚定的规范化位置。", componentParam: { step: 0.01, stepScale: 0.01, stepDownup: 0.01 } })
        @feng3d.serialize
        get anchorMin()
        {
            return this._anchorMin;
        }
        set anchorMin(v)
        {
            this._anchorMin.copy(v);
        }
        private _anchorMin = new feng3d.Vector2(0.5, 0.5);

        /**
         * 最大锚点，父Transform2D中左上角锚定的规范化位置。
         */
        @feng3d.oav({ tooltip: "最大锚点，父Transform2D中左上角锚定的规范化位置。", componentParam: { step: 0.01, stepScale: 0.01, stepDownup: 0.01 } })
        @feng3d.serialize
        get anchorMax()
        {
            return this._anchorMax;
        }
        set anchorMax(v)
        {
            this._anchorMax.copy(v);
        }
        private _anchorMax = new feng3d.Vector2(0.5, 0.5);

        /**
         * The normalized position in this RectTransform that it rotates around.
         */
        @feng3d.oav({ tooltip: "中心点" })
        @feng3d.serialize
        get pivot()
        {
            return this._pivot;
        }
        set pivot(v)
        {
            this._pivot.copy(v);
        }
        private _pivot = new feng3d.Vector2(0, 0);

        /**
         * 旋转
         */
        @feng3d.oav({ tooltip: "旋转", componentParam: { step: 0.01, stepScale: 30, stepDownup: 50 } })
        get rotation()
        {
            return this._rotation;
        }
        set rotation(v)
        {
            this._rotation = v;
        }
        private _rotation = 0;

        /**
         * 缩放
         */
        @feng3d.oav({ tooltip: "缩放", componentParam: { step: 0.01, stepScale: 1, stepDownup: 1 } })
        get scale()
        {
            return this._scale;
        }
        set scale(v) { this._scale.copy(v); }
        private readonly _scale = new feng3d.Vector2(1, 1);

		/**
		 * 创建一个实体，该类为虚类
		 */
        constructor()
        {
            super();

            var watcher = feng3d.watcher;
            watcher.watch(this._position, "x", this._invalidateLayout, this);
            watcher.watch(this._position, "y", this._invalidateLayout, this);
            watcher.watch(this._anchorMin, "x", this._invalidateLayout, this);
            watcher.watch(this._anchorMin, "y", this._invalidateLayout, this);
            watcher.watch(this._anchorMax, "x", this._invalidateLayout, this);
            watcher.watch(this._anchorMax, "y", this._invalidateLayout, this);
            //
            watcher.watch(this._layout, "x", this._invalidateLayout, this);
            watcher.watch(this._layout, "y", this._invalidateLayout, this);
            watcher.watch(this._layout, "z", this._invalidateLayout, this);
            watcher.watch(this._layout, "w", this._invalidateLayout, this);
            //
            watcher.watch(this._size, "x", this._invalidateLayout, this);
            watcher.watch(this._size, "y", this._invalidateLayout, this);
            watcher.watch(this._pivot, "x", this._invalidateLayout, this);
            watcher.watch(this._pivot, "y", this._invalidateLayout, this);
            //
            watcher.watch(this, <any>"_rotation", this._invalidateLayout, this);
            watcher.watch(this._scale, "x", this._invalidateLayout, this);
            watcher.watch(this._scale, "y", this._invalidateLayout, this);
        }

        beforeRender(renderAtomic: feng3d.RenderAtomic, scene: feng3d.Scene, camera: feng3d.Camera)
        {
            renderAtomic.uniforms.u_rect = this.rect;
        }

        private _updateLayout()
        {
            var position = this._position.clone();
            var anchorMin = this._anchorMin.clone();
            var anchorMax = this._anchorMax.clone();
            var layout = this._layout.clone();
            var size = this._size.clone();
            var pivot = this._pivot.clone();

            var rotation = this.rotation;
            var scale = this._scale.clone();
            //
            var transformLayout = this.transformLayout;
            if (!transformLayout) return;
            transformLayout.position.x = position.x;
            transformLayout.position.y = position.y;
            transformLayout.anchorMin.x = anchorMin.x;
            transformLayout.anchorMin.y = anchorMin.y;
            transformLayout.anchorMax.x = anchorMax.x;
            transformLayout.anchorMax.y = anchorMax.y;
            transformLayout.size.x = size.x;
            transformLayout.size.y = size.y;
            transformLayout.pivot.x = pivot.x;
            transformLayout.pivot.y = pivot.y;
            //
            transformLayout.leftTop.x = layout.x;
            transformLayout.leftTop.y = layout.z;
            transformLayout.rightBottom.x = layout.y;
            transformLayout.rightBottom.y = layout.w;
            //
            this.transform.rz = rotation;
            this.transform.scale.x = scale.x;
            this.transform.scale.y = scale.y;

            feng3d.ticker.offframe(this._updateLayout, this);
        }

        private _invalidateLayout()
        {
            feng3d.ticker.onframe(this._updateLayout, this);
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