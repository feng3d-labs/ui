namespace feng3d
{
    export interface Component
    {
        /**
         * 游戏对象上的2D变换。
         */
        transform2D: Transform2D;
    }

    Object.defineProperty(Component.prototype, "transform2D",
        {
            get: function () { return this._gameObject && this._gameObject.transform2D; },
        });
}