namespace feng3d
{
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

        /**
         * X轴坐标。
         */
        @serialize
        get x() { return this._position.x; }
        set x(v) { this._position.x = v; }

        /**
         * Y轴坐标。
         */
        @serialize
        get y() { return this._position.y; }
        set y(v) { this._position.y = v; }

        /**
         * X轴缩放。
         */
        @serialize
        get sx() { return this._scale.x; }
        set sx(v) { this._scale.x = v; }

        /**
         * Y轴缩放。
         */
        @serialize
        get sy() { return this._scale.y; }
        set sy(v) { this._scale.y = v; }

        /**
         * 本地位移
         */
        @oav({ tooltip: "本地位移" })
        get position() { return this._position; }
        set position(v) { this._position.copy(v); }

        /**
         * 本地旋转
         */
        @oav({ tooltip: "本地旋转", componentParam: { step: 0.001, stepScale: 30, stepDownup: 1 } })
        rotation = 0;

        /**
         * 本地缩放
         */
        @oav({ tooltip: "本地缩放" })
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

        private readonly _position = new Vector2();
        private readonly _scale = new Vector2(1, 1);

        protected readonly _matrix = new Matrix3x3();

        private _positionChanged(object: Vector2, property: "x" | "y", oldvalue: number)
        {
            if (property == "x")
                this.transform.x = object.x;
            else
                this.transform.y = object.y;
        }

        private _rotationChanged(object: Transform2D, property: string, oldvalue: number)
        {
            this.transform.rz = this.rotation;
        }

        private _scaleChanged(object: Vector2, property: "x" | "y", oldvalue: number)
        {
            if (property == "x")
                this.transform.sx = object.x;
            else
                this.transform.sy = object.y;
        }
    }
}