/*---------------------
 Customize Settings
-----------------------*/
// スロット画像配列
const SLOT_IMG = [
    'images/slot_1.png',
    'images/slot_2.png',
    'images/slot_3.png',
    'images/slot_4.png',
    'images/slot_5.png',
    'images/slot_6.png',
    'images/slot_7.png',
    'images/slot_8.png',
    'images/slot_9.png',
];
// 画像の幅
const SLOT_IMG_SIZE_WIDTH = 80;
// 画像の高さ
const SLOT_IMG_SIZE_HEIGHT = 52;
// 縦に並べるスロット画像の数
const SLOT_NUM = 50;
// アニメーション秒数
const SLOT_DURATION = 3;
// 当たり目確率
const PROBABILITY = 0.2;
// 当たりの中の大当たり確率
const PROBABILITY_BIG = 0.3;
// 大当たり画像番号
const SLOT_IMG_BIG = [0];
// 音楽
const SLOT_MUSIC = 'musics/audiostock_21829_sample.mp3';

/*---------------------
 Settings
-----------------------*/
// スロット画像のスタート位置
const START_POS = -(SLOT_IMG_SIZE_HEIGHT + 4) * (SLOT_NUM - 3);
// スロット画像の停止位置
const STOP_POS = -(SLOT_IMG_SIZE_HEIGHT + 4) * 5;
// 最後に真ん中（２行目）にくるスロット画像の番号
const MIDDLE_NUM = 7;

/*---------------------
 Definitions
-----------------------*/
let hit;
let easingIdx;
let judge;
let time;
let result1 = new Array();
let result2 = new Array();
let result3 = new Array();
const audio = new Audio(SLOT_MUSIC);
audio.preload = 'auto';
audio.loop = false;

/*---------------------
 Functions
-----------------------*/
/* 初期処理 */
$(document).ready(function () {
    collisionDetection();
    slotCreate($('#slots_a .wrapper'), 1);
    slotCreate($('#slots_b .wrapper'), 2);
    slotCreate($('#slots_c .wrapper'), 3);
    $('.slotglass-top').css({
        'width': `${SLOT_IMG_SIZE_WIDTH + 6}px`,
        'height': `${SLOT_IMG_SIZE_HEIGHT / 2}px`
    });
    $('.slotglass-bottom').css({
        'width': `${SLOT_IMG_SIZE_WIDTH + 5}px`,
        'height': `${SLOT_IMG_SIZE_HEIGHT / 2}px`
    });
    $('.slotline').css({
        'width': `${SLOT_IMG_SIZE_WIDTH + 5}px`,
        'top': `${(SLOT_IMG_SIZE_HEIGHT + 4) * 1.5}px`
    });
    $('#slots_a,#slots_b,#slots_c').css({
        'width': `${SLOT_IMG_SIZE_WIDTH + 6}px`,
        'height': `${(SLOT_IMG_SIZE_HEIGHT + 4) * 3 + 4}px`
    });
    $('#slotbox').css({
        'width': `${($('#slots_a').width() + 4) * 3 + parseInt($('#slotbox').css('padding-left')) * 2}px`,
    });
});

/* 当たり判定 */
function collisionDetection() {
    hit = Math.random() < PROBABILITY_BIG
        ? Math.floor(Math.random() * SLOT_IMG.filter((v, i) => SLOT_IMG_BIG.find(s => s === i) !== undefined).length)
        : Math.floor(Math.random() * SLOT_IMG.filter((v, i) => SLOT_IMG_BIG.find(s => s === i) === undefined).length);
    judge = Math.random() < PROBABILITY;
};

/* スロット画像生成 */
function slotCreate(obj, slotno) {
    obj.stop(true, true);
    obj.children().remove();
    let save_result1 = result1[slotno];
    let save_result2 = result2[slotno];
    let save_result3 = result3[slotno];

    for (let i = 1; i <= SLOT_NUM; i++) {
        let idx = Math.floor(Math.random() * SLOT_IMG.length);
        if (i == MIDDLE_NUM - 1) {
            result1[slotno] = idx;
        } else if (i == MIDDLE_NUM) {
            if (judge) {
                idx = hit;
            }
            result2[slotno] = idx;
        } else if (i == MIDDLE_NUM + 1) {
            result3[slotno] = idx;
        } else if (i == SLOT_NUM - 2) {
            if (save_result1 != undefined) {
                idx = save_result1;
            }
        } else if (i == SLOT_NUM - 1) {
            if (save_result2 != undefined) {
                idx = save_result2;
            }
        } else if (i == SLOT_NUM) {
            if (save_result3 != undefined) {
                idx = save_result3;
            }
        }
        obj.append(`
        <div class="slot" style="width:${SLOT_IMG_SIZE_WIDTH + 6}px;height:${SLOT_IMG_SIZE_HEIGHT + 4}px">
            <img border="0" src="${SLOT_IMG[idx]}" width="${SLOT_IMG_SIZE_WIDTH}" height="${SLOT_IMG_SIZE_HEIGHT}" />
        </div>
        `);
    }

    obj.css({
        'width': `${SLOT_IMG_SIZE_WIDTH + 6}px`,
        'margin-top': `${START_POS}px`
    });
}

/* スロットスタート */
function slotStart() {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
    $('#startBtn').prop('disabled', true);
    if ($('#slots_a .wrapper').css('margin-top') != START_POS + 'px') {
        collisionDetection();
    }
    time = SLOT_DURATION * 1000;
    slotMove($('#slots_a .wrapper'), 1);
    setTimeout(function () {
        slotMove($('#slots_b .wrapper'), 2);
    }, 200);
    setTimeout(function () {
        slotMove($('#slots_c .wrapper'), 3);
    }, 400);

    $(this).delay(time + 500).queue(function () {
        if (result2[1] == result2[2] && result2[1] == result2[3]) {
            const findResult = SLOT_IMG_BIG.find(v => v === result2[1]);
            success({
                result: result2,
                isBig: findResult !== undefined
            });
        } else {
            fail({result: result2});
        }
        $('#startBtn').prop('disabled', false);
        $(this).dequeue();
    });
}

/* スロット画像移動 */
function slotMove(obj, slotno) {
    if (obj.css('margin-top') != START_POS + 'px') {
        slotCreate(obj, slotno);
    }
    obj.animate({ 'margin-top': STOP_POS + 'px' }, { 'duration': time, });
};

/**
 * あたり処理
 */
function success(params) {
    console.log('success', params);
    if (params.isBig) {
        alert(`大あたり ${params.result[1]+1}`);
        return;
    }
    alert(`あたり ${params.result[1]+1}`);
}

/**
 * はずれ処理
 */
function fail(params) {
    console.log('fail', params);
    alert('はずれ');
}