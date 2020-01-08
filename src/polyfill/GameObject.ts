namespace feng3d
{
    functionwrap.extendFunction(GameObject, "createPrimitive", (g, type) =>
    {
        if (type == "Image")
        {
            g.addComponent(Image)
        }
        else if (type == "Text")
        {
            g.addComponent(Text)
        }

        return g;
    });

    export interface PrimitiveGameObject
    {
        Image: GameObject;
    }
    export interface PrimitiveGameObject
    {
        Text: GameObject;
    }
}