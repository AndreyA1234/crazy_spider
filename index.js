"use strict"

import { Spider, updateSpider, createExplosion, renderExplosion, setAimPosition, updateExplosion, renderSpider, drawAim, random } from "./script.js";

const gameStart = () => {
    const canvas = document.getElementById("canvas");
    canvas.width = 500;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = ctx.fillStyle = "red";
    ctx.lineWidth = 2;
    const win = document.getElementById("win");
    const play = document.getElementById("play");
    const spiders = [];
    const explosions = [];
    let game = true;

    const aim = {
        x: canvas.width / 2,
        y: canvas.height / 2,
    };

    const expl = new Image();
    expl.src = "./images/expl.jpg";
    const grassImg = new Image();
    grassImg.src = "./images/grass.jpg";
    for (let i = 0; i < 10; i++) {
        spiders.push(new Spider(
            random(-50, canvas.width - 100),
            random(-70, canvas.height - 120),
            150,
            150,
            i,
            0,
            "./images/spider.png",
            50

        ))
    }

    canvas.addEventListener("mousemove", (event) => setAimPosition(event, aim))
    canvas.addEventListener("click", (event) => createExplosion(event, spiders, explosions, 100, 100))
    play.addEventListener("click", () => {
        win.style.display = "none";
        gameStart()
    })

    animation()


    function animation() {
        if (game) {
            update();
            render();
            requestAnimationFrame(animation);
        } else {
            win.style.display = "flex";
        }

    }
    function render() {
        ctx.drawImage(grassImg, 0, 0, canvas.width, canvas.height);
        for (const spider of spiders) {
            renderSpider(ctx, spider.img, 128, 128, spider.x, spider.y, spider.w, spider.h, spider.animX, spider.animY);
        }
        drawAim(ctx, aim)
        renderExplosion(ctx, expl, explosions, 341.3, 364)
    }
    function update() {
        for (const spider of spiders) {
            updateSpider(spider, 32, 8, 0.3);
            spider.timer--
            if (spider.timer <= 0) {
                spider.x = random(-50, canvas.width - 100)
                spider.y = random(-70, canvas.height - 120)
                spider.timer = 50;
            }
        }
        if (spiders.length === 0) {
            setTimeout(() => {
                game = false
            }, 1000)
        }

        updateExplosion(explosions, 3, 2)
    }
}

window.onload = gameStart;
