# BlandocoPaloma アイコン素材集

Cloudflare Pages にそのまま公開できる静的サイトの雛形です。

## 素材を追加する方法

1. PNGを `images/` 以下の好きなカテゴリフォルダに入れる。
2. `materials.js` の `MATERIALS` に次のような行を追加する。

```js
{ name: "イヌ", category: "動物", image: "images/animals/イヌ.png", tags: ["犬","哺乳類"] },
```

3. GitHubへpushするとCloudflare Pagesが自動更新します。

## カテゴリ

その他 / モンスター / 技能 / 空・天候 / 建物・場所 / 施設・サービス /
乗り物 / 植物 / 食べ物 / 人間 / 装備 / 動物 / 武器 / 物

## 注意

`terms.html` の利用規約は仮文です。公開前に実際の利用条件へ書き換えてください。
