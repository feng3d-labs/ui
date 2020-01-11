namespace feng3d
{
    export interface ShaderMacro
    {
        /**
         * 是否为UI
         */
        IS_UI: boolean;
    }

    /**
     * 2D变换
     * 
     * 提供了比Transform更加适用于2D元素的API
     * 
     * 通过修改Transform的数值实现
     */
    export class Transform2D extends Component
    {
        get single() { return true; }

		/**
		 * 创建一个实体，该类为虚类
		 */
        constructor()
        {
            super();

            watcher.watch(this._position, "x", this._positionChanged, this);
            watcher.watch(this._position, "y", this._positionChanged, this);
            watcher.watch(this, "rotation", this._rotationChanged, this);
            watcher.watch(this._scale, "x", this._scaleChanged, this);
            watcher.watch(this._scale, "y", this._scaleChanged, this);
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
         * 本地位移
         */
        @oav({ tooltip: "本地位移", componentParam: { step: 1, stepScale: 1, stepDownup: 1 } })
        get position() { return this._position; }
        set position(v) { this._position.copy(v); }

        /**
         * 本地旋转
         */
        @oav({ tooltip: "本地旋转", componentParam: { step: 0.01, stepScale: 30, stepDownup: 50 } })
        rotation = 0;

        /**
         * 本地缩放
         */
        @oav({ tooltip: "本地缩放", componentParam: { step: 0.01, stepScale: 1, stepDownup: 1 } })
        get scale() { return this._scale; }
        set scale(v) { this._scale.copy(v); }

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

        beforeRender(gl: GL, renderAtomic: RenderAtomic, scene: Scene, camera: Camera)
        {
            renderAtomic.shaderMacro.IS_UI = true;
        }

        private readonly _position = new Vector2();
        private readonly _scale = new Vector2(1, 1);

        protected readonly _matrix = new Matrix3x3();

        private _positionChanged(object: Vector2, property: string, oldvalue: number)
        {
            if (!Math.equals(object[property], oldvalue))
                this._invalidateTransform();
        }

        private _rotationChanged(object: Transform2D, property: string, oldvalue: number)
        {
            if (!Math.equals(object[property], oldvalue))
                this._invalidateTransform();
        }

        private _scaleChanged(object: Vector2, property: string, oldvalue: number)
        {
            if (!Math.equals(object[property], oldvalue))
                this._invalidateTransform();
        }

        private _invalidateTransform()
        {
            this.transform.x = this.x;
            this.transform.y = this.y;

            this.transform.rz = this.rotation;

            this.transform.sx = this.sx;
            this.transform.sy = this.sy;
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