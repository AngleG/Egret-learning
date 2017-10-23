class Scratch extends egret.DisplayObjectContainer {
    public constructor(){
        super();
    }
    //当前已经画的遮罩部分
    private _maskContainer: egret.DisplayObjectContainer;
    //画的过程中部分
    private _penShape: egret.Shape;
    private _penThickness: number;
    //画完后统一绘制图片
    private _showBmp: egret.Bitmap;
    private _show1Texture: egret.RenderTexture;
    private _show2Texture: egret.RenderTexture;
    private _currentTexture: egret.RenderTexture;

    /**
     * @card 被刮出部分的图形 
     * @cover 遮罩图形 
     * @w
     * @h
     * @thickness
     */
    public init(card: egret.DisplayObject, cover: egret.DisplayObject, w: number, h: number, thickness: number = 20): void{
        this.addChild(cover);
        this.addChild(card);

        this._penThickness = thickness;

        this._maskContainer = new egret.DisplayObjectContainer();

        this._showBmp = new egret.Bitmap();
        this._maskContainer.addChild(this._showBmp);
        this._showBmp.width = w;
        this._showBmp.height = h;

        this._penShape = new egret.Shape;
        this._maskContainer.addChild(this._penShape);

        this.addChild(this._maskContainer);
        card.mask = this._maskContainer;

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchEventHandler, this);

        this._show1Texture = new egret.RenderTexture();
        this._show2Texture = new egret.RenderTexture();
        
    }
    private onTouchEventHandler(e: egret.TouchEvent): void {
        switch(e.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                if (this.hasEventListener(egret.TouchEvent.TOUCH_MOVE)){
                    return;
                }
                this._penShape.graphics.clear();
                this._penShape.graphics.lineStyle(this._penThickness, 0xff0000, 1);
                this._penShape.graphics.moveTo(e.localX, e.localY);

                this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchEventHandler, this);

                this.dispatchEvent(new egret.Event("scratchStart"));
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                this._penShape.graphics.lineTo(e.localX, e.localY);
                break;
            case egret.TouchEvent.TOUCH_END:
                this._penShape.graphics.endFill();

                if(this._currentTexture == this._show1Texture){
                    this._currentTexture = this._show2Texture;
                }else{
                    this._currentTexture = this._show1Texture;
                }
                this._currentTexture.drawToTexture(this._maskContainer, new egret.Rectangle(0, 0, this._showBmp.width, this._showBmp.height));
                this._showBmp.texture = this._currentTexture;

                this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchEventHandler, this);
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEventHandler, this);

                this.dispatchEvent(new egret.Event("scratchEnd"));
                break;
        }
    }

    /**
     * 获取刮开的百分比
     * @return 0-100
     */
    public getPercent():number {
        if(this._currentTexture == null){
            return 0;
        }
        var pixels = this._currentTexture.getPixels(0, 0, this._currentTexture.textureWidth, this._currentTexture.textureHeight);
        var count:number = 0;
        for(var i = 0; i < pixels.length; i+=4 * this._penThickness){
            if(pixels[i] != 0){
                count++;
            }
        }
        egret.log(count * this._penThickness / pixels.length / 4);
        return parseFloat((count * 4 * this._penThickness / pixels.length * 100).toFixed(1));
    }

    /**
     * 释放内存
     */
    public dispose():void {
        this._show1Texture.dispose();
        this._show2Texture.dispose();
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchEventHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchEventHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEventHandler, this);
    }
}