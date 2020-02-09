namespace feng3d
{
    functionwrap.extendFunction(GameObject, "createPrimitive", (g, type) =>
    {
        if (type == "Canvas")
        {
            g.addComponent(feng2d.Canvas)
        } else 
        {
            var transform2D = g.addComponent(feng2d.Transform2D);
            g.addComponent(feng2d.CanvasRenderer);

            if (type == "Image")
            {
                transform2D.width = 100;
                transform2D.height = 100;
                g.addComponent(feng2d.Image)
            } else if (type == "Rect")
            {
                transform2D.width = 100;
                transform2D.height = 100;
                g.addComponent(feng2d.Rect)
            }
            else if (type == "Text")
            {
                transform2D.width = 160;
                transform2D.height = 30;
                g.addComponent(feng2d.Text)
            }
        }

        return g;
    });

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

    /**
     * 原始游戏对象，可以通过GameObject.createPrimitive进行创建。
     */
    export interface PrimitiveGameObject
    {
        Canvas: GameObject;
        Image: GameObject;
        Text: GameObject;
    }
}