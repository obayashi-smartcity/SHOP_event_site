# YORIMICHI LOUNGE 静的Webサイト（内製化用たたき台）

既存イベントサイトの「夜のラウンジ」「都市の夜景」「ネイビー／ラベンダー／ゴールド」「大きな余白」といった雰囲気を参考にしつつ、文章・構成・画像を新規に作り直した静的サイトです。完全な複製ではなく、社内で差し替えやすい構造を優先しています。

## フォルダ構成

```text
project/
├── index.html          # ページ本体
├── css/
│   └── style.css       # 配色、レイアウト、レスポンシブ表示
├── js/
│   └── script.js       # メニュー、スクロール、表示アニメーション
├── images/
│   ├── hero.jpg        # メインビジュアル
│   ├── about.jpg       # コンセプト画像
│   ├── event.jpg       # イベントイメージ
│   └── access.jpg      # アクセスイメージ
├── data
│   └── creators.json   # 出展者情報
└── README.md
```

## 表示方法

1. ZIPファイルを展開します。
2. `project` フォルダ内の `index.html` をダブルクリックします。
3. Microsoft Edge、Google Chrome、Firefoxなどで表示できます。

CSSとJavaScriptは相対パスで読み込んでいるため、ローカルでも基本表示と操作が可能です。

## 各ファイルの役割

- `index.html`: 見出し、文章、画像、リンクなどのコンテンツを管理します。
- `css/style.css`: デザイン、余白、配色、PC・タブレット・スマートフォン表示を管理します。
- `js/script.js`: ハンバーガーメニュー、ページ内スクロール、ページトップボタン、表示アニメーションを管理します。
- `images/`: サイト内で使用する代替画像を格納します。元サイトの画像は使用していません。

外部ライブラリ、外部フォント、CDNは使用していません。インターネット接続がない環境でも表示できます。

## 画像・文章・色の変更方法

### 画像

同じファイル名の画像に置き換えるのが簡単です。新しいファイル名を使う場合は、`index.html` 内の `src="images/○○.jpg"` も同じ名前へ変更します。大文字と小文字も一致させてください。

### 文章

`index.html` をテキストエディターで開き、各見出しや段落を変更します。仮情報には「仮情報」「SAMPLE」などの注記があります。公開前に日時、会場、主催、リンク先を必ず正式情報へ差し替えてください。

### 色・文字サイズ・コンテンツ幅

`css/style.css` 冒頭の `:root` にCSS変数をまとめています。

- `--color-navy`: 基調となる濃紺
- `--color-purple`: アクセントの薄紫
- `--color-gold`: アクセントのゴールド
- `--color-cream`: 背景色
- `--content-width`: 最大コンテンツ幅
- `--space-section`: セクション上下余白

### jsonファイル内容
published    : false にするとカードを表示しません（データは残したまま非表示にできます）
category     : カード上部の小さな英字ラベル
role / name  : 見出しの1行目（肩書）と2行目（名前）
description  : 紹介文
visual       : 背景のスタイル名。visual-art のように visual- を付けたクラスとして使われます
initial      : ビジュアル部分に表示する文字
link         : 「詳しく見る」のリンク先


## CSSやJavaScriptが反映されない場合

1. ZIP内ではなく、ZIPを展開した後の `index.html` を開いているか確認します。
2. `index.html`、`css`、`js`、`images` の位置関係がフォルダ構成どおりか確認します。
3. CSSが `<link rel="stylesheet" href="css/style.css">` になっているか確認します。
4. JavaScriptが `<script src="js/script.js" defer></script>` になっているか確認します。
5. Windowsのエクスプローラーで拡張子を表示し、`style.css.txt` や `script.js.txt` になっていないか確認します。
6. ブラウザで `Ctrl + F5` を押し、キャッシュを無視して再読み込みします。
7. 開発者ツール（F12）の「Console」「Network」で404や赤いエラーがないか確認します。

## ローカルサーバーを使用する場合

Pythonがインストールされている場合、コマンドプロンプトまたはPowerShellで `project` フォルダへ移動し、次を実行します。

```bash
python -m http.server 8000
```

その後、ブラウザで `http://localhost:8000/` を開きます。終了はターミナルで `Ctrl + C` です。

Visual Studio Codeを使う場合は、Live Server拡張機能でも表示できます。ただし本サイト自体は拡張機能に依存しません。

## 編集時の注意

- パス区切りは `/` を使用してください。
- 画像名の大文字・小文字をHTMLと実ファイルで一致させてください。
- 外部フォームを設定する際は登録ボタンの `href` を正式URLへ変更してください。
- 出店者カードは `<article class="creator-card">...</article>` を単位として追加・削除できます。
- 公開前に実機のスマートフォンでも表示確認してください。
