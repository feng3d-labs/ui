namespace feng3d
{
    functionwrap.extendFunction(GameObject, "createPrimitive", (g, type) =>
    {
        if (type == "Canvas")
        {
            g.addComponent(Canvas)
        } else 
        {
            var transform2D = g.addComponent(Transform2D);
            g.addComponent(CanvasRenderer);

            if (type == "Image")
            {
                transform2D.width = 100;
                transform2D.height = 100;
                g.addComponent(Image)
            }
            else if (type == "Text")
            {
                transform2D.width = 160;
                transform2D.height = 30;
                g.addComponent(Text)
            }
        }

        return g;
    });

    export interface GameObject
    {
        /**
         * 游戏对象上的2D变换。
         */
        transform2D: Transform2D;
    }

    Object.defineProperty(GameObject.prototype, "transform2D",
        {
            get: function () { return this.getComponent(Transform2D); },
        });

    export interface PrimitiveGameObject
    {
        Canvas: GameObject;
        Image: GameObject;
        Text: GameObject;
    }
}