namespace feng3d
{
    /**
     * Position, size, anchor and pivot information for a rectangle.
     * 
     * 矩形的位置、大小、锚点和枢轴信息。
     */
    export class Transform2D extends Component
    {
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
         * 旋转
         */
        rotation = 0;

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
         * 表示显示对象的宽度，以像素为单位。宽度是根据显示对象内容的范围来计算的。
         */
        width: number;

        /**
         * 表示显示对象的高度，以像素为单位。高度是根据显示对象内容的范围来计算的。
         */
        height: number;

        /**
         * 本地位移
         */
        @oav({ tooltip: "本地位移" })
        get position() { return this._position; }
        set position(v) { this._position.copy(v); }
        private readonly _position = new Vector2();

        /**
         * 本地缩放
         */
        @oav({ tooltip: "本地缩放" })
        get scale() { return this._scale; }
        set scale(v) { this._scale.copy(v); }
        private readonly _scale = new Vector2(1, 1);

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
}