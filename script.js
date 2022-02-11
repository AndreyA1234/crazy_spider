"use strict"
function getCoords(event) {
    let x = event.pageX - canvas.getBoundingClientRect().x - document.documentElement.scrollLeft;
    let y = event.pageY - canvas.getBoundingClientRect().y - document.documentElement.scrollTop;
    return [x, y];
}

function checkHit(ex, ey, sprite) {
    if (
        ex >= sprite.x + 60
        && ex <= sprite.x + (sprite.w - 60)
        && ey >= sprite.y + 60
        && ey <= sprite.y + (sprite.h - 40)
    ) {
        return true
    }
    return false
}

export function random(min, max) {
    return min + Math.random() * (max - min);
}

//spider
export class Spider {
    constructor(x, y, w, h, animX, animY, src, timer) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.animX = animX;
        this.animY = animY;
        this.img = new Image();
        this.img.src = src;
        this.timer = timer;
    }
}
export function renderSpider(ctx, img, frameWidth, frameHeight, spriteX, spriteY, spriteW, spriteH, spriteAnimX, spriteAnimY) {
    ctx.drawImage(img, frameWidth * Math.floor(spriteAnimX), frameHeight * spriteAnimY, frameWidth, frameHeight, spriteX, spriteY, spriteW, spriteH);

}
export function updateSpider(spider, hor, ver, value = 1) {
    spider.animX += value;
    if (spider.animX >= hor) {
        spider.animY++;
        spider.animX = 0;
    }
    if (spider.animY >= ver) {
        spider.animY = 0;
    }

}

//aim

export function drawAim(ctx, aim) {
    ctx.beginPath();
    ctx.arc(aim.x, aim.y, 2, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath();
    ctx.moveTo(aim.x - 30, aim.y);
    ctx.lineTo(aim.x - 50, aim.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(aim.x + 30, aim.y);
    ctx.lineTo(aim.x + 50, aim.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(aim.x, aim.y - 50);
    ctx.lineTo(aim.x, aim.y - 30);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(aim.x, aim.y + 30);
    ctx.lineTo(aim.x, aim.y + 50);
    ctx.stroke();
}

export function setAimPosition(event, aim) {
    // let arr = getCoords(event);
    // let x = arr[0];
    // let y = arr[1];
    [aim.x, aim.y] = getCoords(event);
};
//explosions
export function createExplosion(event, spiders, explosions, w, h) {
    const [ex, ey] = getCoords(event)
    for (let i = 0; i < spiders.length; i++) {
        const spider = spiders[i]
        if (checkHit(ex, ey, spider)) {
            spiders.splice(i, 1)
            explosions.push({
                x: ex - w / 2,
                y: ey - h / 2,
                w,
                h,
                animX: 0,
                animY: 0,
            })
        }
    }


}
export function renderExplosion(ctx, expl, explosions, frameW, frameH) {
    for (const explosion of explosions) {
        ctx.drawImage(expl, explosion.animX * frameW, explosion.animY * frameH, frameW, frameH, explosion.x, explosion.y, explosion.w, explosion.h);
    }

}


export function updateExplosion(explosions, hor, vert) {
    for (let i = 0; i < explosions.length; i++) {
        const explosion = explosions[i];
        explosion.animX++
        if (explosion.animX >= hor) {
            explosion.animX = 0;
            explosion.animY++

        };
        if (explosion.animY >= vert) {
            explosions.splice(i--, 1)
        }


    }


}