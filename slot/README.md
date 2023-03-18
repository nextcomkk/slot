# スロット

## 設定方法

### javascript

| 名称 | 説明 | 例 | 備考 |
| ---- | ---- | ---- | ---- |
| SLOT_IMG | スロット画像配列 | ['images/slot_1.png'] | SLOT_NUMの値以下で長さを設定してください |
| SLOT_IMG_SIZE_WIDTH | 画像の幅(px) | 80 |  |
| SLOT_IMG_SIZE_HEIGHT | 画像の高さ(px) | 52 |  |
| SLOT_NUM | 縦に並べるスロット画像の数 | 50 |  |
| SLOT_DURATION | アニメーション秒数 (秒) | 5 |  |
| PROBABILITY | 当たる確率 | 0.3 | 0から1で設定してください |
| PROBABILITY_BIG | 当たりの中での大当たり確率 | 0.3 | 0から1で設定してください |
| SLOT_IMG_BIG | 大当たり画像番号 | [0, 1] | 0からスロット画像配列の長さ-1までの番号を設定してください |
| SLOT_MUSIC | 音楽ファイルのパス | 'musics/audiostock_21829_sample.mp3' |  |

### css
筐体背景色変更は#slotboxのbackground-colorを変更  
スタートボタン背景色変更は#startBtnのbackground-colorを変更

 
## 設置方法

1. htmlのid="slotbox"の中身を設置してください。
2. cssはstyle.cssを読み込んでください。
3. jsはjquery、app.jsを読み込んでください。