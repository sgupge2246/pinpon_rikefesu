
/**
* このファイルを使って、独自の関数やブロックを定義してください。
* 詳しくはこちらを参照してください：https://makecode.microbit.org/blocks/custom
*/


/**
 * リケフェス2023用
 * micro:bitでピンポンゲーム
 */
//% weight=300 color=#ff8c00 icon="\uf45d" block="リケフェスピンポン"



namespace pinpon {

    //% block="バーの右移動"
    export function rightmove(): void {
        
        if (bar_x < 3) {
            led.unplot(bar_x, 4)
            bar_x = bar_x + 1
            led.plot(bar_x + 1, 4)
        }
    }

    //% block="バーの左移動"
    export function leftmove(): void {
        if (bar_x > 0) {
            led.unplot(bar_x + 1, 4)
            bar_x = bar_x - 1
            led.plot(bar_x, 4)
        }
    }

    /**
     * 壁に当たった時の処理
     */
    //% block="右壁に当たったら左に跳ね返す"
    export function left_reflect(): void {
        if (ball_x + ball_dx > 4) {
            ball_dx = ball_dx * -1
        }
    }

    //% block="左壁に当たったら右に跳ね返す"
    export function right_reflect(): void {
        if (ball_x + ball_dx < 0) {
            ball_dx = ball_dx * -1
        }
    }
    //% block="天井に当たったら下に跳ね返す"
    export function down_reflect(): void {
        if (ball_y + ball_dy < 0) {
            ball_dy = ball_dy * -1
        }
    }
    //% block="バーに当たったらin_gameを真、地面についたらin_gameを偽に"
    export function in_game_switch(): void {
        let point = 0;
        if (ball_y + ball_dy > 3) {
            if (led.point(ball_x + ball_dx, ball_y + ball_dy)) {
                ball_dy = ball_dy * -1
                point = point + 1
                if (interval - interval_step >= 0) {
                    music.play(music.tonePlayable(262, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
                    interval = interval - interval_step
                }
            } else {
                in_game = false
                music.play(music.stringPlayable("C5 B A G F E D C ", 500), music.PlaybackMode.UntilDone)
            }
        }
    }

    //% block="最初にボールを点灯させる"
    export function ball_light(): void {
        led.plot(ball_x, ball_y)
        led.plot(bar_x, 4)
        led.plot(bar_x + 1, 4)
    }

    //% block = "ボールを上に跳ね返して速度up"
    export function up_reflect(): void {
        led.plot(ball_x + ball_dx, ball_y + ball_dy)
        led.unplot(ball_x, ball_y)
        ball_x = ball_x + ball_dx
        ball_y = ball_y + ball_dy
        basic.pause(interval)
    }



    
}
