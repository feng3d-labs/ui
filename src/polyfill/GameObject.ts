namespace feng3d
{
    functionwrap.extendFunction(GameObject, "createPrimitive", (g, type) =>
    {
        if (type == "Canvas")
        {
            g.addComponent(Canvas)
        } else 
        {
            g.addComponent(Transform2D);
            g.addComponent(CanvasRenderer);

            if (type == "Image")
            {
                g.addComponent(Image)
            }
            else if (type == "Text")
            {
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