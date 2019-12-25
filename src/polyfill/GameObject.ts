namespace feng3d
{
    functionwrap.extendFunction(GameObject, "createPrimitive", (g, type) =>
    {
        if (type == "Image")
        {
            g.addComponent(Image)
        }
        return g;
    });

    export interface PrimitiveGameObject
    {
        Image: GameObject;
    }
}