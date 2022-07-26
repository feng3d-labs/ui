import { AddComponentMenu, Behaviour, createNodeMenu, GameObject, RegisterComponent } from '@feng3d/core';
import { oav } from '@feng3d/objectview';
import { serialization, serialize } from '@feng3d/serialization';
import { watch } from '@feng3d/watcher';
import { Transform2D } from './core/Transform2D';

declare global
{
    export interface MixinsComponentMap
    {
        Button: Button;
    }

    export interface MixinsPrimitiveGameObject
    {
        Button: GameObject;
    }
}

/**
 * 按钮状态
 */
export enum ButtonState
{
    /**
     * 弹起状态，默认状态。
     */
    up = 'up',
    /**
     * 鼠标在按钮上状态。
     */
    over = 'over',
    /**
     * 鼠标按下状态。
     */
    down = 'down',
    /**
     * 选中时弹起状态。
     */
    selected_up = 'selected_up',
    /**
     * 选中时鼠标在按钮上状态。
     */
    selected_over = 'selected_over',
    /**
     * 选中时鼠标按下状态。
     */
    selected_down = 'selected_down',
    /**
     * 禁用状态。
     */
    disabled = 'disabled',
}

/**
 * 按钮
 */
@AddComponentMenu('UI/Button')
@RegisterComponent()
export class Button extends Behaviour
{
    /**
     * 按钮所处状态。
     */
    @oav({ block: 'Layout', tooltip: '按钮所处状态。', component: 'OAVEnum', componentParam: { enumClass: ButtonState } })
    @watch('_onStateChanged')
    state = ButtonState.up;

    /**
     * 所有状态数据，每一个状态数据中记录了子对象的当前数据。
     */
    @serialize
    allStateData = {};

    private _stateInvalid = true;

    /**
     * 保存当前状态，例如在编辑器中编辑完按钮某一状态后调用该方法进行保存当前状态数据。
     */
    @oav()
    saveState()
    {
        const stateData = {};
        // 出现相同名称时，只保存第一个数据
        const childMap: { [name: string]: GameObject } = {};
        this.gameObject.children.forEach((child) =>
        {
            if (childMap[child.name]) return;
            childMap[child.name] = child;
        });
        for (const childname in childMap)
        {
            const jsonObj = serialization.serialize(childMap[childname]);
            serialization.deleteClassKey(jsonObj);
            stateData[childname] = jsonObj;
        }
        this.allStateData[this.state] = stateData;
    }

    private _onStateChanged()
    {
        this._stateInvalid = true;
    }

    /**
     * 每帧执行
     */
    update(_interval?: number)
    {
        if (this._stateInvalid)
        {
            this._updateState();
            this._stateInvalid = false;
        }
    }

    /**
     * 更新状态
     */
    private _updateState()
    {
        const statedata = this.allStateData[this.state];
        if (!statedata) return;
        const childMap: { [name: string]: GameObject } = {};
        this.gameObject.children.forEach((child) =>
        {
            if (childMap[child.name]) return;
            childMap[child.name] = child;
        });
        for (const childname in childMap)
        {
            childMap[childname] = serialization.setValue(childMap[childname], statedata[childname]);
        }
    }
}

GameObject.registerPrimitive('Button', (g) =>
{
    const transform2D = g.addComponent(Transform2D);

    transform2D.size.x = 160;
    transform2D.size.y = 30;
    g.addComponent(Button);
});

// 在 Hierarchy 界面新增右键菜单项
createNodeMenu.push(
    {
        path: 'UI/Button',
        priority: -2,
        click: () =>
            GameObject.createPrimitive('Button')
    }
);

