class Food extends egret.Sprite {
    public constructor(x: number, y: number, r: number){
        super();
        this.init(x, y, r);
    }

    // 食物颜色
    private static colorList: number[] = [0x70f3ff, 0xff461f, 0x00bc12, 0x21a675, 0x4c221b, 0xbf242a, 0x161823, 0xffa400];

    // 获取随机颜色
    private randomColor(): number{
        return parseInt("0x" + ("000000" + ( (Math.random() * 16777215 + 0.5 ) >> 0).toString(16).slice(-6)));
    }

    private food: egret.Shape;
    public color: number;

    // 绘制果实
    private init(x: number, y: number, r: number) {
        // 获取随机颜色
        this.color = this.randomColor();
        this.food = new egret.Shape();
        this.food.graphics.beginFill(this.color);
        this.food.graphics.drawCircle(0, 0, r);
        this.food.graphics.endFill();

        this.food.x = r;
        this.food.y = r;

        // 位置
        this.x = x;
        this.y = y;
        this.addChild(this.food);
    }
    
    // 被吃掉
    public onEat(){
        this.parent.removeChild(this);
    }
}